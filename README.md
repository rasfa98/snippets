# Snippets

A CRUD-application that handles code snippets.

![snippets](https://user-images.githubusercontent.com/31412046/50057641-8838d600-016d-11e9-93ec-83370ec127be.png)

## Features

- Login/registration
- Add snippet with tags
- Filter snippets by creator or tag
- Edit/delete snippets
- View other users snippets
- Feedback messages

## Start the application/server using docker

1. Use **npm install** to install the required packages 
2. Use **npm start** or **docker-compose up** to start the application
3. Navigate to http://localhost:8000/

## Start the application/server without docker

1. Use **npm install** to install the required packages
2. Change the connection string in *config/mongoose.js* to any other database service
3. Use **node app.js** to start the application
4. Navigate to http://localhost:8000/
