import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


//login user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;

    try{
        //checking whether user already exist or not
        const exists = await userModel.findOne({email});

        if(exists) {
            return res.json({success: false, message: "User already exists"});
        }
        
        //Validating email format and Strong Password

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid Email!"});
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a stronger Password"});
        }

        //Hashing user password(Encrypting using bcrypt)

        const salt = await bcrypt.genSalt(10); 
        // Higher the number stronger is the password..range is (5 to 15) for 15 the time will a lot more
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });

        const user = await newUser.save(); //Too save this user data in Database
        const token = createToken(user._id)
        res.json({success:true,token})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"User Login failed!!"})
    }

}


// register user 

const loginUser = async (req,res) => {
    const{email,password} = req.body;
    try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User does not exist!!"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid Password"});
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Login Unsuccessfull!!"});
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

export {loginUser, registerUser};
