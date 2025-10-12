# Dark Mode Implementation Guide

## Overview
This project now includes a complete dark mode feature with the following capabilities:
- ✅ Toggle between light and dark themes
- ✅ Persistent theme preference in localStorage
- ✅ Automatic theme application on app startup
- ✅ Smooth transitions between themes
- ✅ Clean, reusable code architecture

## Features Implemented

### 1. **ThemeContext** (`src/context/ThemeContext.jsx`)
A React Context that manages the theme state globally across the application.

**Key Features:**
- Initializes theme from localStorage (defaults to 'light')
- Automatically saves theme preference to localStorage
- Applies theme using `data-theme` attribute on document root
- Provides `theme` value and `toggleTheme` function

### 2. **ThemeToggle Component** (`src/components/ThemeToggle/`)
A reusable button component that toggles between themes using **Font Awesome icons**.

**Features:**
- Professional Font Awesome icons (`faMoon` and `faSun`)
- Moon icon 🌙 in light mode (click to switch to dark)
- Sun icon ☀️ in dark mode (click to switch to light)
- Smooth hover animations with rotation effect
- Accessible with ARIA labels
- Responsive sizing for all devices
- Styled to match your app's design

**Location:** Added to the Navbar in the top-right section

**Icon Library:** Font Awesome v6 (Free Solid Icons)

### 3. **CSS Variables** (`src/index.css`)
Comprehensive CSS variables for both light and dark themes.

**Available Variables:**
```css
/* Colors */
--primary              /* Primary brand color (tomato red) */
--bg-primary           /* Main background color */
--bg-secondary         /* Secondary background (cards, sections) */
--bg-tertiary          /* Tertiary background (hover states) */
--text-primary         /* Primary text color */
--text-secondary       /* Secondary text color (muted) */
--border-color         /* Border colors */
--shadow               /* Box shadow colors */
--card-bg              /* Card background */
--footer-bg            /* Footer background */
--footer-text          /* Footer text color */
--toggle-bg            /* Theme toggle button background */
--toggle-hover-bg      /* Theme toggle hover state */
--hover-bg             /* General hover backgrounds */
```

### 4. **Custom Hook** (`src/hooks/useTheme.js`)
An optional custom hook for easy theme access in components.

**Usage:**
```javascript
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## How It Works

### Theme Initialization
1. When the app starts, `ThemeContext` checks localStorage for saved theme
2. If found, applies the saved theme; otherwise defaults to 'light'
3. Sets `data-theme` attribute on `<html>` element
4. CSS automatically applies the correct variable values

### Theme Switching
1. User clicks the theme toggle button in the navbar
2. `toggleTheme()` function switches theme state
3. `useEffect` in ThemeContext updates:
   - `data-theme` attribute on document
   - localStorage with new preference
4. CSS variables automatically update via `[data-theme="dark"]` selector

### Theme Persistence
- Theme preference is stored in `localStorage` with key: `"theme"`
- Persists across browser sessions and page refreshes
- No backend or database required

## Adding Dark Mode to New Components

### Method 1: Use CSS Variables (Recommended)
Simply use the predefined CSS variables in your component styles:

```css
.my-component {
  background-color: var(--card-bg);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px var(--shadow);
}
```

### Method 2: Use ThemeContext
Access theme value directly in your component:

```javascript
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function MyComponent() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`my-component ${theme}`}>
      {/* Component content */}
    </div>
  );
}
```

### Method 3: Use Custom Hook
```javascript
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  // Use theme value or toggleTheme function
}
```

## Customization

### Changing Theme Colors
Edit the CSS variables in `src/index.css`:

```css
/* Light Theme */
:root {
  --primary: #ff6347;     /* Change to your brand color */
  --bg-primary: #ffffff;   /* Main background */
  /* ... other variables */
}

/* Dark Theme */
[data-theme="dark"] {
  --primary: #ff6347;      /* Usually keep primary the same */
  --bg-primary: #1a1a1a;   /* Dark background */
  /* ... other variables */
}
```

### Adding More Theme Options
To add additional themes (e.g., "blue", "high-contrast"):

1. Update `ThemeContext.jsx` to support more theme values
2. Add new CSS variable sets in `index.css`:
```css
[data-theme="blue"] {
  --primary: #007bff;
  /* ... other blue theme variables */
}
```

### Moving the Theme Toggle
The toggle is currently in the Navbar. To move it:

1. Import `ThemeToggle` in your desired component
2. Add `<ThemeToggle />` where you want it to appear

```javascript
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

## Font Awesome Integration

This project uses **Font Awesome** for professional, well-designed icons.

**Packages Installed:**
```bash
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/react-fontawesome
```

**Icons Used:**
- `faMoon` - Displays in light mode (🌙)
- `faSun` - Displays in dark mode (☀️)

**Usage in ThemeToggle:**
```javascript
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

<FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
```

## Files Modified/Created

### Created:
- `src/context/ThemeContext.jsx` - Theme state management
- `src/components/ThemeToggle/ThemeToggle.jsx` - Toggle button with Font Awesome icons
- `src/components/ThemeToggle/ThemeToggle.css` - Toggle button styles
- `src/hooks/useTheme.js` - Custom hook for theme access
- `DARK_MODE.md` - This documentation

### Modified:
- `src/main.jsx` - Added ThemeProvider wrapper
- `src/index.css` - Added theme CSS variables
- `src/components/Navbar/Navbar.jsx` - Added ThemeToggle component
- `src/components/Navbar/Navbar.css` - Updated to use theme variables
- `src/components/FoodItem/FoodItem.css` - Updated to use theme variables
- `src/components/Footer/Footer.css` - Updated to use theme variables
- `package.json` - Added Font Awesome dependencies

## Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Uses CSS Custom Properties (CSS Variables) - IE11 not supported
- localStorage API is widely supported

## Performance
- Minimal performance impact
- CSS transitions are GPU-accelerated
- localStorage operations are synchronous but fast
- Theme change triggers single React re-render

## Accessibility
- Theme toggle includes ARIA labels
- Sufficient color contrast in both themes
- Keyboard accessible (can be triggered via Enter/Space)
- Respects user preferences (can be extended to check `prefers-color-scheme`)

## Future Enhancements
Consider adding these features:
- System theme detection: `window.matchMedia('(prefers-color-scheme: dark)')`
- Theme preference in user profile (if you add authentication)
- Multiple color themes (blue, green, purple, etc.)
- High contrast mode for accessibility
- Smooth page transition animations

## Troubleshooting

### Theme not persisting
- Check browser localStorage is enabled
- Check console for errors
- Verify ThemeProvider is wrapping your app in `main.jsx`

### Colors not changing
- Ensure you're using CSS variables (e.g., `var(--text-primary)`)
- Check if component CSS files are using hardcoded colors
- Verify `data-theme` attribute is on `<html>` element (inspect in DevTools)

### Toggle not appearing
- Check Navbar component imported ThemeToggle
- Verify ThemeProvider is in `main.jsx`
- Check browser console for import errors

## Support
For issues or questions about the dark mode implementation, check:
1. This documentation file
2. Component source code with inline comments
3. Browser DevTools console for errors
4. React DevTools to verify ThemeContext is available

---

**Enjoy your new dark mode feature! 🌙**
