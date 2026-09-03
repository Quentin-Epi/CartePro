use crate::{
    db::{get_one, update},
    entities::user as User,
};
use actix_web::{HttpRequest, HttpResponse, Responder, get, patch, web};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel, QueryFilter,
};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct PutRequest {
    pub mail: Option<String>,
    pub name: Option<String>,
    pub password: Option<String>,
    pub siren: Option<Option<i32>>,
}

#[get("/user")]
pub async fn get(req: HttpRequest, db: web::Data<DatabaseConnection>) -> impl Responder {
    let Some(auth) = req.headers().get("Authorization") else {
        return HttpResponse::Unauthorized().finish();
    };

    let Ok(auth) = auth.to_str() else {
        return HttpResponse::Unauthorized().finish();
    };

    let Some(token) = auth.strip_prefix("Bearer ") else {
        return HttpResponse::Unauthorized().finish();
    };

    let Ok(uuid) = uuid::Uuid::parse_str(token) else {
        return HttpResponse::BadRequest().finish();
    };

    let query = User::Entity::find().filter(User::Column::Id.eq(uuid));

    match get_one(db.get_ref(), query).await {
        Ok(Some(u)) => HttpResponse::Ok().json(u),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}

#[patch("/user")]
pub async fn put(
    req: HttpRequest,
    body: web::Json<PutRequest>,
    db: web::Data<DatabaseConnection>,
) -> impl Responder {
    let Some(auth) = req.headers().get("Authorization") else {
        return HttpResponse::Unauthorized().finish();
    };

    let Ok(auth) = auth.to_str() else {
        return HttpResponse::Unauthorized().finish();
    };

    let Some(token) = auth.strip_prefix("Bearer ") else {
        return HttpResponse::Unauthorized().finish();
    };

    let Ok(uuid) = uuid::Uuid::parse_str(token) else {
        return HttpResponse::BadRequest().finish();
    };

    let query = User::Entity::find().filter(User::Column::Id.eq(uuid));

    match get_one(db.get_ref(), query).await {
        Ok(Some(u)) => {
            let mut active_model = u.into_active_model();
            if let Some(mail) = &body.mail {
                active_model.set(
                    User::Column::Mail,
                    sea_orm::Value::String(Some(mail.to_owned())),
                );
            }
            if let Some(name) = &body.name {
                active_model.set(
                    User::Column::Name,
                    sea_orm::Value::String(Some(name.to_owned())),
                );
            }
            if let Some(password) = &body.password {
                active_model.set(
                    User::Column::Password,
                    sea_orm::Value::String(Some(password.to_owned())),
                );
            }
            if let Some(siren) = &body.siren {
                active_model.set(User::Column::Siren, sea_orm::Value::Int(siren.to_owned()));
            }
            match update::<User::Entity, _>(db.get_ref(), active_model).await {
                Ok(user) => HttpResponse::Ok().json(user),
                Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
            }
        }
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}
