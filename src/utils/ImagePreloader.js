// Image preloader utility for critical assets
import { imageConfig } from '../config/imageConfig';

class ImagePreloader {
    constructor() {
        this.preloadedImages = new Set();
        this.preloadQueue = [];
    }

    /**
     * Preload a single image
     * @param {string} src - Image source URL
     * @param {string} priority - 'high' | 'low'
     * @returns {Promise} - Resolves when image is loaded
     */
    preloadImage(src, priority = 'low') {
        if (this.preloadedImages.has(src)) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                this.preloadedImages.add(src);
                resolve();
            };

            img.onerror = () => {
                console.warn(`Failed to preload image: ${src}`);
                reject(new Error(`Failed to load ${src}`));
            };

            // Set fetchpriority for modern browsers
            if (priority === 'high') {
                img.fetchPriority = 'high';
            }

            img.src = src;
        });
    }

    /**
     * Preload multiple images
     * @param {Array<string>} sources - Array of image URLs
     * @param {string} priority - 'high' | 'low'
     * @returns {Promise} - Resolves when all images are loaded
     */
    preloadImages(sources, priority = 'low') {
        const promises = sources.map(src => this.preloadImage(src, priority));
        return Promise.all(promises);
    }

    /**
     * Preload critical images defined in config
     * @returns {Promise}
     */
    preloadCriticalImages() {
        return this.preloadImages(imageConfig.criticalImages, 'high');
    }

    /**
     * Add preload link tag to document head
     * @param {string} href - Image URL
     * @param {string} type - MIME type (image/webp, image/avif, etc.)
     * @param {string} as - Resource type (default: 'image')
     */
    addPreloadLink(href, type = 'image/webp', as = 'image') {
        // Check if link already exists
        const existingLink = document.querySelector(`link[href="${href}"]`);
        if (existingLink) return;

        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = as;
        link.href = href;
        link.type = type;

        document.head.appendChild(link);
    }

    /**
     * Add preconnect for external image domains
     * @param {string} domain - Domain to preconnect
     */
    addPreconnect(domain) {
        const existingLink = document.querySelector(`link[href="${domain}"]`);
        if (existingLink) return;

        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';

        document.head.appendChild(link);
    }

    /**
     * Check if an image is already preloaded
     * @param {string} src - Image source
     * @returns {boolean}
     */
    isPreloaded(src) {
        return this.preloadedImages.has(src);
    }

    /**
     * Clear preloaded images cache
     */
    clearCache() {
        this.preloadedImages.clear();
    }
}

// Export singleton instance
export const imagePreloader = new ImagePreloader();

// Export class for testing
export default ImagePreloader;
