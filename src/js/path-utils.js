/**
 * Path utilities for handling base paths in development and production
 */

// Get base URL from Vite (replaced at build time)
// Fallback to runtime detection if not available
const getBaseUrlValue = () => {
    // Vite replaces import.meta.env.BASE_URL at build time
    try {
        const base = import.meta.env.BASE_URL;
        if (base) return base;
    } catch (e) {
        // Not in ES module context
    }
    
    // Runtime fallback: detect from current path
    const path = window.location.pathname;
    if (path.startsWith('/lux-vera/')) {
        return '/lux-vera/';
    }
    return '/';
};

const PathUtils = {
    /**
     * Get the base URL (works in both dev and production)
     * @returns {string} Base URL with trailing slash
     */
    getBaseUrl: getBaseUrlValue,

    /**
     * Resolve a path relative to base URL
     * @param {string} path - Path to resolve (should start with /)
     * @returns {string} Resolved path
     */
    resolve: (path) => {
        const base = PathUtils.getBaseUrl();
        if (path.startsWith('/')) {
            return base + path.slice(1);
        }
        return base + path;
    },

    /**
     * Load JSON file with base URL support
     * @param {string} path - Path to JSON file (relative to base or absolute)
     * @returns {Promise<any>} Parsed JSON data
     */
    loadJSON: async (path) => {
        const base = PathUtils.getBaseUrl();
        let url = path;
        
        // If path doesn't start with http/https, handle base URL
        if (!path.match(/^https?:\/\//)) {
            if (path.startsWith('/')) {
                // Absolute path from root - add base URL
                url = base + path.slice(1);
            } else {
                // Relative path - try with base URL first, then fallback to relative
                // This handles both public folder files and same-directory files
                const baseUrl = base + path;
                try {
                    const response = await fetch(baseUrl);
                    if (response.ok) {
                        return response.json();
                    }
                } catch (e) {
                    // Fallback to relative path
                }
                url = path;
            }
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        return response.json();
    }
};

export default PathUtils;

