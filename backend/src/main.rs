use actix_web::{get, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;

#[get("/api/hello")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello from Rust!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::permissive(); // مؤقتاً نسمح بكل شيء
        App::new()
            .wrap(cors)
            .service(hello)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
