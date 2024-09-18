import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {type:String, required: true},
    email : {type:String, required: true, unique: true},
    password : {type: String, required: true},
    cartData : {type:Object, default: {}}
},{minimize:false});

// Mongoose will, by default, "minimize" schemas by removing empty objects. This behavior can be overridden by setting minimize option to false. It will then store empty objects. Hence to store the empty objects we have to set minimize property to false


const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;