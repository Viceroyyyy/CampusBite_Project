import foodModel from "../models/foodModel.js";
import fs from 'fs'; //fs file system that is prebuilt in the node.js

//add food item
//Controller function to add foodItem and using this we will create a Route
const addFood = async (req,res)=> {
    //This API i.e addFood is created to add new foodItems on the page.

    let image_filename = `${req.file.filename}` //Stores the name of the image

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
    })
    try{
        await food.save(); //Saves the data in the database
        res.json({success:true,message:"Food Added"})
    }catch(error){
        console.log(error);
        res.json({sucess:false,message:"Error saving the data!"});
    }
}//Whenever we will hit addFood API----In body we will send these details and we can access it in the backend.

//New API to display A list of all food items present.
const showFoodList = async (req, res)=>{
    try{
        const list = await foodModel.find({});
        res.json({success:true,data:list}); //Notice data : list is provided not a message like the previous one
    }catch(error){
        console.log(error);
        res.json({sucess:false,message:"Error displaying the list!"});
    }
}

const removeFood = async (req, res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{}); //Deletes the image from the uplaods folder

        await foodModel.findByIdAndDelete(req.body.id); //Deletes the entries from the database

        res.json({success:true,message:"Successfully deleted"});
    }catch(error){
        console.log(error);
        res.json({sucess:false,message:"Item couldn't be deleted"});
    }
}

export {addFood,showFoodList,removeFood}