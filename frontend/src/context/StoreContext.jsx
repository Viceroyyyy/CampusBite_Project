import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  //To check the output in console whether the item is added or not..
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

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

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
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
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
