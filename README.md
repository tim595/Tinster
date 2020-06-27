## Setup a local development environment
1. Clone the project from Github

        git clone https://github.com/tim595/Tinster.git
2. Navigate into the repository folder.

        cd Tinster/

3. Install dependencies:

        npm install && cd client && npm install && cd ../server && npm install && cd ..
        
4. Run the App:

        npm start

## Run as Docker-Container

1. Clone the 'docker' branch from Github

        git clone --single-branch --branch docker https://github.com/tim595/Tinster.git

2. Navigate into the repository folder.

        cd Tinster/

3. Build the docker images. This may take a while.

        docker-compose build

4. Start the docker images:

        docker-compose up

5. As soon as the images are up and running. The App is accessible under:
    - For Docker Desktop:
        [http://localhost:3000](http://localhost:3000)
    - For Docker Toolbox:
        [http://192.168.99.100:3000](http://192.168.99.100:3000)
