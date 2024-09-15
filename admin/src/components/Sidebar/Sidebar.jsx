import React from 'react';
import './Sidebar.css'
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar_options">
        <NavLink to='/add' className="sidebar_option">
            <img src={assets.add_icon} alt="" />
            <p>Add Item</p>
        </NavLink>
        <NavLink to='/list' className="sidebar_option">
            <img src={assets.list_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar_option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink >
        </div> 
    </div>
  )
}
/*Key Differences between Link and NavLink tag of react-router-dom:

	•	Styling: Link is just a basic anchor tag for navigation, while NavLink allows you to automatically apply active styles when a route is active.
	•	Use Case: Link is suitable for regular navigation, and NavLink is best for menus where highlighting the active link is desired.

    Observation in Console:
    When you go to the anchor tag in html  there you will se that the link which is active an extra class is added in the existing class so as to add extra styling when the link is active. This is the main usage of NavLink tag.

    Example 
    <a class="sidebar_option active" href="/add" aria-current="page">
    */
export default Sidebar
