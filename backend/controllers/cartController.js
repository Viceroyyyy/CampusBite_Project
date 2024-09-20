import userModel from '../models/userModel.js';

//add items to the user Cart
const addToCart = async (req,res)=>{
    try{
        const userData = await userModel.findById(req.body.userId);

        const cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
    }
    else{
        cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({sucess:true,message:"Added to Cart Successfully!!"});

    }catch(error){
        console.log(error);
        res.json({sucess:false,message:"Item Not Added!!"});
    }
}

//remove items from the user Cart

const removeFromCart = async (req,res)=>{

    try{

        const userData = await userModel.findById(req.body.userId);

        const cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({sucess:true,message:"Removed from Cart Successfully!!"});

    }catch(error){

        console.log(error);
        res.json({sucess:false,message:"Item Not Added!!"});
    }

}

// fetch user Cart data

const getCart = async (req,res)=>{

    try{

        const userData = await userModel.findById(req.body.userId);

        const cartData = await userData.cartData;
        
        res.json({sucess:true,cartData})

    }catch(error){
        console.log(error);
        res.json({sucess:false,message:"Error"});
    }
}

export {addToCart, removeFromCart, getCart}