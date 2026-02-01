# Papu's Grill - React Version

Aplicación web totalmente funcional de Papu's Grill convertida a React con 100% de funcionalidad del proyecto original.

##  Características

###  Funcionalidades Implementadas

1. **Página de Inicio (Home)**
   - Carrusel automático de imágenes
   - Sección de características
   - Navegación intuitiva

2. **Menú de Productos**
   - Categorías filtradas (Sopas, Platos Fuertes, Parrilla)
   - Visualización de precios y descripciones
   - Diseño responsive

3. **Sistema de Reseñas**
   - Formulario para dejar reseñas
   - Calificación con estrellas (1-5)
   - Almacenamiento en localStorage
   - Visualización de reseñas guardadas

4. **Sistema de Autenticación**
   - Registro de usuarios
   - Login de clientes
   - Login de administrador (email: admin@papus.com, contraseña: 12345)
   - Recuperación de contraseña
   - Gestión de sesiones con Context API

5. **Dashboard de Cliente**
   - Panel de inicio con estadísticas
   - Historial de pedidos
   - Gestión de reservas
   - Edición de perfil
   - Cierre de sesión

6. **Dashboard de Administrador**
   - Estadísticas generales
   - Gestión de pedidos
   - Gestión de reservas
   - Visualización de reseñas
   - Panel de control completo

7. **Página Nosotros**
   - Información sobre la empresa
   - Valores de la marca
   - Equipo de trabajo
   - Información de contacto

8. **Diseño Responsive**
   - Funciona perfectamente en desktop, tablet y móvil
   - Menú hamburguesa en dispositivos móviles
   - Interfaz adaptable

## 📋 Requisitos

- Node.js v14 o superior
- npm v6 o superior

## 🔧 Instalación

1. **Navega al directorio del proyecto:**
```bash
cd papus-final-react
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Inicia el servidor de desarrollo:**
```bash
npm start
```

4. **Abre tu navegador:**
```
http://localhost:3000
```

##  Dependencias Principales

- **React**: Framework de UI
- **React Router DOM**: Enrutamiento de la aplicación
- **Bootstrap**: Framework CSS
- **Bootswatch**: Tema Darkly para Bootstrap
- **Font Awesome**: Iconos

##  Uso de la Aplicación

### Para Clientes:

1. **Visita la página de inicio** - Explora el menú
2. **Crea una cuenta** - Regístrate en Login
3. **Inicia sesión** - Accede con tus credenciales
4. **Dashboard** - Visualiza tus pedidos y reservas
5. **Haz reservas** - Agenda una mesa en el restaurante
6. **Deja reseñas** - Comparte tu opinión

### Para Administrador:

1. **Inicia sesión como admin:**
   - Email: `admin@papus.com`
   - Contraseña: `12345`

2. **Gestiona:**
   - Pedidos del día
   - Reservas de clientes
   - Reseñas recibidas
   - Estadísticas generales

##  Almacenamiento de Datos

La aplicación utiliza **localStorage** para guardar:
- Usuarios registrados
- Usuarios logueados
- Reservas
- Reseñas
- Datos de administrador

Esto significa que los datos persisten en el navegador incluso después de cerrar la aplicación.

##  Estructura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   └── Header.js       # Cabecera navegable
├── contexts/           # Context API
│   └── AuthContext.js  # Contexto de autenticación
├── pages/              # Páginas principales
│   ├── Home.js
│   ├── Menu.js
│   ├── Reviews.js
│   ├── About.js
│   ├── Login.js
│   ├── Recover.js
│   ├── ClientDashboard.js
│   └── AdminDashboard.js
├── styles/             # Estilos CSS
│   ├── global.css
│   ├── header.css
│   ├── home.css
│   ├── menu.css
│   ├── reviews.css
│   ├── auth.css
│   ├── dashboard.css
│   ├── admin.css
│   └── about.css
└── App.js             # Aplicación principal
```

##  Seguridad

- Gestión de sesiones con Context API
- Protección de rutas (Dashboard requiere login)
- Validación de formularios
- Almacenamiento seguro de datos en localStorage

##  Responsividad

La aplicación es completamente responsive:

- **Desktop**: Interfaz completa con menú horizontal
- **Tablet**: Adaptación de espacios y tamaños
- **Móvil**: Menú hamburguesa y interfaz optimizada

##  Build para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Esto creará una carpeta `build/` lista para deployment.

## 🐛 Solución de Problemas

### El menú no aparece
- Verifica que Font Awesome esté correctamente instalado
- Limpia la caché del navegador (Ctrl+F5)

### Las imágenes no cargan
- Asegúrate de que la carpeta `public/image/` contiene todas las imágenes
- Verifica las rutas en los componentes

### Los datos no se guardan
- Verifica que localStorage esté habilitado en tu navegador
- Comprueba la consola del navegador para errores

##  Notas Importantes

- La aplicación es de demostración académica
- Los datos se guardan en localStorage (cliente)
- Para producción, se necesitaría un backend real
- Las credenciales del admin son hardcodeadas (solo para demo)

##  Contribuciones

Este proyecto fue creado como una conversión completa del HTML/CSS/JS original a React.

##  Licencia

© 2025 Papu's Grill. Todos los derechos reservados.

##  Funcionalidades Futuras

- Integración con backend real
- Sistema de pagos
- Notificaciones en tiempo real
- Panel de reportes avanzado
- App móvil nativa

---

**¡Disfruta usando Papu's Grill en React!** 
