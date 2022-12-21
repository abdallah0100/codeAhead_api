BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(14) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(15) NOT NULL,
    user_role VARCHAR(30) NOT NULL,
    join_date VARCHAR(11) NOT NULL
);

INSERT INTO users (username, email, password, user_role, join_date) VALUES('Abdallah', 'a@a.a', '123', 'Admin', '15-12-2022');
INSERT INTO users (username, email, password, user_role, join_date) VALUES('abdallah1', 'a@a.a1', '123', 'Admin', '15-12-2022');

COMMIT;