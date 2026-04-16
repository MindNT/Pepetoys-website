# 🔧 Solución para GitHub Pages - Página en Blanco

## Problemas Identificados y Solucionados

### ✅ 1. Archivo .nojekyll
- **Problema**: GitHub Pages usa Jekyll por defecto, que puede causar problemas con archivos que empiezan con `_`
- **Solución**: Se agregó un plugin en `vite.config.js` que copia automáticamente `.nojekyll` a la carpeta `dist` durante el build

### ✅ 2. Configuración de Base URL
- **Verificado**: El repositorio se llama `Pepetoys-website` y el `base` en `vite.config.js` está correcto: `/Pepetoys-website/`

### ✅ 3. Workflow de GitHub Actions
- **Estado**: El workflow está correctamente configurado para:
  - Construir el proyecto con `npm run build`
  - Desplegar la carpeta `dist/` a GitHub Pages

## 📋 Pasos para Solucionar el Problema

### Paso 1: Reconstruir el proyecto localmente
```bash
npm run build
```

Esto generará la carpeta `dist/` con el archivo `.nojekyll` incluido.

### Paso 2: Verificar que .nojekyll esté en dist
```bash
# En Windows PowerShell:
Test-Path "dist\.nojekyll"
# Debe devolver: True
```

### Paso 3: Hacer commit y push
```bash
git add .
git commit -m "fix: agregar .nojekyll automáticamente en build para GitHub Pages"
git push origin main
```

### Paso 4: Verificar el despliegue
1. Ve a: https://github.com/MindNT/Pepetoys-website/actions
2. Espera a que el workflow "Deploy static content to Pages" se complete
3. Ve a: https://mindnt.github.io/Pepetoys-website/

## 🔍 Verificación Adicional

Si la página sigue en blanco después de estos pasos:

### 1. Verificar la consola del navegador
- Abre las herramientas de desarrollador (F12)
- Ve a la pestaña "Console"
- Busca errores en rojo
- Comparte los errores si los hay

### 2. Verificar la pestaña Network
- En las herramientas de desarrollador, ve a "Network"
- Recarga la página
- Busca archivos con estado 404 (no encontrado)
- Verifica que los archivos JS y CSS se carguen correctamente

### 3. Verificar la URL
- Asegúrate de estar visitando: `https://mindnt.github.io/Pepetoys-website/`
- No uses `http://` (debe ser `https://`)
- No olvides la barra final `/`

### 4. Limpiar caché
- Presiona `Ctrl + Shift + R` (o `Cmd + Shift + R` en Mac) para recargar sin caché
- O usa modo incógnito

## 🐛 Problemas Comunes

### Error: "Failed to load resource"
- **Causa**: Las rutas de los assets no coinciden
- **Solución**: Verifica que `base: '/Pepetoys-website/'` en `vite.config.js` coincida con el nombre del repositorio

### Error: "404 Not Found" en archivos JS/CSS
- **Causa**: El build no se hizo correctamente o los archivos no se subieron
- **Solución**: 
  1. Verifica que el workflow de GitHub Actions se haya completado
  2. Revisa que la carpeta `dist/` tenga los archivos `index.html`, `assets/`, etc.

### Página completamente en blanco sin errores
- **Causa**: Error de JavaScript que no se muestra
- **Solución**: 
  1. Abre la consola del navegador
  2. Busca cualquier mensaje de error
  3. Verifica que `index.html` tenga la referencia correcta al archivo JS

## 📞 Si el Problema Persiste

Comparte:
1. Captura de pantalla de la consola del navegador (si hay errores)
2. Captura de pantalla de la pestaña Network (mostrando qué archivos fallan)
3. La URL exacta que estás visitando
4. El resultado del workflow de GitHub Actions (si falló)

