# Axis backend setup — PostgreSQL password: passme
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host "AXIS backend setup" -ForegroundColor Cyan

if (Get-Command docker -ErrorAction SilentlyContinue) {
  Write-Host "Starting PostgreSQL (Docker)..." -ForegroundColor Yellow
  docker compose up -d postgres
  Start-Sleep -Seconds 5
} else {
  Write-Host "Docker not found — ensure PostgreSQL is running on localhost:5432" -ForegroundColor Yellow
  Write-Host "  User: postgres  Password: passme  Database: axis" -ForegroundColor Yellow
}

if (-not (Test-Path ".env.local")) {
  Copy-Item ".env.example" ".env.local"
  Write-Host "Created .env.local from .env.example" -ForegroundColor Green
}

Write-Host "Running Prisma migrate + generate..." -ForegroundColor Yellow
npm run prisma:migrate -- --name init 2>$null
if ($LASTEXITCODE -ne 0) {
  npm run prisma:push
}
npm run prisma:generate

Write-Host "Seeding sample Insights..." -ForegroundColor Yellow
npm run db:seed

Write-Host "Testing database..." -ForegroundColor Yellow
npm run db:test

Write-Host ""
Write-Host "Backend ready. Start the app: npm run dev" -ForegroundColor Green
Write-Host "Health check: http://localhost:3002/api/health" -ForegroundColor Green
