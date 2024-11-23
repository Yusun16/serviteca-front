# Serviteca - Sistema de Gestión para Taller Automotriz

Este proyecto consta de dos repositorios principales:

1. **Frontend**: [serviteca-front](https://github.com/Yusun16/serviteca-front)
2. **Backend**: [cw-front-backend](https://github.com/Yusun16/cw-front-backend)

El objetivo es ofrecer una solución completa para la gestión de un taller automotriz, permitiendo registrar órdenes de servicio, gestionar vehículos, operarios, autopartes y servicios asignados.

---

## 📦 Repositorios

### Frontend - `serviteca-front`

- **Tecnología**: React, Bootstrap, Axios.
- **Características principales**:
  - Listado y creación de órdenes de servicio.
  - Selectores dinámicos para clientes, vehículos y servicios.
  - Funcionalidades de búsqueda avanzada.
  - Gestión de estados visuales como revisiones, imágenes, y más.

### Backend - `cw-front-backend`

- **Tecnología**: Spring Boot, MySQL.
- **Características principales**:
  - API REST para gestionar vehículos, clientes, órdenes, servicios y revisiones.
  - Validaciones de datos y respuestas estándar.
  - Gestión de imágenes y otros recursos adjuntos.
  - Integración con bases de datos para registros persistentes.

---

## 🚀 Características principales del sistema

- **Gestión integral de órdenes de servicio**:
  - Creación, edición y finalización de órdenes.
  - Asociación de clientes, vehículos y servicios a cada orden.
- **Revisión del vehículo**:
  - Registro de estado inicial y final.
  - Captura de imágenes para validación.
- **Gestión de autopartes**:
  - Selección de autopartes asociadas a cada orden.
  - Cantidades y referencias dinámicas.
- **Dashboard administrativo**:
  - Panel centralizado para visualizar y gestionar registros.

---

## 📂 Estructura del proyecto

### Frontend (`serviteca-front`)

```plaintext
src/                 # Código fuente principal
├── components/      # Componentes reutilizables
├── pages/           # Páginas principales del sistema
├── services/        # Conexión con el backend mediante Axios
├── styles/          # Estilos (CSS/SCSS)
├── utils/           # Funciones y helpers auxiliares
public/              # Recursos públicos (favicon, imágenes estáticas, etc.)
package.json         # Dependencias y scripts del proyecto
README.md            # Documentación del frontend
```

## Instalacion
1.Clona el repositorio: 
```
git clone https://github.com/Yusun16/serviteca-front.git
cd serviteca-front
```
2.Instala las dependencias:
```
npm install
```
3.Configura el archivo .env para conectar al backend:
```
REACT_APP_API_URL=http://localhost:8080
```
4.Inicia el servidor de desarrollo:
```
npm start
```
El frontend estará disponible en http://localhost:3000.

## 📄 Scripts disponibles
npm start: Inicia el servidor de desarrollo.
npm build: Genera la versión de producción.

## ![image](https://github.com/user-attachments/assets/326e4a72-6d95-4d53-ace4-60650d16a26c) Contacto
GitHub: Yusun16
Email: yusunguairabryan@gmail.com
