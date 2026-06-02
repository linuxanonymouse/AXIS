$files = @(
  "src/components/scene/AxisRingsScene.tsx",
  "src/components/scene/CinematicScene.tsx",
  "src/components/scene/DivisionsScene.tsx",
  "src/components/scene/IntelligenceScene.tsx",
  "src/components/scene/MediaScene.tsx",
  "src/components/scene/StudioScene.tsx",
  "src/components/scene/VenturesScene.tsx"
)

foreach ($file in $files) {
  $content = Get-Content $file -Raw
  if (-not $content.Contains("MeshTransmissionMaterial")) {
    $content = "import { MeshTransmissionMaterial } from '@react-three/drei';`n" + $content
    Set-Content -Path $file -Value $content
  } elseif (-not $content.Contains("import { MeshTransmissionMaterial") -and -not $content.Contains("import {MeshTransmissionMaterial") -and -not $content.Contains(", MeshTransmissionMaterial") -and -not $content.Contains("MeshTransmissionMaterial,")) {
    # It contains the tag but not the import
    $content = $content -replace "import \{([^}]*)\} from `['`"]@react-three/drei`['`"];?", "import { `$1, MeshTransmissionMaterial } from `"@react-three/drei`";"
    Set-Content -Path $file -Value $content
  }
}
Write-Output "Imports fixed"
