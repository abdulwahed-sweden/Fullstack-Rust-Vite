use actix_cors::Cors;
use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct AgeInput {
    age: u8,
}

#[derive(Serialize)]
struct AgeResponse {
    message: String,
    color: String,
}

#[post("/api/check-age")]
async fn check_age(data: web::Json<AgeInput>) -> impl Responder {
    let age = data.age;

    let response = if age >= 18 {
        AgeResponse {
            message: "Welcome! You may enter ✅".to_string(),
            color: "green".to_string(),
        }
    } else if age == 17 {
        AgeResponse {
            message: "Almost there! One more year 🟠".to_string(),
            color: "orange".to_string(),
        }
    } else {
        AgeResponse {
            message: "Sorry, you are not allowed ❌".to_string(),
            color: "red".to_string(),
        }
    };

    HttpResponse::Ok().json(response)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive())
            .service(check_age)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
