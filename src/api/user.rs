use crate::{db::get_one, entities::user as User};
use actix_web::{HttpRequest, HttpResponse, Responder, get, put, web};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use serde::Deserialize;

use crate::models::Role;

#[derive(Deserialize)]
pub struct PutRequest {
    pub mail: String,
    pub name: String,
    pub password: String,
    pub role: Role,
    pub siren: Option<i32>,
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

    let query = User::Entity::find().filter(User::Column::Id.eq(token));

    match get_one(db.get_ref(), query).await {
        Ok(Some(u)) => HttpResponse::Ok().json(u),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}

#[put("/user")]
pub async fn put(body: web::Json<PutRequest>, db: web::Data<DatabaseConnection>) -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "status": "ok"
    }))
}
