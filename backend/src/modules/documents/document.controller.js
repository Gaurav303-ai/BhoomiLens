const asyncHandler = require('../../utils/asyncHandler.js');
const documentService = require('./document.service.js');

const uploadDocument = asyncHandler(async(req,res,next) => {
    const  {user_id} = req.user;
    const file = req.file;
    const data = await documentService.uploadDocument({ user_id, file });
    res.status(201).json({
        success:true,
        message:"Document uploaded successfully",
        data
    });
});

module.exports = {
    uploadDocument
};
