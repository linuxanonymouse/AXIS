$files = Get-ChildItem -Path "src/components/scene" -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # 1. Lower Canvas DPR
    $content = $content -replace "dpr=\{\[1, 1\.5\]\}", "dpr={1}"
    $content = $content -replace "dpr=\{\[1, 2\]\}", "dpr={1}"

    # 2. Remove EffectComposer from imports
    $content = $content -replace "import \{ EffectComposer, Bloom \} from `"@react-three/postprocessing`";", ""
    $content = $content -replace "import \{ Bloom, EffectComposer \} from `"@react-three/postprocessing`";", ""

    # 3. Remove EffectComposer from JSX
    $content = $content -replace "(?s)<EffectComposer>.*?</EffectComposer>", ""

    # 4. Remove MeshTransmissionMaterial from imports (simplistic)
    $content = $content -replace "MeshTransmissionMaterial,\s*", ""
    $content = $content -replace ",\s*MeshTransmissionMaterial", ""
    $content = $content -replace "MeshTransmissionMaterial", "" # if alone

    # 5. Replace MeshTransmissionMaterial usage with meshPhysicalMaterial
    $content = $content -replace "<MeshTransmissionMaterial.*?>", "<meshPhysicalMaterial transparent opacity={0.3} roughness={0.1} metalness={0.5} clearcoat={1} clearcoatRoughness={0.1} color=`"#ffffff`" />"
    $content = $content -replace "</MeshTransmissionMaterial>", ""
    
    # In case there's a multi-line MeshTransmissionMaterial tag
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?s)<MeshTransmissionMaterial[^>]*?>", "<meshPhysicalMaterial transparent opacity={0.3} roughness={0.1} metalness={0.5} clearcoat={1} clearcoatRoughness={0.1} color=`"#ffffff`" />")

    # 6. Reduce stars count
    $content = $content -replace "count=\{2000\}", "count={1000}"
    $content = $content -replace "count=\{3000\}", "count={1000}"

    Set-Content -Path $file.FullName -Value $content
}
Write-Output "Optimization Complete"
