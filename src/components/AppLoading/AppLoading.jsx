import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './AppLoading.css';

const AppLoading = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 2000);

    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (isLoading) {
    return (
      <div className="app-loading">
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
  }

  return children;
};

export default AppLoading;
