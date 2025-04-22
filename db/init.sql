CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL
);

INSERT INTO messages (message) VALUES ('Hello from Postgres!'), ('Docker + Compose = ❤️');
