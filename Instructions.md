# Backend Config
- Step 1: create a backend folder and open it in terminal
- Step 2: Write ```npm init``` and let everything be same and name entry point as ``` server.js```
- Step 3:Create a ```server.js``` file in backend folder.
- Step 4:now add the required dependencies:
    - ```npm install express mongoose jsonwebtoken bcrypt cors dotenv body-parser multer stripe validator nodemon```

    - ```express``` - 
    - ```mongoose``` - help us to connect with the database
    - ```jsonwebtoken``` - authentication system
    - ```bcrypt``` - encrypt the user data to store in Database
    - ```cors``` - Give permisiion to frontend to connect to the backend
    - ```dotenv``` - We can use the environment variables
    - ```body-parser``` - Parse the data coming thorugh the user
    - ```multer``` - Create image store system
    - ```stripe``` - For Integration of payment gateway
    - ```validator``` - we will check whether paswword or email id is is valid or not
    - ```nodemon``` - When we save the project it will restart the server

- Step 5: Open ```package.json``` file and under the scripts section delete everything and write ```"server":"nodemon server.js"``` so that we can run the server.