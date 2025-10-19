import React, { useContext, useState, useRef, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = ({ setShowLogin }) => {
  const { getTotalQuantity, searchTerm, setSearchTerm } =
    useContext(StoreContext);
  const totalQuantity = getTotalQuantity();
  const [menu, setMenu] = useState("home");
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

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        {/* <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a> */}
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <div
          className={`desktop-search-container ${showSearch ? "active" : ""}`}
        >
          <input
            ref={searchInputRef}
            type="text"
            className="desktop-search-input"
            placeholder="Search for dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {showSearch ? (
            <button
              className="desktop-search-btn clear"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          ) : (
            <button
              className="desktop-search-btn"
              onClick={handleSearchClick}
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          )}
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
