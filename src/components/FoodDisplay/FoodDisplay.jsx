import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, searchTerm } = useContext(StoreContext);

  // Filter products based on category and search term
  const filteredProducts = food_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <h2>
        {searchTerm
          ? `Search Results for "${searchTerm}"`
          : "Top Dishes Near You"}
      </h2>
      <div className="food-display-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="no-results">
            {searchTerm
              ? `No dishes found matching "${searchTerm}"`
              : "No dishes available in this category"}
          </p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
