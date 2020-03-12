# Setup a development environment
Run ``` npm start ``` in ```./tinster```

# MongoDB initial aufsetzen: 

## Create docker container and start its bash
```
docker run -d --name tinster -p 27017:27017 mongo:latest
(docker start tinster)
docker exec -it tinster bash
```

## start mongo bash and create database + collection
```
mongo
use tinster
db.createCollection("user")
```

## insert an element
```
db.user.insertOne( {userName: "asdf", password: "asdf2", eMail: "test@web.de"} )
```
