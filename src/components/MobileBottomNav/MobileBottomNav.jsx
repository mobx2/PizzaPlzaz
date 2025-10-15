import React, { useState, useContext } from "react";
import "./MobileBottomNav.css";
import { useTheme } from "../../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import MobileMenuModal from "../MobileMenuModal/MobileMenuModal";
import { StoreContext } from "../../context/StoreContext";

const MobileBottomNav = () => {
  const { theme, toggleTheme } = useTheme();
  const { category, setCategory } = useContext(StoreContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    // Add your search functionality here
    console.log("Search clicked");
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="mobile-bottom-nav">
        {/* Dark Mode Toggle */}
        <button
          className="mobile-nav-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
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
