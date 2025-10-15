import React, { useEffect, useState, useCallback } from "react";
import "./ProductDetailsModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Handle smooth closing with animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsAnimating(false);
      setIsClosing(false);
      onClose();
    }, 300); // Match animation duration (0.3s)
  }, [onClose]);

  // Handle opening animation
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  // Prevent clicks inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen && !isAnimating) return null;
  if (!product) return null;

  return (
    <div 
      className={`product-modal-overlay ${isClosing ? "closing" : ""}`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className={`product-modal-backdrop ${isClosing ? "closing" : ""}`}></div>

      {/* Modal Content */}
      <div 
        className={`product-modal-content ${isClosing ? "closing" : ""}`}
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <button
          className="product-modal-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Product Image */}
        <div className="product-modal-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-modal-image"
          />
        </div>

        {/* Product Info */}
        <div className="product-modal-info">
          <h2 className="product-modal-title">{product.name}</h2>
          
          <p className="product-modal-description">
            {product.description || "Delicious food crafted with care and premium ingredients. Experience the perfect blend of flavors that will satisfy your cravings and leave you wanting more. Each dish is prepared fresh daily using only the finest ingredients sourced from local suppliers. Our chefs bring years of expertise to create memorable culinary experiences that keep our customers coming back for more."}
          </p>

          <div className="product-modal-price-container">
            <span className="product-modal-price">${product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
