#!/bin/bash

# Resend Email Setup Script
# This script helps you set up the .env.local file for Resend integration

echo "╔════════════════════════════════════════════════════════════╗"
echo "║    Resend Email Service - Environment Setup                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled. Existing .env.local preserved."
        exit 1
    fi
fi

# Prompt for Resend API Key
echo ""
echo "📌 Step 1: Resend API Key"
echo "─────────────────────────────────────────────────────────────"
echo "Get your API key from: https://resend.com/api-keys"
echo ""
read -p "Enter your Resend API Key (starts with 're_'): " RESEND_API_KEY

if [[ ! $RESEND_API_KEY =~ ^re_ ]]; then
    echo "❌ Error: API key should start with 're_'"
    exit 1
fi

# Prompt for From Email
echo ""
echo "📌 Step 2: From Email Address"
echo "─────────────────────────────────────────────────────────────"
echo "This is the email address that will send form submissions."
echo "Default: onboarding@resend.dev (sandbox)"
echo "Production: Your verified domain email"
echo ""
read -p "Enter From Email [onboarding@resend.dev]: " RESEND_FROM_EMAIL
RESEND_FROM_EMAIL=${RESEND_FROM_EMAIL:-onboarding@resend.dev}

# Prompt for Owner Email
echo ""
echo "📌 Step 3: Clinic Owner Email"
echo "─────────────────────────────────────────────────────────────"
echo "Where form submissions will be sent to."
echo ""
read -p "Enter Owner Email [intakes@unveiledecho.com]: " OWNER_EMAIL
OWNER_EMAIL=${OWNER_EMAIL:-intakes@unveiledecho.com}

# Prompt for Frontend URL
echo ""
echo "📌 Step 4: Frontend URL"
echo "─────────────────────────────────────────────────────────────"
echo "URL where your React app runs (for CORS)"
echo ""
read -p "Enter Frontend URL [http://localhost:5173]: " FRONTEND_URL
FRONTEND_URL=${FRONTEND_URL:-http://localhost:5173}

# Prompt for API URL
echo ""
echo "📌 Step 5: Backend API URL"
echo "─────────────────────────────────────────────────────────────"
echo "URL where your Node.js backend API runs"
echo ""
read -p "Enter Backend API URL [http://localhost:3001]: " VITE_API_URL
VITE_API_URL=${VITE_API_URL:-http://localhost:3001}

# Create .env.local file
cat > .env.local << EOF
# ═══════════════════════════════════════════════════════════════
# Resend Email Service Configuration
# DO NOT COMMIT THIS FILE TO GIT
# ═══════════════════════════════════════════════════════════════

# Resend API Configuration
# Get from: https://resend.com/api-keys
RESEND_API_KEY=$RESEND_API_KEY

# From Email Address (must be verified in Resend)
RESEND_FROM_EMAIL=$RESEND_FROM_EMAIL

# Clinic Owner Email (where submissions go)
OWNER_EMAIL=$OWNER_EMAIL

# Frontend Configuration (for CORS)
FRONTEND_URL=$FRONTEND_URL

# Backend API URL (for frontend to communicate with backend)
VITE_API_URL=$VITE_API_URL

# ═══════════════════════════════════════════════════════════════
EOF

echo ""
echo "✅ Success! Created .env.local"
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    Configuration Summary                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📧 Resend API Key:        ✓ Configured"
echo "📨 From Email:            $RESEND_FROM_EMAIL"
echo "📬 Owner Email:           $OWNER_EMAIL"
echo "🌐 Frontend URL:          $FRONTEND_URL"
echo "⚙️  Backend API URL:       $VITE_API_URL"
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                      Next Steps                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "1️⃣  Start the backend server:"
echo "    node server.js"
echo ""
echo "2️⃣  In another terminal, start frontend:"
echo "    npm run dev"
echo ""
echo "3️⃣  Test the form at:"
echo "    http://localhost:5173"
echo ""
echo "4️⃣  Check for emails at:"
echo "    $OWNER_EMAIL"
echo ""
echo "📚 For more help, see:"
echo "   - RESEND_EMAIL_SETUP.md (detailed guide)"
echo "   - RESEND_QUICK_REFERENCE.md (quick reference)"
echo "   - RESEND_ARCHITECTURE.md (system design)"
echo ""
echo "✨ Happy emailing!"
echo ""
