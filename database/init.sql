BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(14) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(15) NOT NULL,
    user_role VARCHAR(30), NOT NULL,
    join_date DATE DEFAULT CURRENT_DATE
);

INSERT INTO users VALUES('Abdallah', 'a@a.a', '123456Aa', 'Admin');

COMMIT;