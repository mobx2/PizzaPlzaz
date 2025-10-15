import React, { useEffect, useState, useCallback } from "react";
import "./MobileMenuModal.css";
import MenuList from "../MenuList/MenuList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MobileMenuModal = ({ isOpen, onClose, category, setCategory }) => {
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
    }, 400); // Match animation duration (0.4s)
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

  // Prevent clicks inside menu from closing it
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`mobile-menu-overlay ${isClosing ? "closing" : ""}`}>
      {/* Backdrop */}
      <div 
        className={`mobile-menu-backdrop ${isClosing ? "closing" : ""}`}
        onClick={handleClose}
      ></div>

      {/* Menu Content */}
      <div 
        className={`mobile-menu-content ${isClosing ? "closing" : ""}`}
        onClick={handleContentClick}
      >
        <div className="mobile-menu-header">
          <h2>Explore Our Menu</h2>
          <button
            className="mobile-menu-close"
            onClick={handleClose}
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <MenuList
          category={category}
          setCategory={setCategory}
          onItemClick={handleClose}
        />
      </div>
    </div>
  );
};

export default MobileMenuModal;
