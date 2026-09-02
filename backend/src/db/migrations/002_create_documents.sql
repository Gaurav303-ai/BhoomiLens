CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL UNIQUE,

    file_path TEXT NOT NULL,

    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,

    uploaded_by UUID NOT NULL
        REFERENCES users(id),

    status VARCHAR(30) NOT NULL DEFAULT 'UPLOADED'
        CHECK (
            status IN (
                'UPLOADED',
                'PROCESSING',
                'PROCESSED',
                'VERIFICATION_REQUIRED',
                'VERIFIED',
                'FAILED'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_documents_uploaded_by
    ON documents(uploaded_by);

CREATE INDEX IF NOT EXISTS idx_documents_status
    ON documents(status);