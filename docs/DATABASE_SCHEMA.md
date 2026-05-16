# Database Schema - CalisthenicsHub

##Visual ERD

```mermaid
erDiagram
USER ||--o{ PURCHASE : makes
USER {
    string id PK
    string email UK
    string password 
    string name
    enum role "STUDENT | ADMIN"
    timestamp
    datetime created_at 
}

COURSE ||--o{ LESSON : contains
COURSE ||--o{ PURCHASE : "is bought via"
COURSE {
    string id PK 
    string title 
    string description 
    float price 
    string thumbnail_url 
    boolean is_published
}

LESSON {
    string id PK
    string course_id FK
    string title 
    string video_url 
    int position "Order of lesson"
}

PURCHASE {
    string id PK
    string user_id FK
    string course_id FK
    datetime purchased_at
    float amount_paid
}
