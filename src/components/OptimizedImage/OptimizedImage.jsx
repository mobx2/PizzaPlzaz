import React, { useState, useEffect, useRef } from "react";
import "./OptimizedImage.css";

// Simple blur placeholder fallback
const generateBlurPlaceholder = (color = "#e8e8e8") => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
    <rect width="10" height="10" fill="${color}"/>
    <filter id="blur">
      <feGaussianBlur stdDeviation="2"/>
    </filter>
    <rect width="10" height="10" fill="${color}" filter="url(#blur)"/>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Fallback image config
const imageConfig = {
  lazyLoad: {
    rootMargin: "50px",
    threshold: 0.01,
  },
};

/**
 * OptimizedImage Component
 * Handles lazy loading, blur placeholders, and progressive image loading
 */
const OptimizedImage = ({
  src,
  alt,
  className = "",
  aspectRatio = "1-1",
  placeholder = "blur",
  fallbackSrc = null,
  onLoad = () => {},
  onError = () => {},
  priority = false, // If true, skip lazy loading
  blurColor = "#e8e8e8",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setCurrentSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: imageConfig.lazyLoad.rootMargin,
        threshold: imageConfig.lazyLoad.threshold,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [src, priority]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  // Handle image error
  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
      onError();
    }
  };

  // Generate blur placeholder
  const blurPlaceholderSrc = generateBlurPlaceholder(blurColor);

  return (
    <div
      ref={containerRef}
      className={`optimized-image-container ${className}`}
      {...props}
    >
      <div className={`optimized-image-wrapper aspect-ratio-${aspectRatio}`}>
        {/* Blur Placeholder */}
        {placeholder === "blur" && !isLoaded && isInView && (
          <img
            src={blurPlaceholderSrc}
            alt=""
            className={`optimized-image-placeholder ${
              isLoaded ? "hidden" : ""
            }`}
            aria-hidden="true"
          />
        )}

        {/* Skeleton Loader */}
        {placeholder === "skeleton" && !isLoaded && isInView && (
          <div className="skeleton-loader" aria-hidden="true" />
        )}

        {/* Loading Spinner */}
        {!isLoaded && isInView && !hasError && (
          <div className="image-loading-spinner" aria-hidden="true" />
        )}

        {/* Main Image */}
        {isInView && !hasError && (
          <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            className={`optimized-image ${isLoaded ? "loaded fade-in" : ""}`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        )}

        {/* Error State */}
        {hasError && (
          <div className="image-error">
            <span>⚠️ Image unavailable</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizedImage;
