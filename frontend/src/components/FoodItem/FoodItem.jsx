import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({id,name,price,description,image}) => {

    // Now this itemCount state is created for each food item so if there are 32 food items it will be created for each state hence to solve this problem we use a cart object in context API 
    // const [itemCount,setItemCount] = useState(0);
    const {cartItems,setCartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div>
      <div className="food-item">
        {/* Food-Item Image */}
        <div className="food-item-img-container">
            <img className="food-item-image" src={url+"/images/"+image} alt="" />
            {/* Add Item and Item COunter Added */}
            {/*Working of Item Counter:-
                1. Added a useState Hook and by default the value of itemCounter is set to 0

                2. Now if the default value is 0 it will be turned into 1 "since(!itemCount)" and if it is true then a + image will be shown in order for the user to add the item and using onclick it will upadate the balur of itemCount to 1

                3. Finally when the item is added...the Plus sign will disappear because the !itemCount will make the value false or 0 and the control will move to the false side of th ternary operator which is the div element.

                4. Now when it reaches the div element two images will be displayed one for increasing the item count and another for decreasing the item count using onClick and setItemCount by udating the prev value.

                5.In the middle of the plus and minus images the Value of the itemCount is displayed.
            */}
            {/* {!itemCount 
                ?<img onClick={()=>{return setItemCount(prev=>prev+1)}} src={assets.add_icon_white} alt="" className="add" />
                :<div className="food-item-counter">
                   <img onClick={()=>{return setItemCount(prev=>prev-1)}} src={assets.remove_icon_red} alt="" /> 
                   <p>{itemCount}</p>
                   <img onClick={()=>{return setItemCount(prev=>prev+1)}}src={assets.add_icon_green} alt="" />
                </div>   
            } */}
            {!cartItems[id] 
                ?<img onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" className="add" />
                :<div className="food-item-counter">
                   <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" /> 
                   <p>{cartItems[id]}</p>
                   <img onClick={()=>addToCart(id)}src={assets.add_icon_green} alt="" />
                </div>   
            } 
        </div>

        <div className="food-item-info">
            {/* Food Item Rating and Name */}
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            {/* Food Item Description */}
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">₹{price}</p>
        </div>

      </div>
    </div>
  )
}

export default FoodItem
