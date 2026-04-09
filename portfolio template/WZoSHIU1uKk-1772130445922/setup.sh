#!/bin/bash

echo "========================================"
echo "  Gaurav Guddeti Portfolio Setup"
echo "========================================"
echo ""

echo "Step 1: Installing dependencies..."
npm install
echo ""

echo "Step 2: Image Setup Instructions"
echo "========================================"
echo ""
echo "You need to prepare 2 images in public/images/:"
echo ""
echo "  1. hero-off.png  - Your base photo"
echo "  2. hero-on.png   - Photo with Iron Man helmet overlay"
echo ""
echo "QUICK OPTION (For testing):"
echo "  Just use your photo for both:"
echo ""

read -p "Use placeholder for now? (y/n): " USE_PLACEHOLDER

if [ "$USE_PLACEHOLDER" = "y" ] || [ "$USE_PLACEHOLDER" = "Y" ]; then
    echo ""
    echo "Please manually copy your photo:"
    echo "  - Save as: public/images/hero-off.png"
    echo "  - Copy to: public/images/hero-on.png"
    echo ""
    echo "Then create the Iron Man overlay later using:"
    echo "  - AI tools like ChatGPT/DALL-E"
    echo "  - Photoshop/GIMP"
    echo ""
    echo "See QUICKSTART.md for detailed instructions."
    read -p "Press Enter to continue..."
fi

echo ""
echo "Step 3: Starting development server..."
echo ""
echo "Your portfolio will open at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
read -p "Press Enter to start..."
npm run dev
