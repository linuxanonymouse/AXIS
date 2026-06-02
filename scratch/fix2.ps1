$files = Get-ChildItem -Path "src/components/scene" -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Fix `<backside ... />`
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?s)<\s*backside[^>]*/>", "<meshPhysicalMaterial transparent opacity={0.3} roughness={0.1} metalness={0.5} clearcoat={1} color=`"#ffffff`" />")
    
    # Fix `<resolution ... />`
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?s)<\s*resolution[^>]*/>", "<meshPhysicalMaterial transparent opacity={0.3} roughness={0.1} metalness={0.5} clearcoat={1} color=`"#ffffff`" />")

    Set-Content -Path $file.FullName -Value $content
}
Write-Output "Fix Complete"
