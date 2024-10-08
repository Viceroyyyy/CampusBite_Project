//This file is used for the authentication purpose of the token generated by the 

/*
If user sends an item id using that item id we  can add an entry in their cart.
When user sends the data they will use the token to authenticate them 
To decode the token we will use the middleware */
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {

    const {token} = req.headers;

    if(!token)
    {
        return res.json({success: false, message:"Not Authorized Login Again"});
    }

    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } 
    catch(e){
        console.log(e);
        res.json({sucess: false,message: "Error in Authorization"})
    }

}
//Above step is done to retrieve the userId from the user and now using that userId we can add remove and get cart items.

export default authMiddleware;