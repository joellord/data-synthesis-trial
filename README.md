# Data Synthesis Exploration
Trying out the Data Synthesis project from Red Hat Healthcare (https://github.com/RedHat-Healthcare/DataSynthesis)

## Start a MySQL server
Create a Docker network
```docker network create datasynthesis```

Start a MySQL container (non-persistent data)
```docker run -d --rm --name datasynthesis_db --network datasynthesis -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=datasynthesis -e MYSQL_USER=datasynthesis -e MYSQL_PASSWORD=datasynthesis mysql:8.0```

Import the latest data set (saved as _dbdump.sql_ in the current folder):
```docker exec -i datasynthesis_db sh -c 'exec mysql -uroot -proot datasynthesis' < ./dbdump.sql```

docker exec -i datasynthesis_db sh -c 'exec mysql -uroot -proot' < ./dbdump.sql

Start a phpMyAdmin server to connect to the MySQL server
```docker run -d --rm --name datasynthesis-phpmyadmin --network datasynthesis -e MYSQL_ROOT_PASSWORD=root -e PMA_HOST=datasynthesis_db -p 8888:80 phpmyadmin/phpmyadmin```

## Start the data generator
```docker run --rm --name datasynthesis-generator --network datasynthesis -e PORT=3000 -p 3003:3000 -e MYSQL_USER=root -e MYSQL_PASSWORD=root -e MYSQL_DATABASE=datasynthesis -e MYSQL_HOST=datasynthesis_db -v ./generator:/opt/app:z -w /opt/app joellord/nodemon:14 nodemon .```