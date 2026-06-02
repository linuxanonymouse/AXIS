$files = Get-ChildItem -Path "src/components/scene" -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Fix the broken tags
    # `< resolution={256} backside ... />`
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?s)<\s*(resolution|backside).*?/>", "<meshPhysicalMaterial transparent opacity={0.3} roughness={0.1} metalness={0.5} clearcoat={1} color=`"#ffffff`" />")
    
    # Fix stray `< ` that might have been `<MeshTransmissionMaterial \n`
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?s)<\s*/>", "<meshPhysicalMaterial transparent opacity={0.3} roughness={0.1} metalness={0.5} clearcoat={1} color=`"#ffffff`" />")

    Set-Content -Path $file.FullName -Value $content
}
Write-Output "Fix Complete"
