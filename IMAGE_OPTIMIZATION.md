# Image Optimization System

## Overview

This project implements a comprehensive image optimization system that dramatically improves website loading performance by:

1. **Lazy Loading** - Images load only when needed (near viewport)
2. **Modern Formats** - Automatic WebP conversion with fallbacks
3. **Blur Placeholders** - Smooth loading experience with blur-up effect
4. **Build-time Optimization** - Automated compression using Sharp
5. **Responsive Images** - Multiple sizes for different screen widths

## Components

### OptimizedImage

A React component that handles lazy loading, blur placeholders, and progressive image loading.

```jsx
import OptimizedImage from './components/OptimizedImage/OptimizedImage';

<OptimizedImage 
  src="/path/to/image.jpg"
  alt="Description"
  aspectRatio="1-1"  // Options: 1-1, 4-3, 16-9, 3-2
  placeholder="blur" // Options: blur, skeleton, none
  lazy={true}        // Enable lazy loading
  priority={false}   // Set true for above-fold images
  blurColor="#e8e8e8" // Dominant color for blur placeholder
/>
```

### ResponsivePicture

Implements `<picture>` element with multiple formats and sizes.

```jsx
import ResponsivePicture from './components/ResponsivePicture/ResponsivePicture';

<ResponsivePicture 
  src="/path/to/image.jpg"
  alt="Description"
  type="foodItem" // Options: foodItem, menuItem, productModal, header
  formats={['webp']} // Available formats
  sizes={['small', 'medium', 'large']} // Responsive sizes
  lazy={true}
/>
```

## Build Process

### Image Optimization Script

The `scripts/optimize-images.js` script runs before build to:

- Convert images to WebP format
- Generate multiple responsive sizes (150px, 320px, 640px, 1024px)
- Maintain original files as fallbacks
- Output to `public/optimized` directory

### Running Optimization

```bash
# Manual run
node scripts/optimize-images.js

# Automatic (runs before build)
npm run build
```

### Configuration

Edit `scripts/optimize-images.js` to customize:

```javascript
const CONFIG = {
  inputDir: path.join(__dirname, '../src/assets'),
  outputDir: path.join(__dirname, '../public/optimized'),
  formats: ['webp'], // Add 'avif' for better compression
  sizes: {
    thumbnail: 150,
    small: 320,
    medium: 640,
    large: 1024,
  },
  quality: {
    webp: 80,
    avif: 75,
    jpeg: 85,
  },
};
```

## Configuration Files

### imageConfig.js

Central configuration for all image optimization settings:

```javascript
export const imageConfig = {
  breakpoints: { thumbnail: 150, small: 320, medium: 640, large: 1024 },
  quality: { webp: 80, avif: 75, jpeg: 85 },
  lazyLoad: { rootMargin: '50px', threshold: 0.01 },
  placeholderStrategy: 'blur',
  criticalImages: ['/logo.png', '/header_img.png'],
};
```

### Vite Configuration

The `vite.config.js` includes:

- **vite-imagetools** plugin for automatic optimization
- Asset organization by type
- WebP conversion with 80% quality

## Performance Benefits

### Before Optimization
- Large PNG/JPEG files (100-200KB each)
- All images load on page load
- Slow initial page render
- Poor mobile performance

### After Optimization
- WebP files (30-60KB each) - **60-70% smaller**
- Images load progressively as needed
- Fast initial page render
- Smooth blur-up effect
- Excellent mobile performance

## Browser Compatibility

- **WebP**: 95%+ browser support (Chrome, Firefox, Edge, Safari 14+)
- **Lazy Loading**: Native support in modern browsers
- **Fallbacks**: Automatic fallback to JPEG/PNG for older browsers

## Best Practices

### Critical Images
Mark above-the-fold images as priority:

```jsx
<OptimizedImage src={logo} priority={true} />
```

### Preload Critical Assets
Add to `index.html`:

```html
<link rel="preload" as="image" href="/logo.png" type="image/png" />
```

### Aspect Ratios
Use correct aspect ratios to prevent layout shift:

```jsx
<OptimizedImage aspectRatio="16-9" /> // For wide images
<OptimizedImage aspectRatio="1-1" />  // For square images
```

### Lazy Loading
Enable for all non-critical images:

```jsx
<OptimizedImage lazy={true} /> // Default behavior
```

## Troubleshooting

### Images not loading
- Check that source path is correct
- Verify image exists in `src/assets`
- Check browser console for errors

### Build fails
- Ensure Sharp is installed: `npm install sharp`
- Check Node.js version (14+ required)
- Verify image file permissions

### Blur placeholder not showing
- Ensure `placeholder="blur"` is set
- Check that `blurColor` matches image dominant color
- Verify CSS is imported

## Future Enhancements

- [ ] AVIF format support (better compression than WebP)
- [ ] Automatic dominant color extraction
- [ ] CDN integration
- [ ] Image sprite generation
- [ ] Progressive JPEG support
