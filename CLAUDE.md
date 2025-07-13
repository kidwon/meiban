# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Project Setup
```bash
npm install
```

### Development
```bash
npm run serve    # Starts development server with hot reload
npm run build    # Production build
npm run lint     # Lints and fixes files
npm run deploy   # Builds and deploys to GitHub Pages
```

### Key File Structure
- `src/main.js` - Vue 3 app entry point with router, store, and global styles
- `src/App.vue` - Root component with basic styling
- `src/router/index.js` - Vue Router configuration with authentication guards
- `src/store/index.js` - Vuex store with localStorage persistence
- `src/i18n/` - Internationalization with Japanese, Chinese, and English support

## Architecture Overview

### Core Application Structure
This is a Vue 3 astrology/fortune telling application (命盤 - "Meiban") that calculates and displays:
- Birth chart analysis (生辰八字 - Bazi)
- Western astrology positions
- Transit analysis (行運盤)

### Key Components
- **BirthDataForm.vue** - User input form for birth data
- **StarChart/** - Astrology chart visualization components
- **LanguageSwitcher.vue** - Multi-language support component

### State Management
The Vuex store (`src/store/index.js`) manages:
- User birth data with localStorage persistence
- Calculation results (Bazi and astrology)
- Analysis history
- Application settings including language preferences
- Loading states and error handling

### Routing & Navigation
Router includes authentication guards that require complete user data for analysis pages:
- `/` - HomePage
- `/bazi-results/:id` - Bazi analysis results
- `/astrology-results/:id` - Western astrology results  
- `/transit-analysis` - Transit chart analysis

### Calculation Engine
The application includes sophisticated astronomical calculations:
- Julian day conversion for time calculations
- Solar position using VSOP87 simplified algorithm
- Lunar position calculations with high precision
- Ascendant calculation with custom algorithm optimized for Chinese regions
- Full Bazi (八字) calculation system

### Internationalization
Multi-language support through `src/i18n/`:
- Japanese (primary)
- Chinese (Traditional)
- English
- Language detection and localStorage persistence

### Build Configuration
- Vue CLI 5 with Babel and ESLint
- GitHub Pages deployment configured
- Performance optimizations with code splitting
- PWA settings for mobile app-like experience

### Important Notes
- The application contains extensive astronomical calculation algorithms in `doc/algo.md`
- User data persists in localStorage through Vuex store
- Error handling includes fallback to mock data to prevent crashes
- Debug mode available in development environment