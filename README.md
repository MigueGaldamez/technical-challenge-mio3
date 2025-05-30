# 📝 Prueba Tecnica Miguel G.
📌 Proyecto Todo List – API y Frontend
📝 Descripción del Proyecto
Este proyecto es una aplicación Todo List compuesta por dos partes: una API desarrollada en Node.js 
con autenticación JWT y un frontend construido en Next.js. Permite a los usuarios iniciar sesión, 
gestionar tareas y cerrar sesión de forma segura usando cookies.

📋 Requerimientos
### Backend
```plaintext
Node.js
Express
MongoDB 
JWT
bcryptjs
cookie-parser

### Frontend
Next.js
Bootstrap 
Next Router
HTTP Interceptors

🚀 Instalación y Ejecución
Requisitos previos
    Node.js (v18 o superior)
    MongoDB
    Next.js instalado globalmente

    Backend
        bash
        Copiar código
        cd backend
        npm install
        npm run dev
        El servidor se levantará por defecto en http://localhost:5000 (segun configuracion)

    Frontend (Next.js)
        bash
        Copiar código
        cd frontend
        npm install
        npm run dev
        Next.js se ejecutará en http://localhost:3000 (puerto configurable)

## 📁 Estructura de Carpetas y Arquitectura

### backend
backend/
├── controllers/        # Lógica de negocio 
├── middleware/         # Middlewares personalizados
├── models/             # Esquemas de Mongoose
├── routes/             # Rutas agrupadas
├── server.js           # Punto de entrada del backend
├── migration.js        # Archivo de migración de datos iniciales
└── socket.js           # Conexión al websocket para notificaciones

frontend/
└── src/
    └── app/
        ├── assets/          # Archivos estáticos útiles dentro del sistema
        ├── components/      # Componentes reutilizables
        ├── middleware/      # Protección de rutas
        ├── services/        # Servicios para el consumo de endpoints
        ├── types/           # Modelos utilizados dentro del aplicativo
        ├── utils/           # Funciones útiles
        └── app/             # Ruteo del aplicativo
