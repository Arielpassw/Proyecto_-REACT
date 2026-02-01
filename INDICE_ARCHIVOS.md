#  Índice de Archivos del Proyecto React

## Directorio: `C:\Users\Usuario\Documents\papus-final-react`

---

##  Estructura Completa

###  Root Files (Raíz del proyecto)
```
├── package.json ........................ Dependencias y configuración npm
├── package-lock.json .................. Lockfile de npm
├── README_ES.md ....................... Documentación en español
├── INSTRUCCIONES_INSTALACION.md ....... Guía de instalación detallada
├── INICIO_RAPIDO.md ................... Guía de inicio rápido
├── RESUMEN.md ......................... Resumen del proyecto
├── start.bat .......................... Script para iniciar en Windows
└── .gitignore ......................... Archivo de configuración git
```

---

##  Carpeta `public/` (Archivos públicos)

```
public/
├── index.html ......................... HTML principal
├── favicon.ico ........................ Icono de la página
├── manifest.json ...................... Configuración PWA
└── image/ ............................. Carpeta de imágenes
    ├── Papu's.png ..................... Logo
    ├── papusfondo.jpg ................ Imagen de fondo
    ├── promo.jpg ..................... Imagen promoción
    ├── promo_cumple.jpg .............. Promoción cumpleaños
    ├── promo_cumple2.jpg ............. Promoción 2
    ├── lomo_fino2.jpg ................ Foto lomo fino
    ├── Hamburguesa.jpg ............... Foto hamburguesa
    ├── Promociones.jpg ............... Foto promociones
    ├── encebollado.jpg ............... Foto encebollado
    ├── viche.jpg ..................... Foto viche
    ├── locro.jpg ..................... Foto locro
    ├── yahuarlocro.jpg ............... Foto yahuarlocro
    ├── secopollo.jpg ................. Foto seco de pollo
    ├── encocado.jpg .................. Foto encocado
    ├── corvina.jpg ................... Foto corvina
    ├── secocarne.jpg ................. Foto seco de carne
    ├── lomofino.jpg .................. Foto lomo fino
    ├── asado.jpg ..................... Foto asado
    ├── churrasco.jpg ................. Foto churrasco
    ├── pinchos.jpg ................... Foto pinchos
    ├── fondo2.png .................... Fondo de header
    └── desktop.ini ................... Archivo de sistema

NOTE:  IMPORTANTE: Copia las imágenes de `Papu´s_Final` a esta carpeta
```

---

##  Carpeta `src/` (Código fuente)

###  `src/components/` (Componentes reutilizables)
```
src/components/
└── Header.js .......................... Componente de cabecera/navegación
```

###  `src/contexts/` (Context API - Estado Global)
```
src/contexts/
└── AuthContext.js ..................... Contexto de autenticación
    - loggedUser
    - loggedAdmin
    - registerUser()
    - loginUser()
    - loginAdmin()
    - logoutUser()
    - logoutAdmin()
    - updateUserProfile()
```

###  `src/pages/` (Páginas principales)
```
src/pages/
├── Home.js ...........................  Página de inicio
│   - Carrusel automático
│   - Características del negocio
│   - Responsive
│
├── Menu.js ........................... Catálogo de productos
│   - 3 categorías (Sopas, Fuertes, Parrilla)
│   - Filtrado dinámico
│   - Grid de productos
│
├── Reviews.js ........................  Sistema de reseñas
│   - Formulario de reseñas
│   - Calificación 1-5 estrellas
│   - Almacenamiento en localStorage
│   - Visualización de reseñas
│
├── About.js ..........................  Página "Nosotros"
│   - Historia de la empresa
│   - Valores y misión
│   - Equipo de trabajo
│   - Información de contacto
│
├── Login.js ..........................  Autenticación
│   - Registro de usuarios
│   - Login de clientes
│   - Toggle entre formularios
│   - Validación

├── Recover.js ........................  Recuperación de contraseña
│   - Formulario de recuperación
│   - Validación de email
│   - Simulación de envío
│
├── ClientDashboard.js ................  Panel de cliente
│   - Panel de bienvenida
│   - Mis pedidos
│   - Mis reservas
│   - Mi perfil
│   - Cierre de sesión
│
└── AdminDashboard.js .................  Panel de administrador
    - Dashboard general
    - Gestión de pedidos
    - Gestión de reservas
    - Visualización de reseñas
    - Estadísticas
```

###  `src/styles/` (Estilos CSS)
```
src/styles/
├── global.css ......................... Estilos globales y comunes
├── header.css ......................... Estilos del header/navegación
├── home.css ........................... Estilos de la página de inicio
├── menu.css ........................... Estilos del menú/productos
├── reviews.css ........................ Estilos de reseñas
├── auth.css ........................... Estilos de autenticación
├── dashboard.css ...................... Estilos del dashboard cliente
├── admin.css .......................... Estilos del dashboard admin
└── about.css .......................... Estilos de página "Nosotros"
```

