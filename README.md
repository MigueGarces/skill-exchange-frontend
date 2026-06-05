# Skill Exchange — Frontend

## Miguel Ángel Garcés Peñaranda - 1152432

Aplicación web construida con Next.js que consume una API REST de Django REST Framework.
Permite explorar habilidades, filtrarlas por categoría, ver perfiles de usuarios y gestionar metas de aprendizaje con autenticación JWT.

---

## Páginas implementadas

| Ruta | Descripción |
|---|---|
| `/` | Landing page con presentación de la plataforma |
| `/login` | Formulario de autenticación con JWT |
| `/dashboard` | Panel de bienvenida con datos del usuario |
| `/dashboard/skills` | Catálogo de habilidades con filtros, búsqueda, orden y paginación |
| `/dashboard/skills/[id]` | Detalle completo de una habilidad |
| `/dashboard/users` | Directorio de usuarios con paginación |
| `/dashboard/goals` | Metas de aprendizaje con barra de progreso y botón para alcanzar |

---

## Componentes principales

| Componente | Descripción |
|---|---|
| `Navbar` | Barra de navegación con links y botón de cerrar sesión |
| `HamburgerMenu` | Menú colapsable para pantallas móviles |
| `SkillCard` | Tarjeta que muestra nombre, categoría y nivel de una skill |
| `CategoryFilter` | Botones para filtrar skills por categoría |
| `OrderSelector` | Dropdown para ordenar resultados |
| `Pagination` | Componente reutilizable de paginación usado en Skills, Usuarios y Metas |
| `LoadingState` | Indicador visual mientras se cargan datos |
| `ErrorMessage` | Mensaje de error cuando falla una petición |
| `EmptyState` | Mensaje cuando no hay resultados |

---

## Decisiones de arquitectura

### API centralizado en `lib/api.js`
Todas las llamadas al backend pasan por un único archivo con un interceptor de Axios que agrega automáticamente el token JWT en cada petición. Esto evita repetir la lógica de autenticación en cada componente y hace el código más fácil de mantener.

### Protección de rutas en `dashboard/layout.jsx`
El layout del dashboard verifica al cargar si existe un token en `localStorage`. Si no hay token, redirige automáticamente al login. Esto protege todas las páginas del dashboard sin necesidad de repetir la verificación en cada una.

### Componente `Pagination` reutilizable
Se construyó desde el principio como un componente genérico que recibe `count`, `page`, `pageSize` y `onPageChange`. Se usa en tres páginas distintas: Skills, Usuarios y Metas, sin duplicar código.

### Filtrado y ordenamiento via API
Los filtros de categoría, búsqueda y ordenamiento se envían directamente como parámetros al API (`?category=technical&search=python&ordering=name`). Esto es más eficiente que filtrar en el cliente porque el servidor devuelve solo los datos necesarios.

### Estados de UI en cada página
Cada página maneja tres estados independientes: carga (`loading`), error (`error`) y lista vacía. Esto garantiza que el usuario siempre vea un mensaje claro sobre lo que está pasando.

### Autenticación JWT en localStorage
El token de acceso se guarda en `localStorage` al hacer login. Se usa solo con fines educativos. En un entorno de producción real se usarían `httpOnly cookies` para mayor seguridad.

---

## API utilizada

- **Base URL:** `https://apiskills.danidev.co/api`
- **Documentación:** `https://apiskills.danidev.co/api/docs/`
- **Autenticación:** JWT (Bearer Token)

---

## Tecnologías utilizadas

- **Next.js 14** — Framework de React con App Router
- **React** — Biblioteca de interfaz de usuario
- **Axios** — Cliente HTTP para consumir el API
- **Tailwind CSS** — Estilos utilitarios
- **JWT** — Autenticación con tokens