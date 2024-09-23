import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import verifyRouter from "./routes/verifyRoute.js";



//app config
const app = express();
const port = 4000;


//middleware
app.use(express.json());
app.use(cors());

//DB Connection
connectDB();

//api endpoints
app.use('/api/food',foodRouter);//This API endpoint is used to add food 
app.use('/images',express.static('uploads')); //This api endpoint is used to display the image by adding the /images/image_filename in the localhost4000 url.
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/ver',verifyRouter);

app.get("/",(req,res)=>{
    res.send("API Working");
})

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`);
})
 
