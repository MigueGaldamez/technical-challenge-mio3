# 📝 Prueba Técnica – Miguel G.

📌 **Proyecto Todo List – API y Frontend**

---

## 🧾 Descripción del Proyecto

Este proyecto es una aplicación **Todo List** compuesta por dos partes:

- Una API desarrollada en **Node.js** con autenticación **JWT**
- Un frontend construido en **Next.js**

Permite a los usuarios iniciar sesión, gestionar tareas y cerrar sesión de forma segura usando **cookies**.

---

## 📋 Tecnologías Utilizadas

### 🔧 Backend
```plaintext
Node.js
Express
MongoDB
JWT
bcryptjs
cookie-parser
```
### Frontend
```plaintext
Next.js
Bootstrap
Next Router
HTTP Interceptors
```
# 🚀 Instalación y Ejecución
## ✅ Requisitos Previos
```plaintext
Node.js (v18 o superior)
MongoDB
Next.js instalado globalmente
```
# 🔌 Backend
```plaintext
bash
cd backend
npm install
npm run dev
El servidor se levantará por defecto en: http://localhost:5000
(Según configuración)
```

# 💻 Frontend (Next.js)
```plaintext
bash
cd frontend
npm install
npm run dev
Next.js se ejecutará en: http://localhost:3000
(Puerto configurable)
```

## 📁 Estructura de Carpetas y Arquitectura
# 📦 Backend

```plaintext
backend/
├── controllers/        # Lógica de negocio 
├── middleware/         # Middlewares personalizados
├── models/             # Esquemas de Mongoose
├── routes/             # Rutas agrupadas
├── server.js           # Punto de entrada del backend
├── migration.js        # Archivo de migración de datos iniciales
└── socket.js           # Conexión al websocket para notificaciones
```
# 🧩 Frontend

```plaintext
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

        ```