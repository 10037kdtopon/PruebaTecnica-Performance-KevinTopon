# 🚀 **Proyecto Performance y Monitoreo de Servicios - Kevin Topon**

## 📋 **Descripción**

Este repositorio contiene la implementación de una prueba de **rendimiento y monitoreo de servicios API**, desarrollada aplicando buenas prácticas de **análisis de métricas**, **evaluación de disponibilidad** y **detección preventiva de posibles fallos en servicios tecnológicos**.

El objetivo fue evaluar el comportamiento de un servicio REST bajo escenarios de carga controlada, simulando múltiples usuarios y analizando indicadores clave como **TPS (Transacciones por Segundo)**, tiempos de respuesta, tasa de errores y estabilidad del servicio.

La solución permite identificar el comportamiento de la API ante diferentes niveles de demanda, facilitando el análisis de rendimiento y la toma de decisiones para mejorar la disponibilidad y eficiencia operativa de los servicios tecnológicos.

El proyecto incluye documentación técnica, scripts de ejecución, configuración de escenarios de prueba, archivos de resultados y conclusiones obtenidas durante el análisis.

## 📂 **Contenido**

### ✅ **Ejercicio 1 - Prueba de Rendimiento API Login (K6)**

**Ubicación:** `ejercicio-1/`

Implementación de una prueba de carga sobre un servicio de autenticación REST utilizando **K6**, simulando múltiples usuarios para evaluar la capacidad de respuesta, estabilidad y comportamiento del servicio.

#### **Validaciones realizadas**

* Simulación de múltiples usuarios concurrentes mediante escenarios de carga.
* Análisis de TPS (Transacciones por Segundo) generadas durante la ejecución.
* Medición de tiempos de respuesta del servicio.
* Monitoreo de tasa de errores HTTP.
* Validación de disponibilidad del endpoint.
* Análisis del comportamiento del servicio ante solicitudes simultáneas.
* Generación de reportes técnicos con métricas obtenidas durante la ejecución.

## 📊 **Escenario Implementado**

**Tipo de prueba:** Prueba de carga y análisis de rendimiento.

**Servicio evaluado:** API REST de autenticación.

**Protocolo:** HTTPS / JSON REST.

**Carga aplicada:**

* 20 TPS aproximados.
* Duración de ejecución: 2 minutos.
* 30 usuarios virtuales iniciales.
* 80 usuarios virtuales máximos.

**Métricas analizadas:**

* Tiempo de respuesta.
* Percentil 95 (p95).
* Solicitudes procesadas.
* Tasa de errores.
* Disponibilidad del servicio.

## 📁 **Estructura del Proyecto**

ejercicio-1/

├── data/
│   └── users.csv

├── scripts/
│   └── login_load_test.js

├── informes/
│   └── resumen.json

├── readme.txt

└── conclusiones.txt

## 🛠️ **Tecnologías Utilizadas**

* **K6**
* **JavaScript ES6**
* **REST API**
* **JSON**
* **CSV Data Driven Testing**
* **Git**
* **GitHub**

## 👨‍💻 **Autor**

**Kevin Topon**

**Ingeniero en Tecnologías de la Información**, con interés en **infraestructura tecnológica, monitoreo de servicios, análisis de rendimiento y mejora continua de procesos operativos**. En constante aprendizaje de herramientas orientadas a garantizar la disponibilidad, estabilidad y eficiencia de servicios tecnológicos.

## 💡 **Frase Personal**

> **"Un servicio confiable nace del monitoreo constante, el análisis de rendimiento y la mejora continua de la tecnología."** 🚀
