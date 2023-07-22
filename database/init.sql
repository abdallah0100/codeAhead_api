BEGIN;

DROP TABLE IF EXISTS users, category, subcategory CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(14) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_role VARCHAR(30) NOT NULL,
    join_date VARCHAR(11) NOT NULL
);


CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(150) NOT NULL,
    position INTEGER NOT NULL
);

CREATE TABLE subcategory(
    id SERIAL PRIMARY KEY,
    parentcat INTEGER NOT NULL,
    name VARCHAR(20),
    description VARCHAR(150)
);

CREATE TABLE thread(
    threadId SERIAL PRIMARY key,
    title VARCHAR(50) NOT NULL,
    subcategory INTEGER not NULL,
    authorId INTEGER NOT NULL
);

INSERT INTO users (username, email, password, user_role, join_date) VALUES
('Abdallah', 'a@a.a', '$2b$10$T/N3ez7rHNDetLfZydQLKOwfXzXZl03cYy5UZSd40fsJN.qIPyDqS', 'Admin', '23/1/2020');

INSERT INTO category (name, description, position) VALUES
('General Discussion', 'A category to discuss general matters', 1),
('Programming', 'Discuss Development and programming matters', 2)
;

INSERT INTO subcategory (parentcat, name, description) VALUES
(1, 'Announcements', 'Latest news and updates of CodeAhead.'),
(1, 'Introduction', 'Introduce yourself.'),
(2, 'Help', 'Ask for help regarding an issue you faced.'),
(2, 'Snippets', 'Share snippets with the community.');

COMMIT;