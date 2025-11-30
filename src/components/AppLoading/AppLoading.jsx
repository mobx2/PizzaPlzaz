import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./AppLoading.css";

const AppLoading = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Wait for DOM ready + critical resources
    if (document.readyState === "complete") {
      startFadeOut();
    } else {
      window.addEventListener("load", startFadeOut);
      return () => window.removeEventListener("load", startFadeOut);
    }

    function startFadeOut() {
      // Small delay to show logo (reduced from 2s to 300ms)
      setTimeout(() => setIsFadingOut(true), 300);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "auto";
      }, 800);
    }
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
