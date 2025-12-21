#!/bin/bash

# Pawn's Gambit Deployment Script
# This script helps deploy both frontend and backend

echo "🚀 Pawn's Gambit Deployment Script"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

echo -e "${BLUE}Choose deployment option:${NC}"
echo "1) Deploy Frontend only (to Vercel)"
echo "2) Deploy Backend only (to Vercel)"
echo "3) Deploy Both (Frontend to Vercel, Backend to Railway - Recommended)"
echo "4) Exit"
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo -e "${GREEN}Deploying Frontend...${NC}"
        cd pawns-gambit
        vercel --prod
        ;;
    2)
        echo -e "${GREEN}Deploying Backend...${NC}"
        cd pawns-gambit-cms
        vercel --prod
        ;;
    3)
        echo -e "${GREEN}Deploying Frontend to Vercel...${NC}"
        cd pawns-gambit
        vercel --prod
        echo ""
        echo -e "${YELLOW}⚠️  Backend deployment to Vercel is not recommended.${NC}"
        echo -e "${YELLOW}Please deploy backend to Railway instead:${NC}"
        echo "1. Go to https://railway.app"
        echo "2. Create new project from GitHub"
        echo "3. Select 'pawns-gambit-cms' repository"
        echo "4. Add PostgreSQL database"
        echo "5. Add environment variables"
        ;;
    4)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Don't forget to:"
echo "1. Set environment variables in Vercel/Railway dashboard"
echo "2. Update CORS_ORIGIN in backend with frontend URL"
echo "3. Update VITE_STRAPI_URL in frontend with backend URL"

