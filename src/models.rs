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
    pub id: Uuid,
    pub mail: String,
    pub name: String,
    pub password: String,
    pub role: Role,
    pub state: State,
    pub created_at: u64,
    pub siren: Option<i32>,
}

impl User {
    pub fn new(
        mail: String,
        name: String,
        password: String,
        role: Role,
        siren: Option<i32>,
    ) -> Result<Self> {
        let id = Uuid::new_v4();
        let created_at = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)?
            .as_secs();

        let state = match role {
            Role::Admin | Role::Partner => State::WaitingActivation,
            _ => State::Active,
        };

        Ok(Self {
            id,
            mail,
            name,
            password,
            role,
            state,
            created_at,
            siren,
        })
    }
}
