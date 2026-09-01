use std::time::{SystemTime, UNIX_EPOCH};

use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::Result;

#[derive(Serialize, Deserialize, Clone, Copy, PartialEq, Eq)]
pub enum Role {
    Admin,
    Partner,
    Manant,
}

#[derive(Serialize, Deserialize, Clone, Copy, PartialEq, Eq)]
pub enum State {
    Active,
    Suspended,
    WaitingActivation,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct User {
    id: Uuid,
    mail: String,
    name: String,
    pass: String,
    role: Role,
    state: State,
    created_at: u64,
}

impl User {
    pub async fn new(mail: String, name: String, pass: String, role: Role) -> Result<Self> {
        let id = Uuid::new_v4();
        let created_at = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs();

        Ok(Self {
            id,
            mail,
            name,
            pass,
            role,
            state: State::WaitingActivation,
            created_at,
        })
    }
}
