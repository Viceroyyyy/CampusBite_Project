import express from "express";
import { addFood, removeFood, showFoodList } from "../controllers/foodController.js";
import multer from 'multer'; //We will create image storage system


const foodRouter = express.Router();
//Using this Router we can make get method post method

//Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads", //Image is stored in uploads folder
    filename:(req,file,cb)=>{ //cb stands for callback 
        return cb(null,`${Date.now()}${file.originalname}`); //returns the curret timestamp we use that so that our imagefile becomes unique everytime it is created and this is stored in uploads folder  
    }
})

const upload = multer({storage: storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",showFoodList);
foodRouter.post('/remove',removeFood);
export default foodRouter;