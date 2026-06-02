# 1. Fix admin applications page (revert role to currentRole, revenue to revenueRange)
$appPage = "src/app/(admin)/admin/applications/page.tsx"
$appContent = Get-Content $appPage -Raw
$appContent = $appContent -replace "sub.role \|\|", "sub.currentRole ||"
$appContent = $appContent -replace "sub.revenue \|\|", "sub.revenueRange ||"
Set-Content -Path $appPage -Value $appContent

# 2. Fix admin settings page (remove IconArrow missing import)
$settingsPage = "src/app/(admin)/admin/settings/page.tsx"
$settingsContent = Get-Content $settingsPage -Raw
$settingsContent = $settingsContent -replace "import \{ IconArrow, IconLock \} from `"@/components/icons`";", ""
$settingsContent = $settingsContent -replace "<IconArrow size=\{12\} style=\{\{ transform: `"rotate\(180deg\)`" \}\} />", "<- "
Set-Content -Path $settingsPage -Value $settingsContent

# 3. Fix API apply route rawResponses type issue
$apiRoute = "src/app/api/apply/route.ts"
$apiContent = Get-Content $apiRoute -Raw
$apiContent = $apiContent -replace "\.\.\.data,", "...data, rawResponses: data.rawResponses as any,"
Set-Content -Path $apiRoute -Value $apiContent

Write-Output "Fixes Applied"
