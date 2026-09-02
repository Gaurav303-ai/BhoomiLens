const pool = require('../config/db');


const findEmployeeID = async(employeeID) =>{
    const result = await pool.query(`
        SELECT official_email 
        FROM land_record_officers
        WHERE employee_id = $1
        AND is_active = TRUE`,
        [employeeID]
    );

    return result.rows[0] || null;
}

const findUser = async(employeeID) => {
    const result = await pool.query(`
        SELECT id,email
        FROM users
        WHERE employee_id  = $1`,
        [employeeID]
    );

    return result.rows[0]||null
}

const findPhoneNumber = async(phoneNumber) => {
    const result = await pool.query(`
        SELECT id,email
        FROM users
        WHERE phone_number = $1`,
        [phoneNumber]
    );

    return result.rows[0] || null
}

const createSignupSession = async(client,{
    firstName,
    lastName,
    employeeID,
    designation,
    phoneNumber,
    tokenHash,
    verificationCodeExpiryMinutes
}) => {
    const result = await client.query(`
        INSERT INTO signup_session
        (first_name,last_name,employee_id,designation,phone_number,token_hash,expires_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING
          id
        `,
        [firstName,lastName,employeeID,designation,phoneNumber,tokenHash,verificationCodeExpiryMinutes]
    );

    return result.rows[0];
}

const verifyVerificationCode = async({
    signupId,
    tokenHash
}) => {
    
 console.log({
  signupId,
  tokenHash,
  typeOfSignupId: typeof signupId,
  typeOfHashToken: typeof tokenHash
});
    const result = await pool.query(`
        SELECT expires_at,employee_id
        FROM signup_session
        WHERE id = $1
        AND token_hash = $2 
        `,
        [signupId,tokenHash]
    );

    return result.rows[0]||null;

}
const updateVerified = async(signupId) =>{
    await pool.query(`
        UPDATE signup_session
        SET verified = true
        WHERE id = $1
        `,
        [signupId]
    );
}


const fetchFromSignupSession = async({signupId})=> {
    console.log("fetchFromSignupSession signupId:", signupId, typeof signupId);
    const result = await pool.query(`
        SELECT employee_id,
        designation,
        first_name,
        last_name,
        phone_number
        FROM signup_session
        WHERE id = $1 
        `,
        [signupId]
    );

    return result.rows[0]|| null;
}

const registerUser = async(client,{
    first_name,
    last_name,
    employee_id,
    designation,
    phone_number,
    email,
    hashedPassword
}) => {
    const result = await client.query(`
        INSERT INTO users
        (first_name,
         last_name,
         employee_id,
         designation,
         phone_number,
         email,
         password_hash )
         VALUES($1,$2,$3,$4,$5,$6,$7)
         RETURNING id,role`,
        [first_name,last_name,employee_id,designation,phone_number,email,hashedPassword]
    );

    return result.rows[0];
}

const findUserByEmployeeId = async ({ employeeID }) => {
    console.log("findUserByEmployeeId employeeID:", employeeID, typeof employeeID);
    const result = await pool.query(
        `SELECT email,password_hash,id,role
         FROM users
         WHERE employee_id = $1`,
        [employeeID]
    );

    return result.rows[0] || null ;
};

const findUserById = async (user_id) => {
    const result = await pool.query(
        `SELECT id,name,email,phone_number,role
         FROM users
         WHERE id = $1`,
        [user_id]
    );

    return result.rows[0] || null;
};

const saveRefreshToken = async({user_id, tokenHash, expiresAt}) =>{

   const result = await pool.query(`
        INSERT INTO refresh_tokens 
            (user_id,token_hash,expires_at)
        values($1,$2,$3)
        RETURNING id
        `,
       [user_id,tokenHash,expiresAt]
    );
    return result.rows[0];

};

const findRefreshTokenByHash = async({tokenHash}) => {
    const results = await pool.query(`
        SELECT id ,
        user_id,
        token_hash,
        expires_at,
        revoked
        FROM refresh_tokens
        WHERE token_hash = $1`,
        [tokenHash]
    );

    return results.rows[0] || null;
}

const revokeRefreshToken = async({id}) => {
    const result = await pool.query(`
        UPDATE refresh_tokens 
        SET revoked = NOW()
        WHERE id = $1
        RETURNING refresh_token_id, revoked_at;`,
        [id]
    );
    return result.rows[0];
}

module.exports = {
    findEmployeeID,
    findUser,
    findPhoneNumber,
    createSignupSession,
    verifyVerificationCode,
    updateVerified,
    fetchFromSignupSession,
    registerUser,
    findUserByEmployeeId,
    saveRefreshToken,
    findRefreshTokenByHash,
    revokeRefreshToken,
    findUserById
}