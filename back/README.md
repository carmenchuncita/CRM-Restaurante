# Node-GYM

Node-GYM es un proyecto basado en Node.js que permite gestionar usuarios y eventos deportivos a través de una API REST.

---

## Instalación

Para iniciar el proyecto, sigue estos pasos:

### 1. Instalar las dependencias

Ejecuta los siguientes comandos para instalar todas las dependencias necesarias:

```bash
- npm install
```

## 2. Arranca el proyecto :

```bash
npm run dev
```
## 3. Ejemplo de Usuario para Pruebas de Login :
Puedes usar el siguiente usuario para probar el inicio de sesión:
URL: http://localhost:3501/api/users/login
Método:POST

```bash

 {
  "email": "test3@example.com",
  "password": "test3"
}
```
Al iniciar sesión con este usuario, deberías recibir una respuesta similar a la siguiente:
```bash
{
  "message": "Inicio de sesión con éxito",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1NWJjNTdmYWVhM2IyNzU4ZGY1MWI2IiwidXNlcl9lbWFpbCI6InRlc3QzQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMzNjcyMTkyfQ.WqJQozEp_DbLejA1CEUm4wzJaA7Kjj31rmP-gZkB2NU",
  "user": {
    "id": "6755bc57faea3b2758df51b6",
    "email": "test3@example.com",
    "name": "test3"
  }
}
```
## 4. Uso del Token en Thunder Client :
Una vez obtenido el token, inclúyelo en los headers de tus solicitudes:

Header:
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1NWJjNTdmYWVhM2IyNzU4ZGY1MWI2IiwidXNlcl9lbWFpbCI6InRlc3QzQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMzNjcyMTkyfQ.WqJQozEp_DbLejA1CEUm4wzJaA7Kjj31rmP-gZkB2NU
```
 **Obtener Perfil del Usuario Autenticado**
 - URL: http://localhost:3501/api/users/profile
 - Método: GET
La respuesta debería ser algo similar a esto:
```bash
{
  "user": {
    "name": "test3",
    "email": "test3@example.com",
    "id": "6755bc57faea3b2758df51b6",
    "role": "admin"
  }
}
```
## 5. Gestión de Eventos Deportivos:
**Requisitos**
Para crear, editar o eliminar eventos, debes:

- Ser un usuario con rol **admin**.
- Estar autenticado con un token válido.

**Crear un Evento**
- URL : http://localhost:3501/api/sports/createEvent
- Método: POST

Incluye el token en los headers:
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1NWJjNTdmYWVhM2IyNzU4ZGY1MWI2IiwidXNlcl9lbWFpbCI6InRlc3QzQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMzNjcyMTkyfQ.WqJQozEp_DbLejA1CEUm4wzJaA7Kjj31rmP-gZkB2NU
```

En el body, agrega los datos del evento. Ten en cuenta que **los campos location y type están restringidos a valores específicos**:

**Restricciones del Modelo de Eventos**
Al crear o editar un evento:

- location debe ser uno de los siguientes valores:
    - "room-1"
    - "room-2"
    - "room-3"
- type debe ser uno de los siguientes valores:
    - "cardio"
    - "flexibility"
    - "force"

```bash
{
    "name": "Cardio Workout",
    "description": "High-intensity cardio",
    "date": "2024-12-10T09:00:00.000Z",
    "location": "room-1",
    "type": "cardio"
}
```

**Editar un Evento**
- URL : http://localhost:3501/api/sports/updateEvent/<eventId>
- Método: PUT
- Ejemplo : http://localhost:3501/api/sports/updateEvent/6754b2277a19e3c556c19fac

