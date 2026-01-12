# Script para cerrar procesos de Cursor
# Ejecutar desde PowerShell de Windows (no WSL)

Write-Host "Buscando procesos de Cursor..." -ForegroundColor Yellow

# Buscar y cerrar todos los procesos de Cursor
$processes = Get-Process | Where-Object {$_.ProcessName -like "*cursor*" -or $_.Path -like "*cursor*"}

if ($processes) {
    Write-Host "Encontrados $($processes.Count) proceso(s) de Cursor" -ForegroundColor Red
    foreach ($proc in $processes) {
        Write-Host "Cerrando: $($proc.ProcessName) (PID: $($proc.Id))" -ForegroundColor Yellow
        Stop-Process -Id $proc.Id -Force
    }
    Write-Host "Procesos cerrados. Espera 2 segundos..." -ForegroundColor Green
    Start-Sleep -Seconds 2
} else {
    Write-Host "No se encontraron procesos de Cursor ejecutándose" -ForegroundColor Green
}

Write-Host "`nAhora puedes abrir Cursor nuevamente" -ForegroundColor Cyan













