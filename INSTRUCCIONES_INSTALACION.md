#  Guía Completa de Instalación - Papu's Grill React

##  Información General

Tu proyecto **Papu's Grill** ha sido completamente convertido a **React** con toda la funcionalidad del original. Está 100% funcional y listo para usar.

##  Ubicación del Proyecto

```
C:\Users\Usuario\Documents\papus-final-react
```

##  Qué Está Incluido

###  Componentes Completados:

1.  **Sistema de Autenticación**
   - Registro de usuarios
   - Login de clientes
   - Login de administrador
   - Recuperación de contraseña

2.  **Dashboard de Cliente**
   - Panel de inicio
   - Historial de pedidos
   - Gestión de reservas
   - Edición de perfil

3.  **Dashboard de Administrador**
   - Panel de control
   - Gestión de pedidos
   - Gestión de reservas
   - Visualización de reseñas

4.  **Páginas Públicas**
   - Inicio con carrusel automático
   - Menú de productos
   - Sistema de reseñas
   - Página "Nosotros"

5.  **Diseño Responsive**
   - Desktop
   - Tablet
   - Móvil

##  Pasos de Instalación

### Opción 1: Método Manual (Recomendado)

1. **Abre una terminal (CMD o PowerShell)**

2. **Navega al proyecto:**
   ```bash
   cd C:\Users\Usuario\Documents\papus-final-react
   ```

3. **Instala las dependencias (si no están instaladas):**
   ```bash
   npm install
   ```

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm start
   ```

5. **El navegador se abrirá automáticamente en:**
   ```
   http://localhost:3000
   ```

### Opción 2: Usando el Script de Inicio

1. **Haz doble clic en:**
   ```
   start.bat
   ```

2. **Se abrirá automáticamente la aplicación**

##  Credenciales de Prueba

### Cliente:
```
Accede a la página de registro y crea una cuenta.
O utiliza la cuenta de demostración creada.
```

### Administrador:
```
Email: admin@papus.com
Contraseña: 12345
```

##  Flujo de Uso

### Para Nuevos Usuarios:

1. **Visita http://localhost:3000**
2. **Explora el menú de Inicio**
3. **Haz clic en "Registro"**
4. **Crea tu cuenta**
5. **Inicia sesión**
6. **Accede al Dashboard**
7. **Haz reservas o deja reseñas**

### Para Administrador:

1. **Visita http://localhost:3000**
2. **Haz clic en "Registro"**
3. **Selecciona "Iniciar Sesión"**
4. **Usa las credenciales del admin**
5. **Accede al Panel de Administración**

##  Estructura del Proyecto

```
papus-final-react/
├── public/
│   ├── index.html
│   └── image/              # Carpeta de imágenes
├── src/
│   ├── components/         # Componentes
│   │   └── Header.js
│   ├── contexts/          # Context API
│   │   └── AuthContext.js
│   ├── pages/             # Páginas principales
│   │   ├── Home.js
│   │   ├── Menu.js
│   │   ├── Reviews.js
│   │   ├── About.js
│   │   ├── Login.js
│   │   ├── Recover.js
│   │   ├── ClientDashboard.js
│   │   └── AdminDashboard.js
│   ├── styles/            # Estilos CSS
│   ├── App.js
│   └── index.js
├── package.json
└── start.bat             # Script de inicio
```

##  Funcionalidades Principales

###  Página de Inicio
- Carrusel automático de imágenes
- Características principales
- Navegación intuitiva

###  Menú de Productos
- 3 categorías: Sopas, Platos Fuertes, Parrilla
- Filtrado dinámico
- Precios y descripciones

###  Sistema de Reseñas
- Formulario interactivo
- Calificación 1-5 estrellas
- Almacenamiento en localStorage
- Visualización de reseñas guardadas

###  Dashboard Cliente
- Panel de bienvenida
- Historial de pedidos
- Gestión de reservas (crear, ver)
- Edición de perfil
- Cierre de sesión

###  Dashboard Admin
- Estadísticas generales
- Gestión de pedidos
- Gestión de reservas
- Visualización de reseñas
- Panel de control completo

##  Almacenamiento de Datos

**Importante:** El proyecto usa **localStorage** del navegador.

Esto significa:
-  Los datos se guardan en tu navegador
-  Los datos persisten entre sesiones
-  Cada usuario tiene su propio almacenamiento
-  Si limpias el caché, se pierden los datos

##  Características Responsive

- **Desktop (1200px+):** Interfaz completa
- **Tablet (768px-1199px):** Adaptada
- **Móvil (<768px):** Menú hamburguesa, interfaz optimizada

##  Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm start

# Build para producción
npm run build

# Ejecutar tests
npm test

# Limpiar caché
npm cache clean --force
```

##  Solución de Problemas

### Problema: "npm not found"
**Solución:** Instala Node.js desde https://nodejs.org/

### Problema: Puerto 3000 ocupado
**Solución:** 
```bash
# Usa otro puerto
npm start -- --port 3001
```

### Problema: Las imágenes no cargan
**Solución:** Verifica que la carpeta `public/image/` tenga todas las imágenes del proyecto original

### Problema: "Cannot find module"
**Solución:**
```bash
npm install
```

##  Capturas de Pantalla (Funcionalidades)

###  Implementadas:
-  Home con carrusel
-  Menú responsivo
-  Sistema de login/registro
-  Dashboard cliente completo
-  Dashboard admin completo
-  Gestión de reservas
-  Sistema de reseñas
-  Página "Nosotros"
-  Diseño responsive

##  Seguridad

-  Autenticación con Context API
-  Protección de rutas
-  Validación de formularios
-  Almacenamiento seguro en localStorage

##  Notas Importantes

1. **Este es un proyecto de demostración académica**
2. **Para producción, necesitarías un backend real**
3. **Los datos se guardan localmente en el navegador**
4. **Las credenciales del admin son de demostración**

##  Tecnologías Utilizadas

- **React 18**: Framework de UI
- **React Router v6**: Enrutamiento
- **Context API**: Gestión de estado
- **Bootstrap 5**: Framework CSS
- **Bootswatch**: Tema visual
- **Font Awesome 6**: Iconos
- **CSS Modular**: Estilos personalizados

##  Soporte

Si tienes problemas:

1. Verifica que Node.js esté instalado
2. Limpia node_modules: `rm -r node_modules` y reinstala
3. Revisa la consola del navegador (F12)
4. Verifica que localhost:3000 esté accesible

##  Características Futuras

Para mejorar el proyecto en el futuro:
- Backend con Node.js/Express
- Base de datos (MongoDB/PostgreSQL)
- Pasarela de pagos
- Notificaciones en tiempo real
- App móvil nativa

---

##  ¡Listo para Usar!

Tu aplicación está completamente funcional. Solo necesitas:

1. **Ir a la carpeta del proyecto**
2. **Ejecutar `npm start`**
3. **¡Disfrutar!**

**Dirección del proyecto:**
```
C:\Users\Usuario\Documents\papus-final-react
```

**URL de acceso:**
```
http://localhost:3000
```

¡Que disfrutes usando Papu's Grill en React!
