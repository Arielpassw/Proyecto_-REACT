#  Guía Completa de Uso - Papu's Grill React

##  Primeros Pasos

### 1️⃣ Abre la Aplicación
1. Abre terminal (CMD o PowerShell)
2. Escribe: `cd C:\Users\Usuario\Documents\papus-final-react`
3. Escribe: `npm start`
4. Se abrirá automáticamente en `http://localhost:3000`

### 2️⃣ Explora la Página de Inicio
- Verás un carrusel con fotos del restaurante
- Sección de características
- Botones de navegación

---

##  Cómo Crear una Cuenta

### Paso 1: Ir a Login
- Haz clic en "Registro" en el menú

### Paso 2: Crear Cuenta
- Selecciona "Regístrate aquí"
- Completa:
  - **Nombre completo**: Ej. Juan Pérez
  - **Correo**: Ej. juan@email.com
  - **Contraseña**: Ej. 123456
  - **Confirmar contraseña**: Repite la contraseña
- Haz clic en "Crear Cuenta"

### Paso 3: Ir al Login
- Se redirige automáticamente
- Ingresa tu correo y contraseña
- Haz clic en "Iniciar Sesión"

###  ¡Ya tienes cuenta!

---

##  Ver el Menú

### Proceso:
1. En la página de inicio, haz clic en "Pedidos"
2. Verás 3 categorías:
   - **Sopas**: Encebollado, Viche, Locro, Yahuarlocro
   - **Platos Fuertes**: Seco de pollo, Encocado, Corvina, Seco de carne
   - **Parrilla**: Lomo fino, Asado, Churrasco, Pinchos

3. Haz clic en una categoría para filtrar
4. Verás las opciones con precios
5. Haz clic en "Agregar" para añadir al carrito

---

##  Dejar una Reseña

### Proceso:
1. Haz clic en "Reseñas" en el menú
2. Desplázate hasta "Deja tu opinión"
3. Completa el formulario:
   - **Nombre**: Tu nombre
   - **Calificación**: Selecciona estrellas (1-5)
   - **Comentario**: Escribe tu opinión

4. Haz clic en "Enviar Reseña"
5. Verás tu reseña en la lista

---

##  Gestionar Reservas

### Acceder al Dashboard:
1. Inicia sesión con tu cuenta
2. Automáticamente irás al dashboard
3. O haz clic en "Mi perfil"

### Crear una Reserva:
1. En el dashboard, haz clic en "Mis reservas"
2. Completa el formulario:
   - **Nombre**: Tu nombre
   - **Fecha**: Ej. 15/02/2025
   - **Hora**: Ej. 19:30
   - **Personas**: Ej. 4
   - **Sucursal**: Elige sucursal
   - **Comentarios**: Especiales (opcional)

3. Haz clic en "Crear Reserva"
4. ¡Reserva registrada! Aparecerá en la lista

### Ver tus Reservas:
- En la sección "Mis reservas" verás todas

---

##  Editar tu Perfil

### Proceso:
1. Ve a "Mi perfil" en el dashboard
2. Haz clic en "Editar Perfil"
3. Modifica:
   - **Nombre**: Tu nombre
   - **Correo**: Tu correo (no se puede cambiar)

4. Haz clic en "Guardar"
5. Verás un mensaje de confirmación

---

##  Ver tu Historial

### En el Dashboard:
1. Haz clic en "Mis pedidos"
2. Verás una tabla con:
   - Fecha del pedido
   - Detalle del producto
   - Estado (Entregado/En proceso)
   - Total a pagar

---

##  Login de Administrador

### Credenciales:
```
Email: admin@papus.com
Contraseña: 12345
```

### Acceso:
1. Ve a "Registro"
2. Cambia a "Iniciar Sesión"
3. Ingresa las credenciales de admin
4. ¡Acceso al panel admin!

---

##  Panel de Administrador

### Dashboard General:
- Estadísticas de hoy
- Últimos pedidos
- Información rápida

### Gestión de Pedidos:
1. Haz clic en "Pedidos"
2. Verás tabla con:
   - Cliente
   - Producto
   - Total
   - Estado
   - Botón para editar

### Gestión de Reservas:
1. Haz clic en "Reservas"
2. Verás tarjetas con:
   - Fecha y hora
   - Nombre del cliente
   - Número de personas
   - Botón para confirmar

