// Utility to generate blur placeholder for images
import { imageConfig } from '../config/imageConfig';

/**
 * Generate a blur placeholder data URL
 * @param {string} color - Dominant color of the image (hex)
 * @returns {string} - Base64 encoded blur placeholder
 */
export const generateBlurPlaceholder = (color = '#e0e0e0') => {
    // Create a simple 10x10 SVG with the dominant color
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
      <rect width="10" height="10" fill="${color}"/>
      <filter id="blur">
        <feGaussianBlur stdDeviation="2"/>
      </filter>
      <rect width="10" height="10" fill="${color}" filter="url(#blur)"/>
    </svg>
  `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Generate skeleton placeholder CSS
 * @returns {object} - CSS-in-JS object for skeleton
 */
export const getSkeletonStyles = () => ({
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton-loading 1.5s infinite',
});

/**
 * Calculate aspect ratio from dimensions
 * @param {number} width 
 * @param {number} height 
 * @returns {string} - Aspect ratio as percentage
 */
export const calculateAspectRatio = (width, height) => {
    return `${(height / width) * 100}%`;
};

/**
 * Get dominant color from image (simplified version)
 * In production, this would analyze the actual image
 * @param {string} imagePath 
 * @returns {string} - Hex color code
 */
export const getDominantColor = (imagePath) => {
    // Simplified: return neutral gray
    // In production, you'd extract this during build time
    return '#e8e8e8';
};

/**
 * Generate srcset string for an image
 * @param {string} basePath - Base path without extension
 * @param {string} format - Image format (webp, avif, jpg)
 * @param {Array} sizes - Array of size names
 * @returns {string} - srcset string
 */
export const generateSrcSet = (basePath, format = 'webp', sizes = ['small', 'medium', 'large']) => {
    const breakpoints = imageConfig.breakpoints;

    return sizes
        .map(size => {
            const width = breakpoints[size];
            return `${basePath}-${size}.${format} ${width}w`;
        })
        .join(', ');
};

/**
 * Get the appropriate sizes attribute for different components
 * @param {string} type - Component type (foodItem, menuItem, etc.)
 * @returns {string} - sizes attribute value
 */
export const getSizesAttribute = (type = 'foodItem') => {
    return imageConfig.sizes[type] || imageConfig.sizes.foodItem;
};
