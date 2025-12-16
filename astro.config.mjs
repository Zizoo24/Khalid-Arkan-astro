// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Image optimization settings
  image: {
    // Use sharp for image processing (default in Astro 5)
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
    // Domains allowed for remote image optimization
    domains: [],
    // Remote patterns for external images
    remotePatterns: [],
  },

  // Prefetch links on hover for faster navigation
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  // Build optimizations
  build: {
    // Inline small assets
    inlineStylesheets: 'auto',
  },

  // Enable compression
  compressHTML: true,

  // Vite optimizations
  vite: {
    build: {
      // CSS code splitting
      cssCodeSplit: true,
      // Minify output
      minify: 'esbuild',
      // Rollup options for better chunking
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: {
            vendor: [],
          },
        },
      },
    },
    // Optimize deps
    optimizeDeps: {
      exclude: ['astro:assets'],
    },
  },
});
