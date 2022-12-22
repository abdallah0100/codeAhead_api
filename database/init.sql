BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(14) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_role VARCHAR(30) NOT NULL,
    join_date VARCHAR(11) NOT NULL
);

COMMIT;