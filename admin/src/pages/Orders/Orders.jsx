import React, { useEffect, useState } from 'react'
import './Orders.css'
import {toast} from 'react-toastify'
import axios from 'axios'
import {assets} from '../../assets/assets'

const Orders = ({url}) => {

  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async (req, res) => {
    const response = await axios.get(url+'/api/order/list');
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);//Just to check whether the data is available or not
    }else{
      toast.error('Error')
    }
  }

  const statusHandler = async(event, orderId) =>{
    // console.log(event,orderId);
    const response = await axios.post(url+'/api/order/status',{
      orderId,
      status : event.target.value
    });
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  useEffect(()=>{
    fetchAllOrders(); 
  },[]);

  return (
    <div className='order add'>
      <h3>Orders in Queue</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
            <p className="order-item-food">
            {order.items.map((item,index)=>{
              if(index === order.items.length-1){
                return item.name + ' x ' +item.quantity
              }else{
                return item.name + ' x ' + item.quantity + ", "
              }
            })}
            </p>
            </div>
            <p  className='items'>Items : {order.items.length}</p>
            <p>₹ {order.amount}</p>
            <select onChange={()=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Order Ready">Order Ready</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
