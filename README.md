# I am using Docker for this project

## Start the application/server using docker

1. Use **npm install** to install the required packages 
2. Use **npm start** or **docker-compose up** to start the application
3. Navigate to http://localhost:8000/

## Start the application/server without docker

1. Use **npm install** to install the required packages
2. Change the connection string in *config/mongoose.js* to any other database service
3. Use **node app.js** to start the application
4. Navigate to http://localhost:8000/