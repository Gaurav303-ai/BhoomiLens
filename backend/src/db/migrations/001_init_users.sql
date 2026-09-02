-- Registry of officers authorized to use the system (seeded by your team, not user-writable)
CREATE TABLE IF NOT EXISTS land_record_officers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id VARCHAR(100) UNIQUE NOT NULL,
    official_email TEXT UNIQUE NOT NULL,
    first_name VARCHAR(120) NOT NULL,
    last_name VARCHAR(120),
    designation VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    district VARCHAR(120),
    tehsil VARCHAR(120),
    office_address TEXT,
    source_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pending registrations — role is deliberately absent; every new account starts as 'uploader'
CREATE TABLE IF NOT EXISTS signup_session (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id VARCHAR(100) NOT NULL REFERENCES land_record_officers(employee_id),
    first_name VARCHAR(120) NOT NULL,
    last_name VARCHAR(120),
    designation VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    token_hash TEXT NOT NULL UNIQUE,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Active accounts, created only once a signup_session is verified and a password is set
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id VARCHAR(100) UNIQUE NOT NULL REFERENCES land_record_officers(employee_id),
    first_name VARCHAR(120) NOT NULL,
    last_name VARCHAR(120),
    email TEXT UNIQUE NOT NULL,
    designation VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'uploader' CHECK (role IN ('uploader', 'verifier', 'admin')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT false,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_signup_session_employee_id ON signup_session(employee_id);