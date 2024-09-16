import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {

const url = "http://localhost:4000";

const [image,setImage] =  useState(false);
const [data,setData] = useState({
    name: "",
    description:"",
    price:"",
    category:"Salad"
})
/* The changeHandler function you’ve written is commonly used for handling form inputs in React. Here’s a breakdown of how it works:

	1.	event.target.name: This gets the name attribute of the input field that triggered the event.
	2.	event.target.value: This gets the value of the input field.
	3.	setData: This is a state setter function, likely from a useState hook. It takes the current state (data) and updates the value corresponding to the name of the input field.
	4.	Spread operator (...data): This ensures that the previous state (data) is preserved, while the specific field with the name attribute is updated.
*/
const changeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;

    setData(data=>({...data,[name]:value}))
}

// To check whether the entered data is stored in the state properly uncomment this useEffect hook 
//     useEffect(()=>{
//        console.log(data); 
//     },[data])


// API Calling

const submitHandler = async (event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",Number(data.price));
    formData.append("category",data.category);
    formData.append("image",image);

    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
        setData({
            name: "",
            description:"",
            price:"",
            category:"Salad"
        })
        setImage(false);
        toast.success(response.data.message);
    }
    else{
        toast.error(response.data.message);
    }
}




  return (
    <div className='add'>
        <form  className="flex-col" onSubmit={submitHandler}>

            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id='image' hidden required/>
            </div> 

            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={changeHandler} value={data.name} type="text" name='name' placeholder='Name of the product' />
            </div>

            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={changeHandler} value={data.description} name="description" rows="6" placeholder='Write product description...' />
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={changeHandler} value={data.category} name="category" >
                        <option value="Salad ">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={changeHandler} value={data.price} type="Number" name='price' placeholder='Price in Rupees(₹)'/>
                </div>
            </div>
            <button className="add-btn">Add Item</button>
        </form>
      
    </div>
  )
}

export default Add