###  `src/` - Archivos raíz de src
```
src/
├── App.js ............................  Componente principal
│   - Todas las rutas
│   - Provider de AuthContext
│
├── index.js ..........................  Punto de entrada
│   - Renderiza la app
│   - Carga ReactDOM
│
└── index.css ......................... Estilos base
```

---

##  `node_modules/` (Dependencias)

Generado automáticamente. Contiene todas las librerías:
- react
- react-dom
- react-router-dom
- bootstrap
- font-awesome

---

##  Resumen de Archivos

| Categoría | Cantidad | Archivos |
|-----------|----------|----------|
| **Componentes** | 1 | Header.js |
| **Contextos** | 1 | AuthContext.js |
| **Páginas** | 8 | Home, Menu, Reviews, About, Login, Recover, ClientDash, AdminDash |
| **Estilos** | 9 | global, header, home, menu, reviews, auth, dashboard, admin, about |
| **Configuración** | 4 | App.js, index.js, index.css, package.json |
| **Documentación** | 4 | README, INSTRUCCIONES, INICIO_RAPIDO, RESUMEN |
| **Total** | ~30+ | - |

---

##  Flujo de Archivos

```
index.html
    ↓
index.js
    ↓
App.js (Rutas)
    ↓
├─ Header.js (en todas las páginas públicas)
├─ Home.js (/)
├─ Menu.js (/menu)
├─ Reviews.js (/reviews)
├─ About.js (/about)
├─ Login.js (/login, /recover)
├─ ClientDashboard.js (/dashboard)
└─ AdminDashboard.js (/admin)

AuthContext.js
    ├─ localStorage (almacenamiento)
    └─ Disponible en todas las páginas
```

---

##  Almacenamiento de Datos

### localStorage
```
- registeredUser: { nombre, email, password }
- loggedUser: { nombre, email, password }
- loggedAdmin: { nombre, rol }
- reservasPapu: []
- reseñasPapu: []
- resetRequest: { email, fecha }
```

---

##  Rutas de la Aplicación

```
Rutas Públicas:
GET  /                    → Home
GET  /menu               → Menu
GET  /reviews            → Reviews
GET  /about              → About
GET  /login              → Login (+ Recover)

Rutas Protegidas:
GET  /dashboard          → ClientDashboard (requiere loggedUser)
GET  /admin              → AdminDashboard (requiere loggedAdmin)

Redirecciones:
*                        → / (cualquier otra ruta)
```

---

##  Componentes y Características

###  Home.js
- Carrusel automático
- Características
- Footer

###  Menu.js
- Filtrado de categorías
- Grid responsivo
- Precios

###  Reviews.js
- Formulario de reseñas
- Validación
- Lista de reseñas guardadas

###  About.js
- Secciones de contenido
- Valores
- Equipo
- Contacto

###  Login.js
- Toggle registro/login
- Formularios validados
- Manejo de errores

###  Recover.js
- Formulario de recuperación
- Validación de email
- Confirmación

###  ClientDashboard.js
- Navegación por secciones
- Datos dinámicos
- Edición de perfil
- Gestión de reservas

###  AdminDashboard.js
- Estadísticas
- Tablas de datos
- Gestión completa

---

##  Paleta de Colores

```css
Colores principales:
- Azul: #667eea
- Púrpura: #764ba2
- Rojo: #c41e1e
- Dorado: #d2b48c
- Gris claro: rgb(249, 244, 236)
- Blanco: #ffffff
- Gris oscuro: #333333
```

---

##  Convenciones de Código

### Nombres de Archivos
- Componentes: PascalCase (Header.js)
- Estilos: lowercase (header.css)
- Variables: camelCase (loggedUser)
- Constantes: UPPERCASE (MAX_RESERVAS)

### Estructura de Componentes
```jsx
import { hooks }
import styles

const ComponentName = () => {
  const [state, setState] = useState()
  
  useEffect(() => {}, [])
  
  const handleEvent = () => {}
  
  return (
    <div className="component">
      JSX content
    </div>
  )
}

export default ComponentName
```

---

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

# Eject (no revertible)
npm eject
```

---

##  Importante

1. **Copiar imágenes**: Las imágenes deben estar en `public/image/`
2. **Node.js**: Debe estar instalado (v14+)
3. **Puerto**: Usa puerto 3000 o 3001
4. **localStorage**: Datos se guardan en el navegador
5. **Demo**: Las credenciales admin son para demostración

---

##  Archivos de Ayuda

- `INICIO_RAPIDO.md` - Instrucciones en 3 pasos
- `INSTRUCCIONES_INSTALACION.md` - Guía detallada
- `README_ES.md` - Documentación completa
- `RESUMEN.md` - Resumen técnico

---

**Versión:** 1.0.0
**Fecha:** Enero 2025
**Estado:** ✅ Completado

 **¡Proyecto completo y funcional!**
