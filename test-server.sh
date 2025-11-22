#!/bin/bash
# Test script to verify Express server is running and email endpoint works

echo "🔍 Testing Express Email Server..."
echo ""

# Check if server is running on port 3001
if ! nc -z localhost 3001 2>/dev/null; then
    echo "❌ Server not running on port 3001"
    echo "Start with: node server.js"
    exit 1
fi

echo "✅ Server is running on port 3001"
echo ""

# Test health endpoint
echo "Testing /api/health endpoint..."
curl -s http://localhost:3001/api/health | jq . || echo "❌ Failed"
echo ""

# Test form submission
echo "Testing form submission to /api/send-email..."
curl -X POST http://localhost:3001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "message": "This is a test message"
  }' | jq . 2>/dev/null || echo "❌ Request failed"

echo ""
echo "Done!"
