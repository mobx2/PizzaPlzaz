import { createContext, useState } from "react";
import { food_list, menu_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // Set the first category as default (first item in menu_list)
  const [category, setCategory] = useState(menu_list[0]?.menu_name || "All");
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (itemId, selectedSize = "md") => {
    const cartKey = `${itemId}_${selectedSize}`;
    if (!cartItems[cartKey]) {
      setCartItems((prev) => ({ ...prev, [cartKey]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [cartKey]: prev[cartKey] + 1 }));
    }
  };

  const removeFromCart = (itemId, selectedSize = "md") => {
    const cartKey = `${itemId}_${selectedSize}`;
    if (cartItems[cartKey] === 1) {
      // Remove the item if the quantity becomes zero
      const newCartItems = { ...cartItems };
      delete newCartItems[cartKey];
      setCartItems(newCartItems);
    } else {
      setCartItems((prev) => ({ ...prev, [cartKey]: prev[cartKey] - 1 }));
    }
  };

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    for (const itemId in cartItems) {
      totalQuantity += cartItems[itemId];
    }
    return totalQuantity;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const cartKey in cartItems) {
      if (cartItems[cartKey] > 0) {
        const [itemId, size] = cartKey.split("_");
        let itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          let itemPrice = itemInfo.price;
          // Add size price if sizes are available
          if (itemInfo.sizes && Array.isArray(itemInfo.sizes)) {
            const sizeOption = itemInfo.sizes.find((s) => s.size === size);
            if (sizeOption) {
              itemPrice += sizeOption.price;
            }
          }
          totalAmount += itemPrice * cartItems[cartKey];
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
    category,
    setCategory,
    searchTerm,
    setSearchTerm,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
