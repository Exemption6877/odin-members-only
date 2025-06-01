CREATE DATABASE members_only;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    admin BOOLEAN DEFAULT FALSE,
    membership BOOLEAN DEFAULT FALSE

);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT,
    release_date DATE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
