use actix_files::Files;
use actix_web::{App, HttpServer, web};

mod api;
mod config;
mod db;
mod models;

pub type Result<T> = anyhow::Result<T>;

use actix_files::NamedFile;
use actix_web::HttpRequest;

pub async fn spa(req: HttpRequest) -> actix_web::Result<NamedFile> {
    let path = req.path();

    if path.starts_with("/api/") {
        return Err(actix_web::error::ErrorNotFound("not found"));
    }

    Ok(NamedFile::open("./web/dist/index.html")?)
}

#[actix_web::main]
async fn main() -> Result<()> {
    dotenvy::dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let addr = std::env::var("SERVER_HOST").unwrap_or(config::SERVER_HOST.to_string());
    let port = std::env::var("SERVER_PORT")
        .unwrap_or_default()
        .parse::<u16>()
        .unwrap_or(config::SERVER_PORT);

    let db_url =
        std::env::var("DATABASE_URL").expect("Error: Missing 'DATABASE_URL' env variable.");

    let db = db::connect(&db_url)
        .await
        .map_err(|e| anyhow::anyhow!("Error connecting to Database: {e}"))?;

    Ok(HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(db.clone()))
            .configure(api::configure)
            .service(Files::new("/assets", "./web/dist/assets"))
            .default_service(web::route().to(spa))
    })
    .bind((addr, port))?
    .run()
    .await?)
}
