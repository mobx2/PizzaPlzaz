import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./AppLoading.css";

const AppLoading = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Hide body overflow during loading
    document.body.style.overflow = "hidden";

    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // Completely remove loader after fade animation completes
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 2500); // 2000ms delay + 500ms fade duration

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isLoading) {
    return children;
  }

  return (
    <div className={`app-loading ${isFadingOut ? "fade-out" : ""}`}>
      <div className="loading-content">
        <img
          src={assets.logo}
          alt="Pizza Plaza"
          className="loading-logo"
          width="120"
          height="120"
        />
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default AppLoading;
