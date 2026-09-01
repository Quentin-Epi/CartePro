use actix_web::web;

mod echo;
mod health;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .service(health::health)
            .service(echo::echo),
    );
}
