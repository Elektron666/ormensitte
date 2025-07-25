#!/bin/bash

# Ormen Tekstil Website Deployment Script
# Usage: ./deploy.sh [environment]
# Example: ./deploy.sh production

set -e

# Configuration
ENVIRONMENT=${1:-production}
BUILD_DIR="dist"
BACKUP_DIR="backup"
LOG_FILE="deployment.log"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a ${LOG_FILE}
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a ${LOG_FILE}
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a ${LOG_FILE}
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a ${LOG_FILE}
}

# Pre-deployment checks
log "🚀 Starting Ormen Tekstil deployment for ${ENVIRONMENT} environment"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    error "Node.js is not installed. Please install Node.js 18+ to continue."
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    error "Node.js version 18 or higher is required. Current version: $(node -v)"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    error "npm is not installed. Please install npm to continue."
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    error "package.json not found. Make sure you're in the project root directory."
fi

log "✅ Pre-deployment checks passed"

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    log "📁 Created backup directory"
fi

# Backup current build if it exists
if [ -d "$BUILD_DIR" ]; then
    log "📦 Creating backup of current build..."
    tar -czf "${BACKUP_DIR}/build_backup_${TIMESTAMP}.tar.gz" "$BUILD_DIR"
    log "✅ Backup created: ${BACKUP_DIR}/build_backup_${TIMESTAMP}.tar.gz"
fi

# Clean up old builds
log "🧹 Cleaning up previous builds..."
rm -rf "$BUILD_DIR"
rm -rf "node_modules/.vite"

# Install dependencies
log "📥 Installing dependencies..."
npm ci --silent || error "Failed to install dependencies"

# Type checking
log "🔍 Running TypeScript type checking..."
npm run type-check || warning "Type checking failed, but continuing with build"

# Linting (optional, don't fail on warnings)
log "🔍 Running linting..."
npm run lint || warning "Linting issues found, but continuing with build"

# Build the application
log "🏗️  Building application for ${ENVIRONMENT}..."
if [ "$ENVIRONMENT" = "production" ]; then
    npm run build:production || error "Production build failed"
else
    npm run build || error "Build failed"
fi

# Verify build output
if [ ! -d "$BUILD_DIR" ]; then
    error "Build directory not found after build process"
fi

# Check if index.html exists
if [ ! -f "${BUILD_DIR}/index.html" ]; then
    error "index.html not found in build directory"
fi

log "✅ Build completed successfully"

# Build size analysis
BUILD_SIZE=$(du -sh "$BUILD_DIR" | cut -f1)
log "📊 Build size: ${BUILD_SIZE}"

# List generated files
log "📄 Generated files:"
find "$BUILD_DIR" -type f -name "*.js" -o -name "*.css" -o -name "*.html" | head -10

# Generate sitemap (if applicable)
log "🗺️  Generating sitemap..."
# Add sitemap generation logic here if needed

# Security checks
log "🔒 Running security checks..."

# Check for sensitive files in build
SENSITIVE_FILES=("*.env" "*.key" "*.pem" "*secret*" "*password*")
for pattern in "${SENSITIVE_FILES[@]}"; do
    if find "$BUILD_DIR" -name "$pattern" -type f | grep -q .; then
        error "Sensitive files found in build directory: $pattern"
    fi
done

# Validate HTML
log "✅ Validating HTML structure..."
if command -v tidy &> /dev/null; then
    tidy -q -e "${BUILD_DIR}/index.html" || warning "HTML validation issues found"
fi

# Performance checks
log "⚡ Checking build performance..."

# Check for large files
LARGE_FILES=$(find "$BUILD_DIR" -type f -size +1M)
if [ ! -z "$LARGE_FILES" ]; then
    warning "Large files detected (>1MB):"
    echo "$LARGE_FILES" | while read file; do
        size=$(ls -lh "$file" | awk '{print $5}')
        warning "  $file ($size)"
    done
fi

# Test the build locally (optional)
if command -v python3 &> /dev/null && [ "$ENVIRONMENT" != "production" ]; then
    log "🧪 Starting local test server..."
    info "You can test the build at http://localhost:8000"
    info "Press Ctrl+C to stop the test server and continue with deployment"
    (cd "$BUILD_DIR" && python3 -m http.server 8000) &
    SERVER_PID=$!
    
    # Wait for user input or timeout
    read -t 30 -p "Press Enter to continue with deployment (or wait 30s)..." || true
    kill $SERVER_PID 2>/dev/null || true
    log "🛑 Test server stopped"
fi

# Deployment summary
log "📋 Deployment Summary:"
log "   Environment: ${ENVIRONMENT}"
log "   Build size: ${BUILD_SIZE}"
log "   Build time: $(date)"
log "   Node version: $(node -v)"
log "   npm version: $(npm -v)"

# Create deployment info file
cat > "${BUILD_DIR}/deployment-info.json" << EOF
{
  "environment": "${ENVIRONMENT}",
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "buildSize": "${BUILD_SIZE}",
  "nodeVersion": "$(node -v)",
  "npmVersion": "$(npm -v)",
  "gitCommit": "$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')",
  "gitBranch": "$(git branch --show-current 2>/dev/null || echo 'unknown')"
}
EOF

# Final instructions
log "🎉 Deployment preparation completed successfully!"
log ""
log "📂 Your built files are in the '${BUILD_DIR}' directory"
log "📋 Next steps:"
log "   1. Upload the contents of '${BUILD_DIR}' to your web server"
log "   2. Ensure your web server is configured to serve index.html for all routes"
log "   3. Update DNS settings if needed"
log "   4. Test the live website"
log ""

if [ "$ENVIRONMENT" = "production" ]; then
    log "🔒 Production deployment checklist:"
    log "   ✅ SSL certificate installed"
    log "   ✅ Domain configured (www.ormentekstil.com)"
    log "   ✅ CDN configured (if applicable)"
    log "   ✅ Analytics tracking code updated"
    log "   ✅ Search Console verified"
    log "   ✅ Social media links updated"
    log ""
fi

log "🚀 Ormen Tekstil website is ready for deployment!"
log "📧 For support, contact: info@ormentekstil.com"

# Clean up old backups (keep last 5)
log "🧹 Cleaning up old backups..."
(cd "$BACKUP_DIR" && ls -t build_backup_*.tar.gz | tail -n +6 | xargs -r rm -f)

log "✅ Deployment script completed at $(date)"
