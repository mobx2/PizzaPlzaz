import React, { useState, useEffect } from "react";
import "./FoodItem.css";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

const FoodItem = ({ id, name, price, description, image, sizes }) => {
  const [showModal, setShowModal] = useState(false);

  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width:768px)").matches
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width:768px)");
    const handler = (e) => setIsMobile(e.matches);
    // initialize
    setIsMobile(mq.matches);
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, []);

  const product = {
    id,
    name,
    price,
    description,
    image,
    sizes,
  };

  // Calculate display price: show "md" size if available, otherwise show base price
  const getDisplayPrice = () => {
    if (sizes && Array.isArray(sizes) && sizes.length > 0) {
      const mdSize = sizes.find((s) => s.size === "md");
      if (mdSize) {
        return price + mdSize.price;
      }
    }
    return price;
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
          <OptimizedImage
            src={image}
            alt={name}
            className="food-item-img"
            aspectRatio="1-1"
            placeholder="blur"
            lazy={true}
          />
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
          </div>

          {/* Price and Show Details Button on same line */}
          <div className="food-item-price-row">
            <p className="food-item-price">{getDisplayPrice()} ج.م</p>
            <button
              className="food-item-details-btn"
              onClick={handleShowDetails}
            >
              {isMobile ? "عرض" : "عرض"}
            </button>
          </div>
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
