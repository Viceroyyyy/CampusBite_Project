
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// import stripe from "stripe";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY});

//Placing user Order from Fronted

const placeOrder = async (req,res) => {
    const frontend_url = "http://localhost:5173"

    try{
        const newOrder = new orderModel({
           userId:req.body.userId, //This will be fetched from the middleware when the token is decoded by the middleware
           items:req.body.items,
           amount:req.body.amount,
           razorpayId:'',
        })
        
        const razorpayOrder = await razorpay.orders.create({
            amount: req.body.amount*100, // Amount in paise
            currency: "INR",
            receipt: `order_rcptid_${newOrder._id}`, // Unique receipt ID
            notes: {
                userId: req.body.userId,
                orderId: newOrder._id.toString(), // Store your order ID for reference
            },
        });
        newOrder.razorpayId = razorpayOrder.id;
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        res.json({
            success: true,
            keyId:razorpay.key_id,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            redirectUrl: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Frontend success URL
        });

    }catch(err){
        console.log(err);
        res.json({sucess:false,message: "Error"});
    }

};
//User Orders for frontend

const userOrder = async (req, res) => {
    try{
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success:true, data:orders});
    }catch(err){
        console.log(err);
        res.json({sucess:false, message: 'Error while fetching orders'});
    }
};

export {placeOrder,userOrder}; 