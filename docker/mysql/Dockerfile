FROM mysql:latest
ENV  MYSQL_ROOT_PASSWORD=Passw0rd! \
     MYSQL_DATABASE=think \
     MYSQL_USER=student \
     MYSQL_PASSWORD=Passw0rd!

ADD mysql-db-script.txt /
ADD create-table.sh /
RUN chmod +x /create-table.sh
CMD /create-table.sh

EXPOSE 3306