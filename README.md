# Workspace — Gestor de Tareas y Productividad

Aplicación web SPA desarrollada en React para gestionar las tareas diarias de un equipo de trabajo, con seguimiento de progreso y organización por estados.

## 🚀 Demo en producción

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| react-router-dom v6 | Enrutamiento SPA |
| Tailwind CSS v3 | Estilos |
| SweetAlert2 | Alertas y confirmaciones |
| Axios | Peticiones HTTP |
| MockAPI | API REST simulada |
| LocalStorage | Persistencia de sesión |



Estructura del recurso `tareas`:

| Campo | Tipo |
|---|---|
| `titulo` | String |
| `descripcion` | String |
| `fechaVencimiento` | String |
| `estado` | String (`Pendiente` / `En Progreso` / `Completada`) |

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── FilterBar.jsx
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── Spinner.jsx
│   ├── StatsBar.jsx
│   ├── TaskCard.jsx
│   └── TaskForm.jsx
├── hooks/
│   └── useTareas.js
├── layouts/
│   └── DashboardLayout.jsx
├── pages/
│   ├── LoginPage.jsx
│   └── TableroPage.jsx
├── services/
│   └── tareasService.js
└── utils/
    ├── auth.js
    └── helpers.js
```

## ⚙️ Instalación local

```bash
git clone https://github.com/tho070412/WorkSpace.git
cd workspace
npm install
```

const BASE_URL = 'https://workspace-api-7v93.onrender.com/tareas'

```bash
npm run dev
```

## ✨ Funcionalidades

- 🔐 Login con nombre + departamento (LocalStorage)
- 🛡️ Rutas protegidas
- 📋 Listado de tareas con tarjetas
- ➕ Crear tarea con validación
- ✏️ Editar tarea completa
- ⚡ Cambio rápido de estado (Pendiente → En Progreso → Completada)
- 🗑️ Eliminar con confirmación SweetAlert2
- 📊 Estadísticas + barra de progreso general
- 🔍 Filtros por estado
- ⚠️ Indicador visual de tareas vencidas
- ⏳ Spinner durante peticiones
- 📱 Diseño responsivo

## 🌿 GitFlow

```
main → develop → feature/login-component
                → feature/task-crud
                → feature/ui-improvements
               → feature/style-adjustments
```

## 👤 Autor

Thomas Rodriguez Londoño