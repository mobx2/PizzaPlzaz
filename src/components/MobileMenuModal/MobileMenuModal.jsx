import React, { useEffect } from "react";
import "./MobileMenuModal.css";
import MenuList from "../MenuList/MenuList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MobileMenuModal = ({ isOpen, onClose, category, setCategory }) => {
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
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay">
      {/* Backdrop */}
      <div className="mobile-menu-backdrop" onClick={onClose}></div>

      {/* Menu Content */}
      <div className="mobile-menu-content">
        <div className="mobile-menu-header">
          <h2>Explore Our Menu</h2>
          <button
            className="mobile-menu-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <MenuList
          category={category}
          setCategory={setCategory}
          onItemClick={onClose}
        />
      </div>
    </div>
  );
};

export default MobileMenuModal;
