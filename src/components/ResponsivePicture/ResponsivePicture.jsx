import React, { useState, useEffect, useRef } from 'react';
import './ResponsivePicture.css';
import { imageConfig } from '../../config/imageConfig';
import { generateSrcSet, getSizesAttribute } from '../../utils/generatePlaceholder';

/**
 * ResponsivePicture Component
 * Renders <picture> element with multiple formats and sizes
 * Provides automatic format fallback (AVIF → WebP → JPEG/PNG)
 */
const ResponsivePicture = ({
    src,
    alt,
    className = '',
    type = 'foodItem', // foodItem, menuItem, productModal, header
    formats = ['webp'], // Available formats to use
    sizes = ['small', 'medium', 'large'],
    fallbackFormat = 'jpeg',
    lazy = true,
    onLoad = () => { },
    onError = () => { },
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(!lazy);
    const [hasError, setHasError] = useState(false);
    const pictureRef = useRef(null);

    // Get base path without extension
    const getBasePath = (imagePath) => {
        return imagePath.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
    };

    const basePath = getBasePath(src);

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (!lazy || !pictureRef.current) {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: imageConfig.lazyLoad.rootMargin,
                threshold: imageConfig.lazyLoad.threshold,
            }
        );

        observer.observe(pictureRef.current);

        return () => {
            if (pictureRef.current) {
                observer.unobserve(pictureRef.current);
            }
        };
    }, [lazy]);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad();
    };

    const handleError = () => {
        setHasError(true);
        onError();
    };

    // Get sizes attribute for responsive images
    const sizesAttr = getSizesAttribute(type);

    return (
        <div ref={pictureRef} className={`responsive-picture-container ${className}`}>
            {isInView && (
                <picture className="responsive-picture">
                    {/* AVIF format (best compression, modern browsers) */}
                    {formats.includes('avif') && (
                        <source
                            type="image/avif"
                            srcSet={generateSrcSet(basePath, 'avif', sizes)}
                            sizes={sizesAttr}
                        />
                    )}

                    {/* WebP format (great compression, wide support) */}
                    {formats.includes('webp') && (
                        <source
                            type="image/webp"
                            srcSet={generateSrcSet(basePath, 'webp', sizes)}
                            sizes={sizesAttr}
                        />
                    )}

                    {/* Fallback to original format (JPEG/PNG) */}
                    <img
                        src={src}
                        alt={alt}
                        loading={lazy ? 'lazy' : 'eager'}
                        decoding="async"
                        onLoad={handleLoad}
                        onError={handleError}
                        className={isLoaded ? 'loaded' : ''}
                        {...props}
                    />
                </picture>
            )}

            {hasError && (
                <div className="image-error">
                    <span>⚠️ Image unavailable</span>
                </div>
            )}
        </div>
    );
};

export default ResponsivePicture;
