const apiError = require('../../utils/ApiError');

const uploadDocument = async ({ user_id, file }) => {
    const document = await documentRepository.createDocument({
        uploaded_by: user_id,
        original_name: file.originalname,
        stored_name: file.filename,
        file_path: file.path,
        mime_type: file.mimetype,
        file_size: file.size
    });
    return document;
};

module.exports = {
    uploadDocument
};