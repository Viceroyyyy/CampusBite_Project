import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";




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


app.get("/",(req,res)=>{
    res.send("API Working");
})

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`);
})
 
