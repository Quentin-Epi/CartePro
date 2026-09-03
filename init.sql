CREATE TABLE users (
    id UUID PRIMARY KEY,
    mail VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(32) NOT NULL,
    state VARCHAR(32) NOT NULL,
    created_at BIGINT NOT NULL,
    siren INT4 UNIQUE
);
