# 🦜 Pepe's Toys - Landing Page

Landing page moderna y profesional para Pepe's Toys, especialistas en productos para aves.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.6-38bdf8)

## 🚀 Tech Stack

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server ultra rápido
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Iconos modernos

## 📋 Características

- ✅ Diseño pixel-perfect basado en referencia visual
- ✅ 100% Responsive (Mobile, Tablet, Desktop)
- ✅ Optimizado para SEO
- ✅ Meta tags completos (Open Graph, Twitter)
- ✅ PWA Ready (manifest.json)
- ✅ Performance optimizado
- ✅ Código limpio y mantenible
- ✅ Arquitectura escalable

## 🎨 Estructura del Proyecto

```
pepes-toys/
├── public/              # Archivos estáticos
│   ├── favicon.svg      # Favicon
│   ├── robots.txt       # SEO - Crawlers
│   ├── sitemap.xml      # SEO - Sitemap
│   └── manifest.json    # PWA Manifest
├── src/
│   ├── assets/          # Imágenes y recursos
│   ├── components/
│   │   ├── common/      # Componentes reutilizables
│   │   │   ├── Button.jsx
│   │   │   └── CollectionCard.jsx
│   │   ├── layout/      # Componentes de layout
│   │   │   └── Header.jsx
│   │   └── sections/    # Secciones de la página
│   │       ├── Hero.jsx
│   │       └── Collections.jsx
│   ├── constants/       # Constantes y configuración
│   │   └── index.js
│   ├── data/            # Datos mock
│   │   └── mockData.js
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── index.html           # HTML principal con SEO
├── package.json
├── tailwind.config.js   # Configuración Tailwind
└── vite.config.js       # Configuración Vite
```

## 🛠️ Instalación

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos

```bash
# 1. Clonar el repositorio
git clone [URL_DEL_REPO]
cd pepes-toys

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# El proyecto estará disponible en http://localhost:5173
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción (carpeta dist/)
npm run preview      # Vista previa de la build de producción
```

## 🎯 Secciones Implementadas

### 1. Header/Navbar
- Navegación central: LOROS, ALIMENTOS, JUGUETES, AVIARIOS
- Botón "Mi carrito" (magenta)
- Botón "Contactar" (WhatsApp verde)
- Borde inferior sutil
- Transparente sobre el Hero

### 2. Hero Section
- Logo grande "PEPE'S TOYS" a la izquierda
- Imagen de fondo (loro/guacamayo)
- Título: "Alegría natural para tus aves"
- Subtítulos descriptivos
- CTA: "Explorar colecciones"
- Degradado para legibilidad

### 3. Sección Colecciones
- Título con emoji de loro 🦜
- Grid responsivo (1-5 columnas)
- Cards con:
  - Imagen
  - Nombre "Voladeras"
  - Barra verde inferior
  - Icono de flecha con hover
  - Efecto hover scale

## 🎨 Paleta de Colores

```js
{
  brandGreen: '#008F24',    // Verde principal (CTAs)
  darkGreen: '#005114',     // Verde oscuro (Iconos)
  magentaDark: '#A41262',   // Magenta (Carrito)
  accentPink: '#EE193F',    // Rosa/Rojo (Títulos)
  whatsappGreen: '#25D366', // Verde WhatsApp (Contactar)
}
```

## 📱 Responsividad

| Breakpoint | Ancho | Columnas Grid |
|------------|-------|---------------|
| Mobile     | < 640px | 1 columna |
| Tablet     | 640px+ | 2 columnas |
| Desktop    | 1024px+ | 3 columnas |
| Large      | 1280px+ | 5 columnas |

## 🔧 Configuración Personalizable

### Textos
Edita `src/constants/index.js`:
```js
export const HERO_CONTENT = {
  title: 'Tu título aquí',
  titleAccent: 'tu acento aquí',
  // ...
};
```

### Colecciones
Edita `src/data/mockData.js`:
```js
export const collections = [
  {
    id: 1,
    name: 'Nombre',
    image: 'URL_IMAGEN',
  },
];
```

### Colores
Edita `tailwind.config.js`:
```js
colors: {
  magenta: { dark: '#A41262' },
  whatsapp: { green: '#25D366' },
  brand: { 
    green: '#008F24',
    'green-dark': '#005114'
  },
  pink: { primary: '#EE193F' },
}
```

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Subir carpeta dist/ a Netlify
```

## 📝 Pendientes para Producción

- [ ] Imágenes reales del cliente
- [ ] Logo vectorial real de Pepe's Toys
- [ ] Funcionalidad del carrito
- [ ] Link de WhatsApp real
- [ ] Más secciones (Sobre nosotros, Testimonios)
- [ ] Footer con información de contacto
- [ ] Formulario de contacto
- [ ] Google Analytics
- [ ] Tests

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Estilos no se aplican
Verifica que `index.css` contenga:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 📄 Licencia

Privado - Pepe's Toys © 2025

## 👨‍💻 Desarrollado por

[Tu Nombre/Empresa]

---

**Versión:** 1.0.0  
**Última actualización:** Enero 2025


