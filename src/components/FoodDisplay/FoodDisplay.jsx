import React, { useContext, useState, useRef, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import FoodItem from "../FoodItem/FoodItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const FoodDisplay = ({ category }) => {
  const { food_list, searchTerm, setSearchTerm } = useContext(StoreContext);
  const [showSearch, setShowSearch] = useState(false);
  const [subCategory, setSubCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [minHeight, setMinHeight] = useState(null);
  const searchInputRef = useRef(null);
  const listContainerRef = useRef(null);
  const prevCategoryRef = useRef(category);
  const prevSubCategoryRef = useRef("All");

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Reset sub-category when main category changes
  useEffect(() => {
    setSubCategory("All");
  }, [category]);

  // Detect category or sub-category changes to show loading
  useEffect(() => {
    const categoryChanged = prevCategoryRef.current !== category;
    const subCategoryChanged = prevSubCategoryRef.current !== subCategory;

    if (categoryChanged || subCategoryChanged) {
      // Store current height before hiding content
      if (listContainerRef.current) {
        const currentHeight = listContainerRef.current.scrollHeight;
        setMinHeight(currentHeight);
      }

      // Start loading immediately
      setIsLoading(true);
      setShowContent(false);

      // After 400ms, show the new content
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 400);

      // After 100ms more (500ms total), fade out the loader and remove height constraint
      const loaderTimer = setTimeout(() => {
        setIsLoading(false);
        // Remove min-height after a brief delay to allow new content to settle
        setTimeout(() => {
          setMinHeight(null);
        }, 100);
      }, 500);

      prevCategoryRef.current = category;
      prevSubCategoryRef.current = subCategory;

      return () => {
        clearTimeout(contentTimer);
        clearTimeout(loaderTimer);
      };
    }
  }, [category, subCategory]);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowSearch(false);
  };

  // Filter products based on category, sub-category (type), and search term
  const filteredProducts = food_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;

    let matchesSubCategory = true;
    if (subCategory !== "الكل") {
      switch (subCategory) {
        case "لحوم":
          matchesSubCategory =
            item.subType === "لحوم" ||
            item.name.toLowerCase().includes("meat") ||
            item.name.toLowerCase().includes("beef") ||
            item.name.toLowerCase().includes("lamb");
          break;
        case "دجاج":
          matchesSubCategory =
            item.subType === "دجاج" ||
            item.name.toLowerCase().includes("chicken") ||
            item.name.toLowerCase().includes("دجاج");
          break;
        case "سي فود":
          matchesSubCategory =
            item.subType === "سي فود" ||
            item.name.toLowerCase().includes("fish") ||
            item.name.toLowerCase().includes("seafood") ||
            item.name.toLowerCase().includes("shrimp") ||
            item.name.toLowerCase().includes("salmon") ||
            item.name.toLowerCase().includes("tuna") ||
            item.name.toLowerCase().includes("جمبري") ||
            item.name.toLowerCase().includes("تونة");
          break;
        case "ميكس":
          matchesSubCategory =
            item.subType === "ميكس" ||
            item.name.toLowerCase().includes("mix") ||
            item.name.toLowerCase().includes("combo") ||
            item.name.toLowerCase().includes("variety") ||
            item.name.toLowerCase().includes("مشكلة") ||
            item.name.toLowerCase().includes("مارجريتا");
          break;
        default:
          matchesSubCategory = true;
      }
    }

    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-header">
        <h2 className={showSearch ? "hidden" : ""}>
          {searchTerm ? `نتائج البحث عن "${searchTerm}"` : "مينيو بلازاز"}
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
              style={{ color: showSearch ? "inherit" : "transparent" }}
            />
          </div>
          <button
            className={`food-display-search-btn ${showSearch ? "active" : ""}`}
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

      {/* Sub-Category Filter Row */}
      {category !== "All" && (
        <div className="food-display-sub-filters">
          {["الكل", "لحوم", "دجاج", "سي فود", "ميكس"].map((subType) => (
            <button
              key={subType}
              className={`food-display-sub-filter-btn ${
                subCategory === subType ? "active" : ""
              }`}
              onClick={() => setSubCategory(subType)}
            >
              {subType}
            </button>
          ))}
        </div>
      )}

      <div
        ref={listContainerRef}
        className="food-display-list"
        style={{
          position: "relative",
          minHeight: minHeight ? `${minHeight}px` : "auto",
          transition: minHeight ? "min-height 0.3s ease-out" : "none",
        }}
      >
        {/* Loading overlay for category transitions */}
        {isLoading && (
          <div className="food-display-loading-overlay">
            <div className="food-display-loading-content">
              <img
                src={assets.logo}
                alt="Loading"
                className="food-display-loading-logo"
                width="80"
                height="80"
              />
              <div className="food-display-loading-spinner"></div>
            </div>
          </div>
        )}

        {showContent &&
          filteredProducts.length > 0 &&
          filteredProducts.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              sizes={item.sizes}
            />
          ))}
        {showContent && filteredProducts.length === 0 && (
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
