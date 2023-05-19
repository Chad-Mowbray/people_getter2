FROM postgres:15

WORKDIR /src

COPY *.sql .

COPY setup_db.sh .
    
CMD ["postgres"]