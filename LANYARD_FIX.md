# Lanyard Component Fix

## Current Issue
The lanyard component is currently displaying a fallback version because the required Three.js dependencies cannot be installed due to npm SSL issues.

## Required Dependencies
The full interactive 3D lanyard component requires these packages:
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for React Three Fiber
- `@react-three/rapier` - Physics engine for React Three Fiber
- `three` - 3D library
- `meshline` - Mesh line geometry for the lanyard

## Installation Options

### Option 1: Use Yarn (Recommended)
If npm continues to have SSL issues, try using yarn:

```bash
# Install yarn if you don't have it
npm install -g yarn

# Install the dependencies
yarn add @react-three/fiber @react-three/drei @react-three/rapier three meshline
```

### Option 2: Fix npm SSL Issues
Try these commands to resolve npm SSL issues:

```bash
# Clear npm cache
npm cache clean --force

# Set npm to use HTTP instead of HTTPS (temporary fix)
npm config set registry http://registry.npmjs.org/

# Install dependencies
npm install @react-three/fiber @react-three/drei @react-three/rapier three meshline

# Reset registry back to HTTPS
npm config set registry https://registry.npmjs.org/
```

### Option 3: Use Legacy Peer Deps
If there are peer dependency conflicts:

```bash
npm install --legacy-peer-deps @react-three/fiber @react-three/drei @react-three/rapier three meshline
```

## Restoring the Original Component

Once the dependencies are installed:

1. Replace the content of `component/Lanyard/Lanyard.jsx` with the content from `component/Lanyard/Lanyard.original.jsx`
2. Delete the `Lanyard.original.jsx` file
3. Restart your development server

## Alternative: Manual Package Installation

If all else fails, you can manually download and install the packages:

1. Create a `node_modules` folder if it doesn't exist
2. Download the packages from their respective GitHub repositories
3. Place them in the `node_modules` folder
4. Update your `package.json` to include the local paths

## Current Status
- ✅ Fallback component is working
- ✅ Lanyard image is displayed
- ✅ Clear instructions are provided
- ❌ Full 3D functionality requires dependency installation

## Testing
The fallback component should now display properly without errors. You can test it by:
1. Running `npm run dev`
2. Navigating to the page with the lanyard component
3. Clicking "Show Installation Instructions" to see the required steps

The original Three.js version is preserved in `Lanyard.original.jsx` and can be restored once the dependencies are properly installed.

