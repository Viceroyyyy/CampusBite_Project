import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {


  const [cartItems, setCartItems] = useState({});

  const url = 'http://localhost:4000';

  const [token,setToken] = useState("");

  const[food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };
  //To check the output in console whether the item is added or not..
  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  //To fetch the data from the backend for foodItems cart
  const fetchFoodList = async () =>{

    const response = await axios.get(url+"/api/food/list")

    setFoodList(response.data.data);
  }


  useEffect(() => { //This to update the page whenever it is reloaded.
    
    async function loadData(){
      await fetchFoodList();

      if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
      }
    }
    loadData();
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };



  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if(token)
    {
      await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}});
    }
  };


  const loadCartData = async (token) => {
    const response = await axios.post(url+'/api/cart/get',{},{headers:{token}});
    setCartItems(response.data.cartData);
  };

  //  2. State (cartItems):

  //   •  You use useState to keep track of the items in the cart.
  //   •	cartItems is an object where the keys are item IDs and the values are the       quantities of each item.
  // •	For example, cartItems might look like this: { "item1": 2, "item2": 1 }, which means you have 2 of “item1” and 1 of “item2.”

  //     3. addToCart Function:

  // 	•	This function is used to add an item to the cart.
  // 	•	When you call addToCart(itemId), it checks if the item is already in the cart:
  // 	•	If it’s not in the cart, it adds the item with a quantity of 1.
  // 	•	If it is in the cart, it increases the quantity of that item by 1.

  //      4. removeFromCart Function:

  // 	•	This function is used to remove an item from the cart.
  // 	•	When you call removeFromCart(itemId), it decreases the quantity of that item by 1.
  // 	•	If the quantity reaches 0, the item is removed from the cart entirely.

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    setToken,
    token
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
