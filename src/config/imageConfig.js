// Image configuration for optimization
export const imageConfig = {
    // Breakpoints for responsive images
    breakpoints: {
        thumbnail: 150,
        small: 320,
        medium: 640,
        large: 1024,
        xlarge: 1920,
    },

    // Quality settings per format
    quality: {
        webp: 80,
        avif: 75,
        jpeg: 85,
        png: 90,
    },

    // Lazy load settings
    lazyLoad: {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
    },

    // Placeholder strategy: 'blur' | 'skeleton' | 'none'
    placeholderStrategy: 'blur',

    // Critical images to preload (loaded immediately)
    criticalImages: [
        '/logo.png',
        '/header_img.png',
    ],

    // Sizes for different use cases
    sizes: {
        foodItem: '(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 280px',
        menuItem: '(max-width: 768px) 25vw, 120px',
        productModal: '(max-width: 768px) 90vw, 600px',
        header: '100vw',
    },
};

// Generate srcset string for responsive images
export const generateSrcSet = (imagePath, sizes = ['small', 'medium', 'large']) => {
    const basePath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '');
    return sizes
        .map(size => `${basePath}-${size}.webp ${imageConfig.breakpoints[size]}w`)
        .join(', ');
};

// Get image format priority (browser will use first supported format)
export const getFormatPriority = () => ['avif', 'webp', 'jpeg', 'png'];

// Check if image should be lazy loaded
export const shouldLazyLoad = (imagePath) => {
    return !imageConfig.criticalImages.some(critical =>
        imagePath.includes(critical)
    );
};
