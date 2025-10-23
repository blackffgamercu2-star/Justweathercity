#!/bin/bash

# RainWatch.in - Startup Script
# Run this to get started with development

echo "🌧️  RainWatch.in - Startup Script"
echo "=================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+"
    exit 1
fi

echo "✓ Node.js $(node --version) found"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✓ npm $(npm --version) found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Setup environment
if [ ! -f .env.local ]; then
    echo "🔧 Setting up environment variables..."
    cp .env.example .env.local
    echo "✓ Created .env.local (edit with your API keys)"
else
    echo "✓ .env.local already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your API keys"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "Documentation:"
echo "- README.md - Full documentation"
echo "- QUICK_START.md - Quick start guide"
echo "- ADMIN.md - Admin operations"
echo ""
