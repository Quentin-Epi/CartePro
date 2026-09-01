use actix_web::{HttpResponse, Responder, post, web};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{
    db::{get_one, insert},
    entities::user::{self as User},
};

#[derive(Deserialize)]
pub struct LoginRequest {
    pub mail: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub id: Uuid,
    pub mail: String,
    pub name: String,
}

#[post("/login")]
pub async fn login(
    body: web::Json<LoginRequest>,
    db: web::Data<DatabaseConnection>,
) -> impl Responder {
    let query = User::Entity::find().filter(User::Column::Mail.eq(&body.mail));

    match get_one(&**db, query).await {
        Ok(Some(user)) => {
            if user.password_hash == body.password {
                HttpResponse::Ok().json(AuthResponse {
                    id: user.id,
                    mail: user.mail.clone(),
                    name: user.name.clone(),
                })
            } else {
                HttpResponse::Unauthorized().body("Wrong password.")
            }
        }
        Ok(None) => HttpResponse::Unauthorized().finish(),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}

#[derive(Deserialize)]
pub struct RegisterRequest {
    pub mail: String,
    pub name: String,
    pub password: String,
}

#[post("/register")]
pub async fn register(
    body: web::Json<RegisterRequest>,
    db: web::Data<DatabaseConnection>,
) -> impl Responder {
    let query = User::Entity::find().filter(User::Column::Mail.eq(&body.mail));

    match get_one(db.get_ref(), query).await {
        Ok(Some(_)) => return HttpResponse::Conflict().finish(),
        Ok(None) => {}
        Err(e) => return HttpResponse::InternalServerError().body(e.to_string()),
    }

    let user = match crate::models::User::new(
        body.mail.clone(),
        body.name.clone(),
        body.password.clone(),
        crate::models::Role::Manant,
    ) {
        Ok(user) => user,
        Err(e) => {
            return HttpResponse::InternalServerError().body(e.to_string());
        }
    };

    let entity = User::ActiveModel::from(User::Model::from(user));

    match insert::<User::Entity, _>(db.get_ref(), entity).await {
        Ok(user) => HttpResponse::Ok().json(AuthResponse {
            id: user.id,
            mail: user.mail,
            name: user.name,
        }),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/auth").service(login).service(register));
}
