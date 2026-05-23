# NASA / Solar System Scope textures for photoreal space scene
$ErrorActionPreference = "Continue"
$root = Split-Path $PSScriptRoot -Parent
$space = Join-Path $root "public\textures\space"
$planets = Join-Path $root "public\textures\planets"
New-Item -ItemType Directory -Force -Path $space, $planets | Out-Null

$downloads = @(
  @{ Url = "https://www.solarsystemscope.com/textures/download/2k_stars_milky_way.jpg"; Out = "$space\milky_way_4k.jpg" },
  @{ Url = "https://www.solarsystemscope.com/textures/download/4k_earth_daymap.jpg"; Out = "$planets\earth_day_4k.jpg" },
  @{ Url = "https://www.solarsystemscope.com/textures/download/4k_earth_clouds.jpg"; Out = "$planets\earth_clouds_4k.jpg" },
  @{ Url = "https://www.solarsystemscope.com/textures/download/4k_earth_normal_map.tif"; Out = "$planets\earth_normal_4k.tif" },
  @{ Url = "https://www.solarsystemscope.com/textures/download/4k_earth_nightmap.jpg"; Out = "$planets\earth_night_4k.jpg" },
  @{ Url = "https://www.solarsystemscope.com/textures/download/2k_saturn_ring_alpha.png"; Out = "$planets\saturn_ring_alpha.png" },
  @{ Url = "https://www.solarsystemscope.com/textures/download/2k_mars.jpg"; Out = "$planets\mars_2k.jpg" },
  @{ Url = "https://www.solarsystemscope.com/textures/download/2k_sun.jpg"; Out = "$root\public\textures\sun.jpg" }
)

foreach ($d in $downloads) {
  Write-Host "Downloading $($d.Out)..."
  curl.exe -L -k -o $d.Out $d.Url --retry 3 --retry-delay 2
}

# Fallbacks if 4K missing
$fallbacks = @{
  "$planets\earth_day_4k.jpg" = "$planets\earth_atmos_2048.jpg"
  "$planets\earth_clouds_4k.jpg" = "$planets\earth_atmos_2048.jpg"
  "$planets\earth_night_4k.jpg" = "$planets\earth_atmos_2048.jpg"
  "$planets\earth_normal_4k.jpg" = "$planets\earth_atmos_2048.jpg"
  "$space\milky_way_4k.jpg" = "$planets\earth_atmos_2048.jpg"
  "$planets\mars_2k.jpg" = "$planets\mars_1k_color.jpg"
}

foreach ($key in $fallbacks.Keys) {
  if (-not (Test-Path $key) -or (Get-Item $key -ErrorAction SilentlyContinue).Length -lt 50000) {
    $src = $fallbacks[$key]
    if (Test-Path $src) {
      Copy-Item $src $key -Force
      Write-Host "Fallback: $key <- $src"
    }
  }
}

# Normal map: prefer jpg from 2k if tif only
if (-not (Test-Path "$planets\earth_normal_4k.jpg")) {
  curl.exe -L -k -o "$planets\earth_normal_4k.jpg" "https://www.solarsystemscope.com/textures/download/2k_earth_normal_map.tif"
  if (-not (Test-Path "$planets\earth_normal_4k.jpg") -or (Get-Item "$planets\earth_normal_4k.jpg").Length -lt 50000) {
    Copy-Item "$planets\earth_atmos_2048.jpg" "$planets\earth_normal_4k.jpg" -Force -ErrorAction SilentlyContinue
  }
}

Write-Host "Done."
