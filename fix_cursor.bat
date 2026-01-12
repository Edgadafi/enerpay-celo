@echo off
echo Cerrando procesos de Cursor...
taskkill /F /IM Cursor.exe 2>nul
taskkill /F /IM "Cursor.exe" 2>nul
timeout /t 2 /nobreak >nul
echo Procesos cerrados. Ahora puedes abrir Cursor nuevamente.
pause













