import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
// import Razorpay from "razorpay"

const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url,token} = useContext(StoreContext);
  const [pkgCharges,setPkgCharges] = useState(false);

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems);
    let orderData = {
      items: orderItems,
      amount: pkgCharges?getTotalCartAmount() +20:getTotalCartAmount(),
    }

    let response = await axios.post(url+'/api/order/place',orderData,{headers: {token}});

    if(response.data.success){
      // const session_url = response.data;
      // window.location.replace(session_url);
      try{
        const {keyId,orderId, amount,currency} = response.data;

      const options = {
        key : keyId,
        amount : amount,
        currency : currency,
        name : "CampusBite",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
          // This function handles the successful payment
          const data = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            order_id: orderId,
          };

          // Call the backend API to verify the payment
          const verifyResponse = await axios.post(url+'/api/ver/verify', data);
          if (verifyResponse.data.success) {
            window.location.href = `/myorder`;
          } else {
            alert('Payment verification failed');
            window.location.href = `/`;
          }
        },
        theme: {
          color: '#ff6347',
        },
        modal : {
          ondismiss: async () => {
            alert('Payment process was interrupted. Redirecting to Home.');
            const order_id = {razorpay_order_id: orderId,}
            await axios.post(url+'/api/ver/delete',order_id);
            window.location.href = `/`;
          }
        }
      }
      
      const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      }catch(err){
        console.error('Order creation failed:', err);
      }
      
    }

    // useEffect(()=>{
    //   console.log(razorpay_order_id);
    // },placeOrder) 

  }

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

          
          <button type="submit" onClick={placeOrder}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
/* Implement Razorpay payment integration on the Cart page

- Added the Razorpay payment integration flow within the `placeOrder` function.
- Included the logic to handle successful payments and verification using Razorpay's `handler` function.
- Set up order placement, packaging charges, and delivery options.
- Implemented the logic for handling failed payments with a modal dismiss.
- Connected the cart data with the StoreContext, displaying the items, their prices, and the total amount.
- Updated UI to reflect the total charges including optional packaging fees.
*/