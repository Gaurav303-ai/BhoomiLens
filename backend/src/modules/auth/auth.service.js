const bcrypt = require('bcrypt');
const pool = require('../../config/db');
const apiError = require('../../utils/ApiError');
const userRepository = require('../../repository/user.repository');
const { hashToken , generateCryptoCode, generateCryptoToken } = require('../../utils/token');
const emailService = require('../../utils/emailService');
const { generateAccessToken, generateRefreshToken ,verifyRefreshToken } = require('../../utils/jwt');

const signupSession = async({
    firstName,
    lastName,
    designation,
    employeeID,
    phoneNumber
}) => {
    console.log("1. signupSession started");
    const existingEmployeeID = await userRepository.findEmployeeID(employeeID);
    if(!existingEmployeeID){
        throw new apiError(409,"invalid EmployeeID");
    }
    console.log("2. employee lookup completed");
    const email = existingEmployeeID.official_email;

    const [existingUser,existingPhoneNumber] = await Promise.all([
        userRepository.findUser(employeeID),
        userRepository.findPhoneNumber(phoneNumber)
    ]);

    if(existingUser){
        throw new apiError(409,"user already exists");
    }

    if(existingPhoneNumber){
        throw new apiError(409,"phone number already exists");
    }


    console.log("3. user/phone lookup completed");

    const verificationCodeExpiryMinutes = new Date();
    verificationCodeExpiryMinutes.setMinutes(verificationCodeExpiryMinutes.getMinutes() + 15);

    const verificationCode = generateCryptoCode();
    const tokenHash = hashToken(verificationCode);
    console.log("hashed token",tokenHash);
    console.log("4. code generated");
    
    let signup ;

    const client = await pool.connect();
    console.log("5. database client acquired");
    try{
        await client.query('BEGIN');
        console.log("6. transaction started");
        signup= await userRepository.createSignupSession(client,{firstName,lastName,employeeID,designation,phoneNumber,tokenHash,verificationCodeExpiryMinutes});
        console.log("7. signup session created");
        await emailService.sendEmailVerificationCode({
            email,
            verificationCode,
            firstName,
            verificationCodeExpiryMinutes
        });

        console.log("8. email sent");
        await client.query('COMMIT');
        console.log("9. transaction committed");

    } catch(error){
        await client.query("ROLLBACK");
        throw error;
    }
    finally{
        client.release();
    }
    
    return {
        user:{
            email,
            signupId:signup.id
        },
        emailVerificationRequired: true
    }

}

const verifyEmail = async({
    signupId,
    email,
    verificationCode
}) => {
    const tokenHash = hashToken(verificationCode);
    console.log("hashed token",tokenHash)
   

    let verified = false;
    console.log({
  signupId,
  tokenHash,
  typeOfSignupId: typeof signupId,
  typeOfHashToken: typeof tokenHash
});
    const result = await userRepository.verifyVerificationCode({
        signupId,
        tokenHash,
    });
    if (!result) {
        throw new apiError(400, "invalid_verification_code");
    }

    if(result.expires_at <= new Date()){
        throw new apiError(401,"verification_code_expired");
    }
    //mark verified true 
    if(result){
        await userRepository.updateVerified(signupId);
        verified = true;

    }
    
    return {
        user:{
            signupId:signupId,
        },
        verified:verified
    }

}

const setPassword = async({
    signupId,
    password
}) => {

    const hashedPassword = await bcrypt.hash(password,10);
    console.log("fetchFromSignupSession signupId:", signupId, typeof signupId);

    const signupRow = await userRepository.fetchFromSignupSession({ signupId });
    console.log("fetchFromSignupSession result:", signupRow);
    if (!signupRow) {
        throw new apiError(400, "signup_session_not_found");
    }

    const { first_name, last_name, designation, employee_id, phone_number } = signupRow; 
    const officer = await userRepository.findEmployeeID(employee_id);
    const email = officer.official_email;
    let user;
    console.log(  first_name,
                last_name,
                designation,
                employee_id,
                phone_number,
                email,
                hashedPassword);
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        user =  await userRepository.registerUser(

            client,
                {
                first_name,
                last_name,
                designation,
                employee_id,
                phone_number,
                email,
                hashedPassword
            }
        );
        await client.query('COMMIT');
    }
    catch(error){
        await client.query("ROLLBACK");
        throw error;
    }
    finally{
        client.release();
    }
    
    return {
        user: {
            id:user.id,
            role:user.role
        },
        email,
        employeeId:employee_id
    }
}

// LOGIN SERVICE

const login = async({
    employeeID,
    password
}) => {
    console.log("login body:", {employeeID, password });
    console.log("findUserByEmployeeId employeeID:", employeeID, typeof employeeID);

    const existing = await userRepository.findUserByEmployeeId({ employeeID });
    
    if(!existing) throw new apiError(401,'Invalid employee  or password');

    const {id, email, role,password_hash} = existing;

    console.log("existing user:", {id, email, role, password_hash});

    const user_id = id;
     
    const isMatch = await bcrypt.compare(password,password_hash);
    if(!isMatch){
        throw new apiError(401,'Invalid employee ID or password ');
    }

    const refreshToken = generateRefreshToken(user_id);

    const tokenHash = hashToken(refreshToken);

    const expiresInDays = parseInt(process.env.JWT_REFRESH_EXPIRES_IN);
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate()+ expiresInDays);


    await userRepository.saveRefreshToken({user_id, tokenHash, expiresAt});

    const accessToken = generateAccessToken({user_id , role});
    return {
        accessToken,
        refreshToken,
        user:{
            user_id : user_id,
            email: email,
            role:role
        }
    };
}

//Generate new Access token on accesss token expiry 

const refreshAccessToken = async(refreshToken) => {
    
    const {user_id} = verifyRefreshToken(refreshToken);
    const tokenHash = hashToken(refreshToken);
    const existing = await findRefreshTokenByHash(tokenHash);
    if(!existing.token_hash){
        throw new apiError(401, 'Invalid Refresh Token');
    }

    if (existing.user_id !== user_id) {
        throw new apiError(401, "Unauthorized");
    }
   
    if(existing.revoked){
        throw new apiError(401,'Unauthorized');
    }

    if(existing.expires_at <= new Date()){
        throw new apiError(401,'Refresh Token Expired');
    }
    
    const user = await findUserById(user_id);

    const accessToken = generateAccessToken({user_id: existing.user_id , role: user.role});

    return {
        accessToken
    }         
}

module.exports = {
    signupSession,
    verifyEmail,
    setPassword,
    login,
    refreshAccessToken
}