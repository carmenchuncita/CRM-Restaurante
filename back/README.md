

# Documentación del Proyecto:  CMR CODE RESTAURANT

## 1. Descripción General
**CMR CODE RESTAURANT** es una API desarrollada para gestionar reservas de mesas y menús en un restaurante. Los usuarios pueden registrarse, iniciar sesión y hacer reservas, mientras que los administradores pueden gestionar menús, mesas y reservas. 

### Características principales:
- Registro e inicio de sesión con autenticación JWT.
- Creación y gestión de menús.
- Creación y asignación de mesas con disponibilidad.
- Reservas de mesas por parte de clientes.
- Reseñas y valoraciones de los clientes.
- Gestión de roles (cliente/admin) y permisos de acceso.

---

## 2. Tecnologías Utilizadas
- **Node.js** con **Express** para el backend.
- **MongoDB** como base de datos.
- **Mongoose** para la manipulación de datos.
- **JWT (Json Web Token)** para autenticación.
- **bcrypt.js** para encriptación de contraseñas.
- **Nodemailer** para el envío de correos.

---

## 3. Modelos de Datos

### 3.1. Modelo de Usuario (`User`)
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "client" | "admin",
  "telefono": "string"
}
```

### 3.2. Modelo de Menú (`Menu`)
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "principalOptionA": "string",
  "principalOptionB": "string",
  "principalOptionC": "string",
  "secondOptionA": "string",
  "secondOptionB": "string",
  "secondOptionC": "string",
  "dessertsOptionA": "string",
  "dessertsOptionB": "string",
  "dessertsOptionC": "string",
  "day": "string",
  "isAvailable": "boolean"
}
```

### 3.3. Modelo de Mesa (`Mesa`)
```json
{
  "nombre": "string",
  "capacidad": "number",
  "isAvailable": "boolean"
}
```

### 3.4. Modelo de Reservas (`Reservation`)
```json
{
  "client": "UserID",
  "table": "MesaID",
  "email": "string",
  "date": "string",
  "time": "string",
  "canceled": "boolean"
}
```

### 3.5. Modelo de Reseñas (`Review`)
```json
{
  "reviwer": "UserID",
  "reservation": "ReservationID",
  "rating": "number",
  "description": "string"
}
```

---

## 4. Endpoints de la API

### 4.1. Autenticación
| Método | Ruta              | Descripción |
|---------|------------------|-------------|
| POST    | `/auth/register` | Registro de usuario |
| POST    | `/auth/login`    | Inicio de sesión y obtención de token |
| GET     | `/auth/verify`   | Verificación de token JWT |
| GET     | `/auth/profile`  | Obtener perfil del usuario |

### 4.2. Gestión de Menús
| Método | Ruta                | Descripción |
|---------|--------------------|-------------|
| GET     | `/menus`           | Obtener todos los menús |
| GET     | `/menus/:id`       | Obtener un menú por ID |
| POST    | `/menus`           | Crear un menú (requiere rol admin) |
| PUT     | `/menus/:id`       | Actualizar un menú (requiere rol admin) |
| DELETE  | `/menus/:id`       | Eliminar un menú (requiere rol admin) |

### 4.3. Gestión de Mesas
| Método | Ruta                | Descripción |
|---------|--------------------|-------------|
| GET     | `/mesas`           | Obtener todas las mesas |
| GET     | `/mesas/:id`       | Obtener una mesa por ID |
| POST    | `/mesas`           | Crear una nueva mesa (requiere rol admin) |
| PUT     | `/mesas/:id`       | Actualizar una mesa (requiere rol admin) |
| DELETE  | `/mesas/:id`       | Eliminar una mesa (requiere rol admin) |

### 4.4. Gestión de Reservas
| Método | Ruta                | Descripción |
|---------|--------------------|-------------|
| POST    | `/reservas`        | Crear una reserva |
| GET     | `/reservas`        | Obtener reservas del usuario |
| PUT     | `/reservas/:id`    | Modificar una reserva |
| DELETE  | `/reservas/:id`    | Cancelar una reserva |

### 4.5. Gestión de Reseñas
| Método | Ruta                | Descripción |
|---------|--------------------|-------------|
| POST    | `/reviews`         | Crear una reseña (requiere reserva previa) |
| PUT     | `/reviews/:id`     | Modificar una reseña |
| GET     | `/reviews`         | Obtener reseñas |

---

## 5. Seguridad y Autenticación
- Todas las rutas protegidas requieren un **token JWT**.
- Los administradores pueden gestionar menús, mesas y reservas.
- Los clientes solo pueden hacer reservas, dejar reseñas y ver menús.

---

## 6. Conclusión
Este sistema permite gestionar de manera eficiente las reservas y administración de un restaurante, asegurando seguridad, disponibilidad y una experiencia optimizada para los usuarios y administradores.

