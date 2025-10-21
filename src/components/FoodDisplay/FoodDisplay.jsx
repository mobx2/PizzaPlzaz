import React, { useContext, useState, useRef, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const FoodDisplay = ({ category }) => {
  const { food_list, searchTerm, setSearchTerm } = useContext(StoreContext);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowSearch(false);
  };

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
      <div className="food-display-header">
        <h2 className={showSearch ? "hidden" : ""}>
          {searchTerm ? `Search Results for "${searchTerm}"` : "Top Dishes Near You"}
        </h2>
        <div className={`food-display-search ${showSearch ? "active" : ""}`}>
          <div className="search-input-container">
            <input
              ref={searchInputRef}
              type={showSearch ? "text" : "password"}
              className="food-display-search-input"
              placeholder={showSearch ? "Search for dishes..." : ""}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ color: showSearch ? 'inherit' : 'transparent' }}
            />
          </div>
          <button
            className={`food-display-search-btn ${showSearch ? 'active' : ''}`}
            onClick={showSearch ? handleClearSearch : handleSearchClick}
            aria-label={showSearch ? "Close search" : "Search"}
          >
            {showSearch ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faSearch} />
            )}
          </button>
        </div>
      </div>
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
