drop table if exists Person cascade;


CREATE TABLE Person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    favorite_animal VARCHAR(150)
);



