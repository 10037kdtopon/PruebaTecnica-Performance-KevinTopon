@echo off
set K6="C:\Program Files\k6\k6.exe"
if not exist %K6% (
  echo K6 no encontrado en C:\Program Files\k6\k6.exe
  echo Instale K6 desde https://grafana.com/docs/k6/latest/set-up/install-k6/
  exit /b 1
)
cd /d "%~dp0scripts"
echo Ejecutando prueba de carga Login - 20 TPS / 2 minutos...
%K6% run login_load_test.js
echo.
echo Reportes generados en ..\reports\
pause
