import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description:{type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    category: {type:String, required:true},

})

// const foodModel = mongoose.model("food",foodSchema); 

//This model must be created once but when we run this file again the model will be created again therefore to ensure that it is not created again we add a OR(||) condition

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema); 

//The above line checks that whether the models already exists or not if it does then new model is not created but if it is not present then a new model is created.

export default foodModel;