# Setup a local development environment
Run ``` npm start ``` in ```./tinster```

## Run as Docker-Container

1. Clone the project from Github

        git clone https://github.com/tim595/Tinster.git

2. Navigate into the repository folder.

        cd tinster/

3. Build the docker images. This may take a while.

        docker-compose build

4. Start the docker images:

        docker-compose up

5. As soon as the images are up and running. The App is accessible under:
    - For Docker Desktop:
        [http://localhost:3000](http://localhost:3000)
    - For Docker Toolbox:
        [http://192.168.99.100:3000](http://192.168.99.100:3000)