Serviteca - Sistema de Gestión para Taller Automotriz
Este proyecto consta de dos repositorios principales:

Frontend: serviteca-front
Backend: cw-front-backend
El objetivo es ofrecer una solución completa para la gestión de un taller automotriz, permitiendo registrar órdenes de servicio, gestionar vehículos, operarios, autopartes y servicios asignados.

📦 Repositorios
Frontend - serviteca-front
Tecnología: React, Bootstrap, Axios.
Características principales:
Listado y creación de órdenes de servicio.
Selectores dinámicos para clientes, vehículos y servicios.
Funcionalidades de búsqueda avanzada.
Gestión de estados visuales como revisiones, imágenes, y más.
Backend - cw-front-backend
Tecnología: Spring Boot, MySQL.
Características principales:
API REST para gestionar vehículos, clientes, órdenes, servicios y revisiones.
Validaciones de datos y respuestas estándar.
Gestión de imágenes y otros recursos adjuntos.
Integración con bases de datos para registros persistentes.
🚀 Características principales del sistema
Gestión integral de órdenes de servicio:
Creación, edición y finalización de órdenes.
Asociación de clientes, vehículos y servicios a cada orden.
Revisión del vehículo:
Registro de estado inicial y final.
Captura de imágenes para validación.
Gestión de autopartes:
Selección de autopartes asociadas a cada orden.
Cantidades y referencias dinámicas.
Dashboard administrativo:
Panel centralizado para visualizar y gestionar registros.
📂 Estructura del proyecto
Frontend (serviteca-front)
plaintext
Copiar código
src/                 # Código fuente principal
├── components/      # Componentes reutilizables
├── pages/           # Páginas principales del sistema
├── services/        # Conexión con el backend mediante Axios
├── styles/          # Estilos (CSS/SCSS)
├── utils/           # Funciones y helpers auxiliares
public/              # Recursos públicos (favicon, imágenes estáticas, etc.)
package.json         # Dependencias y scripts del proyecto
README.md            # Documentación del frontend
Backend (cw-front-backend)
plaintext
Copiar código
src/
├── main/
│   ├── java/        # Código fuente del backend
│   │   ├── controllers/ # Controladores REST
│   │   ├── services/    # Servicios de lógica empresarial
│   │   ├── models/      # Entidades de la base de datos
│   │   ├── repositories/# Interfaces para acceso a datos
│   │   └── dto/         # Objetos de transferencia de datos (DTO)
│   ├── resources/       # Configuraciones (application.properties)
├── test/               # Pruebas unitarias e integración
pom.xml                 # Configuración de Maven
README.md               # Documentación del backend
🛠️ Instalación y configuración
Backend
Clona el repositorio:

bash
Copiar código
git clone https://github.com/Yusun16/cw-front-backend.git
cd cw-front-backend
Configura la base de datos MySQL en el archivo application.properties:

properties
Copiar código
spring.datasource.url=jdbc:mysql://localhost:3306/serviteca
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
Construye y ejecuta el proyecto:

bash
Copiar código
mvn clean install
mvn spring-boot:run
El backend estará disponible en http://localhost:8080.

Frontend
Clona el repositorio:

bash
Copiar código
git clone https://github.com/Yusun16/serviteca-front.git
cd serviteca-front
Instala las dependencias:

bash
Copiar código
npm install
Configura el archivo .env para conectar al backend:

env
Copiar código
REACT_APP_API_URL=http://localhost:8080
Inicia el servidor de desarrollo:

bash
Copiar código
npm start
El frontend estará disponible en http://localhost:3000.

📄 Scripts disponibles
Backend
mvn spring-boot:run: Inicia el servidor backend.
mvn test: Ejecuta pruebas unitarias.
Frontend
npm start: Inicia el servidor de desarrollo.
npm build: Genera la versión de producción.
🖼️ Capturas de pantalla
(Añade capturas de pantalla aquí para ilustrar la funcionalidad del sistema).

🤝 Contribuciones
Realiza un fork del repositorio.
Crea una nueva rama:
bash
Copiar código
git checkout -b feature/nueva-funcionalidad
Realiza los cambios y crea un commit:
bash
Copiar código
git commit -m "Nueva funcionalidad añadida"
Envía tus cambios:
bash
Copiar código
git push origin feature/nueva-funcionalidad
Abre un Pull Request en el repositorio correspondiente.
📄 Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más información.

Contacto
GitHub: Yusun16
Email: (Incluye tu correo si lo deseas)
¡Gracias por usar Serviteca! 🚗🔧
