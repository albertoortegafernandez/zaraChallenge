# Zara Challenge — Mobile Shop

Aplicación web de catálogo de teléfonos móviles con búsqueda en tiempo real, vista de detalle con selectores de color y almacenamiento, y carrito persistente.

Cumple íntegramente el stack exigido por la prueba:

- **Frontend:** React 18 + TypeScript
- **Bundler:** Vite 5 (modo desarrollo sin minimizar · modo producción concatenado y minimizado)
- **Estilos:** Styled Components
- **Estado global (carrito):** React Context API + `useReducer` + `localStorage`
- **Data fetching / caché / reintentos:** TanStack React Query (v5)
- **Routing:** React Router DOM v6
- **Testing:** Jest + React Testing Library + jsdom
- **Calidad:** ESLint (incluye `jsx-a11y`) + Prettier
- **Autenticación API:** cabecera `x-api-key` inyectada en todas las peticiones

## Requisitos previos

- **Node.js ≥ 18**
- npm ≥ 9

## Instalación

```bash
npm install
```

## Variables de entorno

El proyecto usa variables de Vite (prefijo `VITE_`). Ya existe un `.env` y un `.env.example` con los valores por defecto:

```
VITE_API_BASE_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
VITE_API_KEY=87909682e6cd74208f41a6ef39fe4191
```

> Si la API cambia de host, sólo hay que editar `VITE_API_BASE_URL`. La `x-api-key` se envía en `src/api/http.ts` en cada `fetch`.

## Scripts disponibles

| Script             | Descripción                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| `npm run dev`      | **Modo desarrollo** — sirve los assets sin minimizar (HMR, sourcemaps, puerto 3000). |
| `npm run build`    | **Modo producción** — type-check + build minificado y chunked en `dist/`.        |
| `npm run preview`  | Sirve localmente el bundle de producción (puerto 4173).                         |
| `npm test`         | Ejecuta la suite de Jest.                                                        |
| `npm run test:watch` | Jest en modo watch.                                                           |
| `npm run test:coverage` | Jest con reporte de cobertura.                                              |
| `npm run lint`     | ESLint sobre `src/**/*.{ts,tsx}`.                                               |
| `npm run lint:fix` | Autoarregla lo que ESLint pueda corregir.                                       |
| `npm run format`   | Prettier — formatea todo el repo.                                               |

## Modo desarrollo vs. modo producción

- **Desarrollo (`npm run dev`)**: Vite sirve los módulos ES nativos sin minimizar, con HMR y `displayName` activo en Styled Components para facilitar el debugging.
- **Producción (`npm run build`)**: ejecuta `tsc --noEmit` y después `vite build`, que genera el `dist/` con JS/CSS minificados, code-splitting por vendors (`react`, `query`, `styled`) y Styled Components con `minify: true` y `displayName: false`.

Para probarlo:

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
.
├── index.html                  # Entry HTML (Vite)
├── vite.config.ts              # Config Vite + code-splitting + babel styled-components
├── jest.config.ts              # Config Jest (jsdom, babel-jest)
├── babel.config.cjs            # Presets para Jest
├── .eslintrc.cjs / .prettierrc # Linter y formatter
├── tsconfig.json
└── src/
    ├── main.tsx                # Bootstrapping React
    ├── App.tsx                 # Providers (QueryClient, Theme, Cart) + Router
    ├── api/
    │   ├── config.ts           # Base URL y API key
    │   ├── http.ts             # Fetch wrapper + manejo de errores (inyecta x-api-key)
    │   └── products.ts         # fetchProducts, fetchProductById + normalizadores
    ├── contexts/
    │   └── CartContext.tsx     # Context API + useReducer + persistencia localStorage
    ├── hooks/
    │   ├── useProducts.ts      # Wrappers de React Query
    │   └── useDebouncedValue.ts
    ├── components/             # UI reutilizable (Navbar, Layout, ProductCard, SearchBar, …)
    ├── pages/
    │   ├── ProductsList/       # Vista 1 — listado + buscador
    │   ├── ProductDetail/      # Vista 2 — detalle con selectores
    │   └── Cart/               # Vista 3 — carrito
    ├── styles/                 # Theme + GlobalStyles + declaraciones de styled-components
    ├── utils/format.ts         # Formateo de precios
    ├── types/                  # Tipos compartidos
    └── __tests__/              # Suites de Jest
```

## Arquitectura y decisiones

### Gestión de estado
- **Carrito** → `CartContext` (`useReducer` + `useEffect` para persistir en `localStorage`). Expone `items`, `itemCount`, `totalPrice`, `addItem`, `removeItem`, `clear`. Cumple el requisito explícito: «Gestión de Estado: React Context API».
- **Datos remotos** → React Query. Se encarga de caché, deduplicación, `placeholderData` para mantener resultados previos durante búsquedas, y reintento automático. Evita el antipatrón de almacenar respuestas de la API en Context.

### Búsqueda en tiempo real por API
`ProductsList` usa `useDebouncedValue` (300 ms) y pasa el término al endpoint `/products?search=…`. React Query mantiene los resultados previos mientras llega la nueva respuesta para evitar parpadeos.

### Autenticación
`src/api/http.ts` añade `x-api-key` automáticamente a cada petición y unifica el manejo de errores con la clase `ApiError`.

### Normalización de la API
`src/api/products.ts` convierte la respuesta cruda (campos planos) a un modelo tipado (`ProductDetail` con `specs`, `colorOptions`, `storageOptions`, `similarProducts`). Si la API cambia nombres o devuelve `null`, las pantallas siguen funcionando gracias a los *fallbacks*.

### Accesibilidad
- Roles y `aria-*` en los selectores de color/almacenamiento (`role="radiogroup"` + `role="radio"` + `aria-checked`).
- `aria-live="polite"` en el contador de resultados y en el total del carrito.
- `aria-label` descriptivos en el carrito y en los enlaces del navbar.
- `:focus-visible` con contorno visible en todos los elementos interactivos.
- Helper `.sr-only` para títulos accesibles sin contaminación visual.

### Responsive
Se usan `@media` queries sobre `theme.breakpoints` (`sm 480 / md 768 / lg 1024 / xl 1280`). Cambia el número de columnas de la rejilla, los espaciados del carrito y el layout de la vista de detalle.

## Testing

Jest + React Testing Library + jsdom. Se cubren:

- `CartContext` — alta, baja, totales, persistencia y rehidratado desde `localStorage`.
- `SearchBar` — contador de resultados, estado de carga y eventos de tecleo.
- `ProductCard` — render de marca/nombre/precio y URL de destino.
- `StorageSelector` — `aria-checked` y callback de selección.
- `formatPrice` — formateo EUR y manejo de `NaN`.

```bash
npm test
```

## Checklist de requisitos

- [x] Vista listado con rejilla, 20 productos, imagen + nombre + marca + precio.
- [x] Buscador en tiempo real por nombre/marca vía API.
- [x] Contador de resultados.
- [x] Navbar con inicio y carrito (con badge de cantidad).
- [x] Carrito persistente (localStorage).
- [x] Vista detalle con imagen dinámica por color, selectores y precio actualizado.
- [x] Botón «Añadir al carrito» deshabilitado hasta elegir color y almacenamiento.
- [x] Sección «Productos similares».
- [x] Vista de carrito con eliminar, total y «Continuar comprando».
- [x] Responsive.
- [x] Accesibilidad.
- [x] Linter + formatter.
- [x] Modo desarrollo y modo producción.
- [x] Tests con Jest.
- [x] `x-api-key` en las peticiones.
- [x] Gestión de estado con Context API.
- [x] README detallado.
