# Pepe's Toys

## Instalación

```bash
npm install
```

## Desarrollo Local

```bash
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## Build para Producción

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist/`.

## Preview de Producción

```bash
npm run preview
```

## Deploy

### GitHub Pages

1. Ejecuta `npm run build`
2. Sube la carpeta `dist/` a la rama `gh-pages` de tu repositorio

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

1. Ejecuta `npm run build`
2. Sube la carpeta `dist/` a Netlify

## Tecnologías

- React 18
- Vite
- Tailwind CSS
- React Router

## Estructura

- `src/components/` - Componentes React
- `src/services/` - Servicios API
- `src/context/` - Contextos de React
- `public/` - Archivos estáticos
