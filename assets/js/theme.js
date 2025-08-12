// assets/js/theme.js
// Simplified and corrected version for theme switching

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Configuration ---
  const THEME_KEY = 'theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  // --- Helper Functions ---

  /**
   * Gets the user's preferred theme.
   * Checks localStorage first, then system preference.
   * @returns {string} The theme ('light' or 'dark').
   */
  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
      return storedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_THEME;
    }

    // Default theme
    return LIGHT_THEME;
  }

  /**
   * Applies the specified theme to the document.
   * @param {string} theme - The theme to apply ('light' or 'dark').
   */
  function applyTheme(theme) {
    // *** KEY CHANGE: Apply theme to the <html> element ***
    document.documentElement.setAttribute('data-theme', theme);
    // *******************************************************
  }

  /**
   * Updates the theme toggle button's icon and ARIA label based on the current theme.
   * @param {string} currentTheme - The currently active theme ('light' or 'dark').
   * @param {HTMLElement} button - The theme toggle button element.
   */
  function updateButtonUI(currentTheme, button) {
    const iconElement = button ? button.querySelector('i.fas') : null;
    if (!iconElement) return; // Safety check

    if (currentTheme === DARK_THEME) {
      iconElement.classList.remove('fa-sun');
      iconElement.classList.add('fa-moon');
      button.setAttribute('aria-label', 'Switch to light mode');
    } else {
      iconElement.classList.remove('fa-moon');
      iconElement.classList.add('fa-sun');
      button.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  /**
   * Sets the theme, saves it to localStorage, and updates the button UI.
   * @param {string} newTheme - The theme to set ('light' or 'dark').
   * @param {HTMLElement} [button] - The theme toggle button element (optional for initial set).
   */
  function setTheme(newTheme, button) {
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    // Update UI for the button if provided
    if (button) {
        updateButtonUI(newTheme, button);
    } else {
        // If button not provided, try to find and update it
        const themeToggleBtn = document.getElementById('theme-toggle');
        if (themeToggleBtn) {
            updateButtonUI(newTheme, themeToggleBtn);
        }
    }
  }

  // --- Initialization Logic ---

  // Function to initialize the theme toggle button
  function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (!themeToggleBtn) {
        // Button might not exist yet if navbar is loaded dynamically later
        // main.js should ideally call initThemeToggle after loading navbar.html
        // console.warn('Theme toggle button not found.');
        return;
    }

    // Determine and apply the initial theme
    const initialTheme = getPreferredTheme();
    // Apply theme and update button UI
    setTheme(initialTheme, themeToggleBtn);

    // Add click event listener
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-theme') || DARK_THEME; // Fallback
      const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
      setTheme(newTheme, themeToggleBtn); // Pass button for UI update
    });
  }

  // --- Expose init function for main.js to call after loading navbar ---
  window.initThemeToggle = initThemeToggle;

  // --- Try initializing immediately if DOM is ready and button might be static ---
  // This is useful if the button is directly in index.html (like the fixed one)
  // or if this script runs after the navbar component is loaded.
  initThemeToggle();

});