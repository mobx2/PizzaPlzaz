import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import "./SearchModal.css";
import { StoreContext } from "../../context/StoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchModal = ({ isOpen, onClose }) => {
  const { searchTerm, setSearchTerm } = useContext(StoreContext);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
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

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
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

  const handleClear = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Prevent clicks inside modal from closing it
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`search-modal-overlay ${isClosing ? "closing" : ""}`}>
      {/* Backdrop */}
      <div 
        className={`search-modal-backdrop ${isClosing ? "closing" : ""}`}
        onClick={handleClose}
      ></div>

      {/* Search Content */}
      <div 
        className={`search-modal-content ${isClosing ? "closing" : ""}`}
        ref={modalRef}
        onClick={handleContentClick}
      >
        <div className="search-modal-header">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search for dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="search-clear-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
        <p className="search-info">
          {searchTerm
            ? `Searching for "${searchTerm}"...`
            : "Type to search for dishes"}
        </p>
      </div>
    </div>
  );
};

export default SearchModal;
