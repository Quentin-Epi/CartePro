CREATE TABLE users (
    id UUID PRIMARY KEY,
    mail VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(32) NOT NULL,
    created_at BIGINT NOT NULL
);
 
CREATE TABLE state (
    id UUID PRIMARY KEY REFERENCES users(id),
    state VARCHAR(32) NOT NULL,
    reason VARCHAR(255),
    modified_at DATE NOT NULL
);
 
CREATE TABLE employee (
    id UUID PRIMARY KEY REFERENCES users(id),
    balance INT2
);
 
CREATE TABLE partner (
    id UUID PRIMARY KEY REFERENCES users(id),
    siren INT4 UNIQUE,
    social_obj VARCHAR(255),
    highlight BOOL,
    verification BOOL,
    category VARCHAR(255)
);
 
CREATE TABLE admin (
    id UUID PRIMARY KEY REFERENCES users(id),
);
 
CREATE TABLE transaction (
    id UUID PRIMARY,
    do_at DATE NOT NULL,
    success BOOL,
    value INT2,
    partner_id UUID KEY REFERENCES users(partner_id),
    employee_id UUID KEY REFERENCES users(employee_id),
);
