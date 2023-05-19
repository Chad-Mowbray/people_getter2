psql -h localhost -p 5432 -U postgres -d postgres --command "create database people;"
psql -h localhost -p 5432 -U postgres -d people -f schema.sql
psql -h localhost -p 5432 -U postgres -d people -f data.sql