### Ver Reseñas:
1. Haz clic en "Reseñas"
2. Verás todas las reseñas deClientes
3. Clasificadas por fecha

---

##  Recuperar Contraseña

### Si Olvidaste tu Contraseña:
1. En la página de login
2. Haz clic en "¿Olvidaste tu contraseña?"
3. Ingresa tu correo de registro
4. Haz clic en "Enviar Enlace"
5. Verás un mensaje de confirmación

---

##  En Dispositivos Móviles

### Menú Hamburguesa:
- En móviles, el menú se comprime
- Aparece un ícono de 3 líneas (☰)
- Haz clic para ver el menú

### Navegación:
- Botones más grandes
- Diseño optimizado
- Scrolling suave

---

##  Datos Guardados

### ¿Dónde se guardan mis datos?
- En tu navegador (localStorage)
- No se olvidan si cierras la app
- Pero se pierden si limpias el caché

### Copia de seguridad:
- Toma screenshots de tus reservas
- Abre las herramientas del navegador (F12)
- Busca "reservasPapu"

---

##  Solución de Problemas

### Las imágenes no cargan
- Recarga la página (F5)
- Limpia caché (Ctrl+Shift+Delete)

### No puedo iniciar sesión
- Verifica que tu correo sea correcto
- Verifica tu contraseña
- Para admin: admin@papus.com / 12345

### Los datos no se guardan
- Verifica que localStorage esté habilitado
- No uses navegación privada
- Limpia caché e intenta de nuevo

### App muy lenta
- Cierra otras pestañas
- Reinicia el navegador
- Ejecuta `npm start` de nuevo

---

##  Flujo Completo (Ejemplo)

### Como Cliente:
```
1. Abre la app (http://localhost:3000)
   ↓
2. Explora el menú de inicio
   ↓
3. Ve a "Registro" y crea una cuenta
   ↓
4. Inicia sesión
   ↓
5. Verás el dashboard
   ↓
6. Haz una reserva en "Mis reservas"
   ↓
7. Deja una reseña en "Reseñas"
   ↓
8. Edita tu perfil si deseas
   ↓
9. Cierra sesión
```

### Como Administrador:
```
1. Abre la app
   ↓
2. Ve a "Registro"
   ↓
3. Inicia sesión con: admin@papus.com / 12345
   ↓
4. Acceso al panel admin
   ↓
5. Ver estadísticas
   ↓
6. Gestionar pedidos
   ↓
7. Gestionar reservas
   ↓
8. Ver reseñas
   ↓
9. Cierra sesión
```

---

##  Ayuda Rápida

### Correo del Admin:
```
admin@papus.com
```

### Contraseña del Admin:
```
12345
```

### URL de la Aplicación:
```
http://localhost:3000
```

### Carpeta del Proyecto:
```
C:\Users\Usuario\Documents\papus-final-react
```

---

##  Interfaz

### Colores:
- **Azul/Púrpura**: Enlaces y botones principales
- **Rojo**: Acciones importantes
- **Dorado**: Detalles especiales
- **Gris**: Elementos secundarios

### Iconos:
-  Inicio
-  Menú/Pedidos
-  Reseñas
-  Nosotros
-  Login
-  Reservas
-  Perfil
-  Cerrar sesión

---

##  Tips y Trucos

1. **Carrusel**: Auto-rota cada 5 segundos
2. **Filtros**: Filtra por categoría en el menú
3. **Responsive**: Prueba en diferentes tamaños
4. **F12**: Abre herramientas de desarrollador
5. **Ctrl+F5**: Limpia caché sin limpiar datos

---

##  Funciones Especiales

-  Carrusel automático
-  Filtrado dinámico
-  Validación de formularios
-  Diseño responsive
-  Menú hamburguesa
-  Múltiples dashboards
-  Gestión de reservas

---

##  Aprende Sobre:

- **React**: Componentes y Hooks
- **Routing**: React Router
- **Estado**: Context API
- **Almacenamiento**: localStorage
- **Diseño**: CSS responsivo
- **Validación**: Formularios

---

##  ¡Estás Listo!

Ya sabes todo lo que necesitas para usar Papu's Grill React.

1. Abre la app
2. Crea una cuenta
3. ¡Disfruta!

---

**Versión:** 1.0.0
**Última actualización:** Enero 2025

 **¡Bienvenido a Papu's Grill React!**
