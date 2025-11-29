/**
 * Image Optimization Script
 * Converts images to WebP format and generates multiple sizes
 * Run before build: npm run prebuild
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
    inputDir: path.join(__dirname, '../src/assets'),
    outputDir: path.join(__dirname, '../public/optimized'),
    formats: ['webp'], // Add 'avif' if needed
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
    // Skip these files
    skipFiles: ['assets.js', '.DS_Store'],
    // Only process these extensions
    validExtensions: ['.jpg', '.jpeg', '.png'],
};

/**
 * Ensure output directory exists
 */
async function ensureDir(dir) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

/**
 * Get all image files from directory
 */
async function getImageFiles(dir) {
    const files = await fs.readdir(dir);
    return files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return CONFIG.validExtensions.includes(ext) && !CONFIG.skipFiles.includes(file);
    });
}

/**
 * Convert and resize a single image
 */
async function processImage(inputPath, outputDir, filename) {
    const baseName = path.parse(filename).name;
    const processed = [];

    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        console.log(`Processing: ${filename} (${metadata.width}x${metadata.height})`);

        // Generate different sizes
        for (const [sizeName, width] of Object.entries(CONFIG.sizes)) {
            // Skip if original is smaller than target size
            if (metadata.width < width) continue;

            // Generate WebP
            if (CONFIG.formats.includes('webp')) {
                const webpPath = path.join(outputDir, `${baseName}-${sizeName}.webp`);
                await image
                    .clone()
                    .resize(width, null, { withoutEnlargement: true })
                    .webp({ quality: CONFIG.quality.webp })
                    .toFile(webpPath);
                processed.push(`${baseName}-${sizeName}.webp`);
            }

            // Generate AVIF (optional, slower but better compression)
            if (CONFIG.formats.includes('avif')) {
                const avifPath = path.join(outputDir, `${baseName}-${sizeName}.avif`);
                await image
                    .clone()
                    .resize(width, null, { withoutEnlargement: true })
                    .avif({ quality: CONFIG.quality.avif })
                    .toFile(avifPath);
                processed.push(`${baseName}-${sizeName}.avif`);
            }
        }

        // Also create a full-size WebP version
        if (CONFIG.formats.includes('webp')) {
            const fullWebpPath = path.join(outputDir, `${baseName}.webp`);
            await image
                .clone()
                .webp({ quality: CONFIG.quality.webp })
                .toFile(fullWebpPath);
            processed.push(`${baseName}.webp`);
        }

        console.log(`✓ Generated ${processed.length} optimized versions`);
        return processed;
    } catch (error) {
        console.error(`✗ Error processing ${filename}:`, error.message);
        return [];
    }
}

/**
 * Main optimization function
 */
async function optimizeImages() {
    console.log('🖼️  Starting image optimization...\n');
    console.log(`Input: ${CONFIG.inputDir}`);
    console.log(`Output: ${CONFIG.outputDir}\n`);

    // Ensure output directory exists
    await ensureDir(CONFIG.outputDir);

    // Get all image files
    const imageFiles = await getImageFiles(CONFIG.inputDir);
    console.log(`Found ${imageFiles.length} images to process\n`);

    let totalProcessed = 0;
    let totalGenerated = 0;

    // Process each image
    for (const file of imageFiles) {
        const inputPath = path.join(CONFIG.inputDir, file);
        const generated = await processImage(inputPath, CONFIG.outputDir, file);

        if (generated.length > 0) {
            totalProcessed++;
            totalGenerated += generated.length;
        }
    }

    console.log('\n✅ Image optimization complete!');
    console.log(`Processed: ${totalProcessed} images`);
    console.log(`Generated: ${totalGenerated} optimized files`);
    console.log(`Output directory: ${CONFIG.outputDir}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    optimizeImages().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

export default optimizeImages;
