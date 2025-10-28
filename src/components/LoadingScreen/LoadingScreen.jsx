import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { assets } from "../../assets/assets";
import "./LoadingScreen.css";

const LoadingScreen = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Minimum display time for the loading screen (in milliseconds)
    const minLoadingTime = 2000;
    const startTime = Date.now();

    // Simulate loading (you can replace this with actual loading logic)
    const timer = setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      // Ensure the loading screen is shown for at least minLoadingTime
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    }, 500); // Start checking after 500ms

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`loading-screen ${theme}`}>
        <div className="loading-content">
          <img
            src={assets.logo}
            alt="Pizza Plaza Logo"
            className="loading-logo"
            width="120"
            height="120"
          />
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return children;
};

export default LoadingScreen;
