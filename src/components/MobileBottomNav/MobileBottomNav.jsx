import React, { useState, useContext, useRef, useEffect } from "react";
import "./MobileBottomNav.css";
import { useTheme } from "../../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faSearch,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import MobileMenuModal from "../MobileMenuModal/MobileMenuModal";
import { StoreContext } from "../../context/StoreContext";

const MobileBottomNav = () => {
  const { theme, toggleTheme } = useTheme();
  const { category, setCategory, searchTerm, setSearchTerm } =
    useContext(StoreContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width:419px)").matches
  );
  const searchInputRef = useRef(null);

  // Focus input when search expands
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Update isSmallScreen on resize / media change
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width:419px)");
    const handler = (e) => setIsSmallScreen(e.matches);
    // initialize
    setIsSmallScreen(mq.matches);
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, []);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    // Don't clear search term - keep filtered products displayed
  };

  // Modified: always clear the input and close the search when the internal X is used
  const handleClearSearch = () => {
    setSearchTerm("");
    // Always close the search when using the internal clear/close button
    setShowSearch(false);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="mobile-bottom-nav">
        {/* Inline Search Input - Expands when active */}
        <div
          className={`inline-search-container ${showSearch ? "active" : ""}`}
        >
          <input
            ref={searchInputRef}
            type="text"
            className="inline-search-input"
            placeholder="Search for dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Always render the internal clear/close X while the search UI is active.
              This ensures no layout shift and keeps transitions consistent. */}
          {showSearch && (
            <button
              className="inline-search-clear-btn"
              onClick={handleClearSearch}
              aria-label="Clear and close search"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}

          {/* Render external close button only when NOT on very small screens */}
          {!isSmallScreen && (
            <button
              className="inline-search-close-btn"
              onClick={handleCloseSearch}
              aria-label="Close search"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        {/* Navigation Buttons - Hidden when search is active */}
        <div className={`nav-buttons-container ${showSearch ? "hidden" : ""}`}>
          {/* Dark Mode Toggle */}
          <button
            className="mobile-nav-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            title="Toggle Dark Mode"
          >
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              className="mobile-nav-icon"
            />
          </button>

          {/* Search Button */}
          <button
            className="mobile-nav-btn"
            onClick={handleSearchClick}
            aria-label="Search"
            title="Search"
          >
            <FontAwesomeIcon icon={faSearch} className="mobile-nav-icon" />
          </button>

          {/* Menu Button */}
          <button
            className="mobile-nav-btn"
            onClick={handleMenuClick}
            aria-label="Menu"
            title="Menu"
          >
            <FontAwesomeIcon icon={faBars} className="mobile-nav-icon" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <MobileMenuModal
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        category={category}
        setCategory={setCategory}
      />
    </>
  );
};

export default MobileBottomNav;
