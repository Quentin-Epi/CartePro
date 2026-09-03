use actix_web::web;

mod auth;
mod echo;
mod health;
mod user;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .service(health::health)
            .service(echo::echo)
            .service(user::get)
            .service(user::put)
            .configure(auth::configure),
    );
}
