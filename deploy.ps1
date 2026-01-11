# Quick Deploy to Cloudflare Pages

Write-Host "🚀 RideShareX Deployment Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build Frontend
Write-Host "📦 Building frontend..." -ForegroundColor Yellow
Set-Location frontend
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend built successfully!" -ForegroundColor Green
Set-Location ..

# Step 2: Deploy to Cloudflare Pages
Write-Host ""
Write-Host "🌐 Deploying to Cloudflare Pages..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Choose deployment method:" -ForegroundColor Cyan
Write-Host "1. Wrangler CLI (automatic)" -ForegroundColor White
Write-Host "2. Manual upload (opens browser)" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter choice (1 or 2)"

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "Deploying with Wrangler..." -ForegroundColor Yellow
    wrangler pages deploy frontend/build --project-name=ridesharex
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Frontend deployed successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Deployment failed. Try manual upload or check wrangler login." -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "📂 Manual Upload Instructions:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://dash.cloudflare.com/" -ForegroundColor White
    Write-Host "2. Click 'Pages' → 'Upload assets'" -ForegroundColor White
    Write-Host "3. Upload folder: frontend/build" -ForegroundColor White
    Write-Host "4. Give project name: ridesharex" -ForegroundColor White
    Write-Host ""
    $open = Read-Host "Open Cloudflare Dashboard? (y/n)"
    if ($open -eq "y") {
        Start-Process "https://dash.cloudflare.com/"
    }
}

Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Deploy backend to Render.com or Railway.app" -ForegroundColor White
Write-Host "2. Update frontend env var: REACT_APP_API_URL=your_backend_url" -ForegroundColor White
Write-Host "3. Update backend CORS to allow your Cloudflare Pages URL" -ForegroundColor White
Write-Host ""
Write-Host "📖 Read DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Yellow
Write-Host ""
