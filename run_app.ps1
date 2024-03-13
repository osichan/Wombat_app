Write-Host "Running run_app.ps1..."
$interfaceInfo = & "./insert_ip.exe" -interfaces

$interfaceLines = $interfaceInfo -split "`n"

foreach ($line in $interfaceLines) {
    if ($line -match "name=(.*).*addresses=\[(.*)\]") {
        $interfaceName = $matches[1].Trim()
        $addresses = $matches[2].Trim() -split ', '

        foreach ($address in $addresses) {
            if ($address -like "*192.*") {
                Write-Host "Interface '$interfaceName' has address containing '192.'."
                Write-Host "Running insert_ip.exe..."
                & "./insert_ip.exe" -interface-name="$interfaceName"
                break
            }
        }
    }
}
Write-Host ""
Write-Host "Finished checking interfaces."
Write-Host "Running npm start..."
npm start