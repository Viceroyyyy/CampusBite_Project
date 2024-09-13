# Backend Config

## Setting up Database

- Step 1: create a backend folder and open it in terminal
- Step 2: Write `npm init` and let everything be same and name entry point as ` server.js`
- Step 3:Create a `server.js` file in backend folder.
- Step 4:now add the required dependencies:

  - `npm install express mongoose jsonwebtoken bcrypt cors dotenv body-parser multer stripe validator nodemon`

  - `express` -
  - `mongoose` - help us to connect with the database
  - `jsonwebtoken` - authentication system
  - `bcrypt` - encrypt the user data to store in Database
  - `cors` - Give permisiion to frontend to connect to the backend
  - `dotenv` - We can use the environment variables
  - `body-parser` - Parse the data coming thorugh the user
  - `multer` - Create image store system
  - `stripe` - For Integration of payment gateway
  - `validator` - we will check whether paswword or email id is is valid or not
  - `nodemon` - When we save the project it will restart the server

- Step 5: Open `package.json` file and under the scripts section delete everything and write `"server":"nodemon server.js"` so that we can run the server.
- Step 6: Create the folder structure:

  - config folder -configuration files like databse config files
  - controllers folder - add logic forbckend
  - middleware folder - for storing all the middlewares
  - models folder - store the models of mongo DB database
  - routes folder -
  - uploads folder -uppload all the images sent by teh user
  - .env file used for storing Attributes

- Step 7: Add the `"type":"module" `above script in `package.json`
- Step 8:

  - Open Server.js file and then import express module and cors module.
  - Declare const app = express(); and const port = 4000;
  - Declare the middlewares app.use(express.jason()); and app.use(express.cors());
  - Declare the method i.e get post etc----` app.get("/",(req,res) => {res.send("API Working");})`
  - Declare the app.listen method like `` app.listen(port, ()=>{
console.log(`Server Started on http://localhost:${port}`);}) ``

- Step 9: Open MongoDB Atlas and perform the required setup
- Step 10: Create a db.js file in the config function and import mongoose and add `export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://deveshagnihotri03:agnihotri123@cluster0.hx9g5.mongodb.net/CampusBite').then(()=>{console.log("DB Connected")});
}`
- Step 11: Call the function expression connectDB in the server.js file i.e type connectDB();
- Step 12: Type npm run server in terminal and check if everything is working properly.

## Preparing DataBase

- Step 13: Created a model in Models folder:

  ```javascript

      import mongoose from 'mongoose';

      const foodSchema = new mongoose.Schema({
          name: {type:String, required: true},
          description:{type:String, required:true},
          price: {type:Number, required:true},
          image: {type:String, required:true},
          category: {type:String, required:true},
      })
      /* Now to create a model we will write */
      const foodModel = mongoose.models.food || mongoose.model('food',foodSchema);
      /* Where food is the model name whereas foodSchema is the schema */
      /* When we run this file food model gets created everytime but we do not want that therefore we use an OR condition to check whther the schema exists already or not */

      export default foodModel;
  ```

- Step 14: Creating an API to add foodItems to the database: - Go to the controller folder and add foodController.js file
  ```javascript
  import foodModel from ......
  import fs from 'fs'; fs is file system present in Node.js

            const addFood = async (req,res) => {

            }

            export {addFood};
        ```

- Step 15: Now we create a Route hence create a route called foodRoute.js in Routes folder - import express multer and API i.e {addFood}
  ```javascript
  import express from "express";
  import { addFood } from "../controllers/foodController.js";
  import multer from 'multer'; //We will create image storage system

    const foodRouter = express.Router();
    //Using this Router we can make get method post method

    //Image Storage Engine

    export default foodRouter;
```
- Step 16: Now we create a api endpoint in server .js
    ```javascript
        app.use('/api/food',foodRouter);