Incluye el token en los headers:
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1NWJjNTdmYWVhM2IyNzU4ZGY1MWI2IiwidXNlcl9lbWFpbCI6InRlc3QzQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMzNjcyMTkyfQ.WqJQozEp_DbLejA1CEUm4wzJaA7Kjj31rmP-gZkB2NU
```

En el body, actualiza los datos del evento:

```bash
{
    "name": "Advanced Cardio Workout",
    "description": "A more challenging cardio session",
    "date": "2024-12-12T10:00:00.000Z",
    "location": "room-2",
    "type": "cardio"
}
```

**Eliminar un Evento**
- URL : http://localhost:3501/api/sports/deleteEvent/<eventId>
- Método: DELETE
- Ejemplo : http://localhost:3501/api/sports/deleteEvent/6754b2277a19e3c556c19fac

Incluye el token en los headers:
```bash
Authorization: Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1NWJjNTdmYWVhM2IyNzU4ZGY1MWI2IiwidXNlcl9lbWFpbCI6InRlc3QzQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMzNjcyMTkyfQ.WqJQozEp_DbLejA1CEUm4wzJaA7Kjj31rmP-gZkB2NU
```
**Todos Eventos**
- URL: http://localhost:3501/api/sports/getAllEvents
- Método: GET

**Eventos byId**
- URL: http://localhost:3501/api/sports/getById/<_id>
- Método: GET
- Ejemplo: http://localhost:3501/api/sports/getById/6754b2277a19e3c556c19fac

**Próximos Eventos**
- URL: http://localhost:3501/api/sports/events/upcoming
- Método: GET
- Ejemplo: http://localhost:3501/api/sports/events/upcoming

**Eventos por tipo**
- URL: http://localhost:3501/api/sports/events?type=<typeEvent>
- Método: 
- Ejemplo: http://localhost:3501/api/sports/events?type=cardio

**Eventos por Fechas**
- URL: http://localhost:3501/api/sports/events/date?from=<fecha1>&to=<fecha2>
- Método: GET
- Ejemplo: http://localhost:3501/api/sports/events/date?from=2024-12-10&to=2024-12-20

**Subida de imágenes**
- URL: http://localhost:3501/api/users/upload
- Método: POST
- Ejemplo:

Incluye el token en los headers, si necesitas la información puedes hacer un POST de http://localhost:3501/api/users/login, este es un ejemplo de client (usuario no admin):
```bash
  {
      "email": "test@gmail.com",
      "password": "test"
  }
  ```

te devolveá esto :
```bash
{
    "message": "Inicio de sesión con éxito",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1NDc5NTg5Y2FiNTEzNWJlY2U3MWI2IiwidXNlcl9lbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzMzNjYxNjc2fQ.vHgLaYnKqyRWctvhd9Rcd8VjeCFXE4jh8qxakAzAsek",
    "user": {
        "id": "675479589cab5135bece71b6",
        "email": "test@gmail.com",
        "name": "userTest"
    }
}
```
y ya tienes tu token para añadirlo a los Headers: 
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1NDc5NTg5Y2FiNTEzNWJlY2U3MWI2IiwidXNlcl9lbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzMzNjYxNjc2fQ.vHgLaYnKqyRWctvhd9Rcd8VjeCFXE4jh8qxakAzAsek
```
Ahora ves a la pestaña Form del thunder y completa los Form Fields con :

```bash
name : userTest
email:test@gmail.com
password: test
```
Marca la pestaña de Files y baja a la sección de abajo y completa con :
```bash
image "selcciona un fichero"
```
Recuerda en Thunder Client la subida de imágenes es con version premium, prueba en postman mejor
https://www.postman.com/, la respuesta te devoverá algo como esto en un usuario ya creado : 

```bash
{
    "message": "Usuario actualizado correctamente.",
    "user": {
        "image": "https://res.cloudinary.com/dw69blsqx/image/upload/v1733662183/img/kxnvz3gsrfl52b6grvm4.jpg",
        "_id": "675479589cab5135bece71b6",
        "name": "userTest",
        "email": "test@gmail.com",
        "password": "$2a$10$c4OaxLiTwCty75L8X.6C2eMPo7Fgm1cJwTVOIqb4AayqMwISpI0xO",
        "birth": "1980-01-01T00:00:00.000Z",
        "role": "client",
        "createdAt": "2024-12-07T16:35:36.168Z",
        "updatedAt": "2024-12-08T12:49:43.682Z",
        "__v": 0
    }
}
```


