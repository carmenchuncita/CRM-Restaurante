# Documentación del Frontend: CMR CODE RESTAURANT

## 1. Descripción General
El frontend de **CMR CODE RESTAURANT** fue desarrollado en **Angular** y proporciona una interfaz de usuario para la gestión de menús, reservas y usuarios del restaurante. Incluye autenticación, manejo de permisos y paneles interactivos para administradores y clientes.

### Características principales:
- Desarrollo basado en **componentes** con Angular.
- Uso de **Angular Material** para la interfaz.
- Notificaciones con **SweetAlert**.
- Autenticación y protección de rutas con **Guards**.
- Gestión de estados mediante servicios.

---

## 2. Tecnologías Utilizadas
- **Angular** (Framework frontend basado en TypeScript).
- **Angular Material** (Componentes UI para el diseño del frontend).
- **SweetAlert** (Alertas interactivas y personalizables).
- **RxJS** (Manejo de flujos asíncronos y suscripciones en Angular).
- **RouterModule** (Sistema de enrutamiento en Angular).

---

## 3. Estructura del Proyecto

```
/front
├── src/
│   ├── app/
│   │   ├── about-us/ (Sección sobre el restaurante)
│   │   ├── admin/ (Panel de administración y gestión)
│   │   ├── error404/ (Página de error 404 personalizada)
│   │   ├── footer/ (Pie de página con información del restaurante)
│   │   ├── header/ (Encabezado y menú de navegación)
│   │   ├── home/ (Página de inicio con presentación del restaurante)
│   │   ├── main/ (Vista principal con estructura general)
│   │   ├── menus/ (Sección de menús del restaurante)
│   │   ├── reservations/ (Módulo de reservas de mesas)
│   │   ├── app.routes.ts (Enrutamiento de la aplicación)
│   │   ├── app.module.ts (Módulo principal de Angular)
│   ├── environments/ (Configuraciones de entornos de desarrollo y producción)
│   ├── index.html (Página principal de la aplicación)
│   ├── main.ts (Punto de entrada de la aplicación Angular)

---

## 4. Componentes Principales

### 4.1. **Menú**
- `CreateMenuComponent`: Formulario para crear menús.
- `UpdateMenuComponent`: Edición de menús.
- `DeleteMenuComponent`: Eliminación de menús con confirmación en SweetAlert.
- `MenuListComponent`: Lista de menús disponibles con opción de paginación y edición.

### 4.2. **Reservas**
- `ReservationsListComponent`: Lista de reservas realizadas por los clientes.
- `ReservationsComponent`: Formulario para realizar reservas.

### 4.3. **Reseñas**
- `ReviewsListComponent`: Muestra reseñas de clientes.

### 4.4. **Autenticación y Usuarios**
- `LoginComponent`: Formulario de inicio de sesión con validación.
- `RegisterComponent`: Formulario de registro de usuarios.
- `ProfileComponent`: Sección de perfil de usuario.
- `UpdatePasswordComponent`: Cambio de contraseña.

### 4.5. **Panel de Administración**
- `SidenavPanelComponent`: Panel lateral para navegación y selección de opciones de administración.
- `RestaurantManagementComponent`: Gestión centralizada de menús y reservas.

---

## 5. Enrutamiento (Routes)

### 5.1. **Administración** (`ADMIN_ROUTES`)
```ts
export const ADMIN_ROUTES: Routes = [
  { path: 'management', component: RestaurantManagementComponent, canActivate: [authGuard] },
  { path: 'create-menu', component: CreateMenuComponent, canActivate: [authGuard] },
  { path: 'delete-menu/:id', component: DeleteMenuComponent, canActivate: [authGuard] },
  { path: 'update-menu/:id', component: UpdateMenuComponent, canActivate: [authGuard] },
];
```

### 5.2. **Autenticación** (`AUTH_ROUTES`)
```ts
export const AUTH_ROUTES: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'actualizar-contrasena', component: UpdatePasswordComponent },
];
```

---

## 6. Servicios
- `AdminService`: Maneja las peticiones al backend para la creación, edición y eliminación de menús.
- `AuthService`: Gestión de autenticación y verificación de usuarios.
- `ReservationsService`: Manejo de reservas.

---

## 7. Seguridad y Protección de Rutas
Se utilizan **Guards** para proteger las rutas:
- `authGuard`: Protege rutas que requieren autenticación.
- `adminGuard`: Restringe acceso a secciones administrativas.

Ejemplo de protección de ruta:
```ts
{
  path: 'management',
  component: RestaurantManagementComponent,
  canActivate: [authGuard]
}
```

---

## 8. Instalación y Ejecución
### **1️⃣ Clonar el repositorio**
```bash
git clone https://github.com/carmenchuncita/CRM-Restaurante.git
cd front
```

### **2️⃣ Instalar dependencias**
```bash
npm install
```

### **3️⃣ Ejecutar la aplicación**
```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`.

---

## 9. Conclusión
El frontend de **CMR CODE RESTAURANT** proporciona una experiencia fluida para la gestión de reservas y menús, asegurando una buena experiencia para administradores y clientes mediante Angular, Angular Material y SweetAlert. 🚀

