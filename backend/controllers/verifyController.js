import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY});

    const verifyOrder = async (req,res) => {
        try {
            // Extract the details sent from the frontend
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        
            // Create the expected signature using HMAC SHA256
            const generated_signature = crypto
              .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
              .update(`${razorpay_order_id}|${razorpay_payment_id}`)
              .digest('hex');
        
            // Compare the generated signature with the one sent from Razorpay
            if (generated_signature === razorpay_signature) {
              // Signature matched - proceed with further processing
        
              // Update order status in the database to 'Paid'
              await orderModel.findOneAndUpdate(
                { razorpayId: razorpay_order_id },
                {
                  payment: true,
                }
              );
            //   console.log(razorpay_order_id);
        
              res.json({ success: true, message: 'Payment verified successfully!' });
            } else {
              // Signature did not match
              await orderModel.findOneAndDelete({ razorpayId: razorpay_order_id });
              res.status(400).json({ success: false, message: 'Invalid payment signature!' });
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            await orderModel.findOneAndDelete({ razorpayId: razorpay_order_id });
            res.status(500).json({ success: false, message: 'Server error during payment verification' });
          }
    }

    const deleteOrder = async (req, res) => {
        const {razorpay_order_id} = req.body;
        try{
            await orderModel.findOneAndDelete({razorpayId:razorpay_order_id});
            res.json({success:true,message: 'Order deleted successfully!'})
        }catch(error){
            console.log('Error while deleting order!',error);
            res.status(500).json({success:false,message:'Error deleting order!'})
        }
        
    }

    export {verifyOrder,deleteOrder}