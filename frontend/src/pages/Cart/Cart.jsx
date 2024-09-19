import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'

const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url} = useContext(StoreContext);
  const [pkgCharges,setPkgCharges] = useState(false);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){//To check whether food Item is available or not
            return (
              <div>
              <div className="cart-items-title cart-items-item">{/* This is valid JSX syntax for assigning multiple CSS classes to a single element. */}
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹ {item.price*cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
              </div>
              <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹ {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <div>
            <p><input onChange={()=>setPkgCharges(!pkgCharges)} type="checkbox" /></p>
            <p>Delivery to Hostel</p>
            </div>
          </div>
          <hr />
          {pkgCharges
          ?<><div className="cart-total-details">
          <p>Packaging Fee</p>
          <p>₹ {20}</p>
          </div><hr /></>
          :<></>}
          {pkgCharges
          ?<div className="cart-total-details">
          <b>Total</b>
          <p>₹ {getTotalCartAmount()+20}</p>
        </div>
        :<div className="cart-total-details">
        <b>Total</b>
        <p>₹ {getTotalCartAmount()}</p>
      </div>}

          
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
