# Proyecto-Performance-KevinTopón

Repositorio que contiene la solución de la prueba técnica para el cargo de **QA Junior**, enfocada en pruebas de rendimiento, análisis de resultados y aseguramiento de la calidad del software.

## Contenido

### Ejercicio 1 - Prueba de Carga Login Fake Store API

* Automatización de pruebas de rendimiento utilizando **K6**.
* Parametrización de datos mediante archivo CSV.
* Validación de throughput (TPS), tiempos de respuesta y tasa de errores.
* Generación de evidencias, reportes y conclusiones de la ejecución.

## Tecnologías Utilizadas

* K6
* JavaScript
* CSV Data Driven Testing
* Git & GitHub
EJERCICIO 1 - PRUEBA DE CARGA LOGIN (K6)

# Instrucciones para reproducir la prueba

## DESCRIPCIÓN

Este ejercicio consiste en realizar una prueba de carga sobre el servicio de
autenticación (Login) de Fake Store API utilizando K6. La prueba consume el
endpoint POST /auth/login y utiliza credenciales parametrizadas desde un
archivo CSV para simular múltiples usuarios.

El objetivo es validar que el servicio pueda soportar una carga aproximada de
20 TPS (Transacciones por Segundo), manteniendo tiempos de respuesta menores
a 1.5 segundos y una tasa de error inferior al 3%.

## REQUISITOS PREVIOS

1. Sistema operativo Windows 10/11 (64 bits) o Linux/macOS equivalente.
2. Conexión a Internet activa (la API es pública).
3. Herramienta de pruebas de carga K6 instalada.

## VERSIONES DE TECNOLOGÍAS

* K6: v2.0.0-rc1 (Grafana K6)
* API objetivo: Fake Store API v2.1.11
* Endpoint probado: https://fakestoreapi.com/auth/login
* Protocolo: HTTPS / JSON REST
* Script: JavaScript ES6 (módulos k6/http y k6/data)
* Librería CSV: PapaParse 5.1.1 (jslib.k6.io)

## INSTALACIÓN DE K6 (WINDOWS)

Opción A - Instalador oficial

1. Descargar desde:
   https://grafana.com/docs/k6/latest/set-up/install-k6/

2. Ejecutar el instalador para Windows.

3. Verificar la instalación:

   "C:\Program Files\k6\k6.exe" version

Opción B - Chocolatey

choco install k6

Opción C - Winget

winget install GrafanaLabs.k6

## ESTRUCTURA DEL PROYECTO

ejercicio-1/

data/
users.csv               <- Credenciales parametrizadas

scripts/
login_load_test.js      <- Script principal de K6

reports/
summary.json            <- Reporte JSON generado durante la ejecución
k6_console_output.txt   <- Salida completa de consola

readme.txt                <- Instrucciones de ejecución
conclusiones.txt          <- Hallazgos y conclusiones de la prueba

## PASO 1: CLONAR O DESCARGAR EL REPOSITORIO

git clone <URL_DEL_REPOSITORIO>

cd ejercicio-1

## PASO 2: VERIFICAR EL ARCHIVO CSV

Abrir el archivo data/users.csv y confirmar que contiene:

user,passwd
donero,ewedon
kevinryan,kev02937@
johnd,m38rmF$
derek,jklg**56
mor_2314,83r5^*

## PASO 3: VALIDAR CONECTIVIDAD (OPCIONAL)

curl --location --max-time 60 "https://fakestoreapi.com/auth/login" ^
--header "Content-Type: application/json" ^
--data "{"username":"johnd","password":"m38rmF$"}"

Respuesta esperada:

HTTP 201
{"token":"..."}

## PASO 4: EJECUTAR LA PRUEBA DE CARGA

Ubicarse en la carpeta scripts y ejecutar:

Windows (PowerShell)

cd scripts
& "C:\Program Files\k6\k6.exe" run login_load_test.js

Linux/macOS

cd scripts
k6 run login_load_test.js

Variables opcionales:

TARGET_TPS=20
TEST_DURATION=2m
BASE_URL=https://fakestoreapi.com

Ejemplo:

k6 run -e TARGET_TPS=25 -e TEST_DURATION=3m login_load_test.js

## PASO 5: REVISAR LOS RESULTADOS

Al finalizar la ejecución, K6 mostrará un resumen en consola y generará los
siguientes archivos:

* reports/summary.json
* k6_console_output.txt

Criterios configurados en la prueba:

* Throughput aproximado de 20 TPS.
* Percentil 95 menor a 1500 ms.
* Tasa de error HTTP menor al 3%.
* Validaciones funcionales superiores al 97%.

## PASO 6: INTERPRETAR LOS RESULTADOS

Si todos los thresholds muestran PASS, la prueba cumple con los criterios
establecidos.

Si algún threshold muestra FAIL, revisar la métrica correspondiente en el
reporte y consultar el archivo conclusiones.txt para el análisis detallado.

## ESCENARIO IMPLEMENTADO

Executor: constant-arrival-rate

Carga objetivo:

* 20 TPS

Duración:

* 2 minutos

Usuarios virtuales:

* 30 VUs preasignados
* 80 VUs máximos

Parametrización:

* Rotación cíclica de 5 usuarios obtenidos desde el archivo CSV

Validaciones realizadas:

* HTTP 201 (Login exitoso)
* Tiempo de respuesta menor o igual a 1500 ms
* Presencia de token JWT en la respuesta

## NOTAS IMPORTANTES

* Fake Store API retorna HTTP 201 para logins exitosos.
* Al tratarse de una API pública, los resultados pueden variar ligeramente
  dependiendo de la latencia de red y disponibilidad del servicio.
* Las credenciales utilizadas corresponden a usuarios de prueba documentados
  por Fake Store API.



## Autor

**Kevin Topón**
Ingeniero en Tecnologías de la Información

*"La calidad no consiste en encontrar errores, sino en prevenirlos mediante pruebas, análisis y mejora continua. Cada prueba ejecutada es una oportunidad para construir software más confiable."*
