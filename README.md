# Ecommerce Kleancolor — Backend API (NestJS)

API backend para un proyecto e-commerce construida con **NestJS + TypeORM + PostgreSQL**, con **autenticación JWT**, **control de acceso por roles (RBAC)** y **documentación con Swagger**.

---

## ✨ Características

- **Autenticación**
  - Registro (Sign Up) / Inicio de sesión (Sign In)
  - Hash de contraseñas con **bcrypt**
  - Generación y validación de tokens **JWT**
- **RBAC (Roles)**
  - Decorador custom `@Roles()`
  - `AuthGuard` + `RolesGuard` para proteger rutas
- **Users**
  - CRUD de usuarios (con rutas protegidas)
  - Las respuestas **no exponen** `password`
- **Products**
  - CRUD de productos
  - Acciones protegidas para admin (ej. update/delete)
- **Categories**
  - CRUD de categorías
- **Orders** _(módulo incluido en la estructura del proyecto)_
- **File Upload** _(módulo incluido en la estructura del proyecto)_
- **Swagger**
  - Documentación disponible en `/api`

---

## 🧱 Stack Tecnológico

- **Node.js / TypeScript**
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **JWT** (`@nestjs/jwt`)
- **bcrypt**
- **class-validator / class-transformer**
- **Swagger** (`@nestjs/swagger`)
- **Docker / Docker Compose** (para local)

---

## 📁 Estructura del Proyecto

````bash
backend/
  src/
    modules/
      auth/
      users/
      products/
      categories/
      orders/
      file-upload/
    main.ts
    app.module.ts
  Dockerfile
  docker-compose.yml

## ✅ Requisitos

- **Node.js 18+** (recomendado **20 LTS**)
- **npm 9+**
- **PostgreSQL local** **o** **Docker + Docker Compose**

---

## ⚙️ Variables de Entorno

Crea un archivo **`.env`** dentro de **`backend/`**:

```env
# App
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=kleancolor

# JWT
JWT_SECRET=super_secret_key_change_me
JWT_EXPIRES_IN=1h
```

## 🚀 Ejecutar en Local (sin Docker)

```bash
cd backend
npm install
npm run start:dev


La API corre en:

http://localhost:3000

Swagger:

http://localhost:3000/api

## 🐳 Ejecutar con Docker Compose (recomendado)

Desde la raíz del proyecto (o desde backend/, según dónde tengas el docker-compose.yml):

docker compose up --build

Detener:

docker compose down

Eliminar volúmenes (borra datos persistidos):

docker compose down -v

📚 Swagger (Documentación)

Con la app corriendo:

Swagger UI: http://localhost:3000/api

Para autorizar requests en Swagger:

Llama POST /auth/signin

Copia el token devuelto

Click en Authorize

Pega:

Bearer <TU_TOKEN>

````
