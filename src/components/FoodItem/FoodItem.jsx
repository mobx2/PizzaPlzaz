import React, { useState } from "react";
import "./FoodItem.css";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";

const FoodItem = ({ id, name, price, description, image }) => {
  const [showModal, setShowModal] = useState(false);

  const product = {
    id,
    name,
    price,
    description,
    image
  };

  const handleShowDetails = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="food-item">
        <div className="food-item-img-container">
          <img src={image} alt={name} className="food-item-img" />
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
          </div>
          <p className="food-item-price">${price}</p>
          
          {/* Show Details Button */}
          <button 
            className="food-item-details-btn"
            onClick={handleShowDetails}
          >
            Show Details
          </button>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={showModal}
        onClose={handleCloseModal}
        product={product}
      />
    </>
  );
};

export default FoodItem;
