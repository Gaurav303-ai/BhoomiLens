const pool = require('../../config/db');

const createDocument = async ({
    original_name,
    stored_name,
    file_path,
    mime_type,
    file_size,
    uploaded_by
}) => {

    const result = await pool.query(`
        INSERT INTO documents
        (
            original_name,
            stored_name,
            file_path,
            mime_type,
            file_size,
            uploaded_by
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING
            id,
            original_name,
            stored_name,
            file_path,
            mime_type,
            file_size,
            uploaded_by,
            status,
            created_at
    `,
        [
            original_name,
            stored_name,
            file_path,
            mime_type,
            file_size,
            uploaded_by
        ]
    );

    return result.rows[0];
};

module.exports = {
    createDocument
};