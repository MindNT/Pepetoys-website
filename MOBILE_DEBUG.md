# 🔧 Guía de Depuración para Móvil

## Problema Actual
La página se ve en **blanco en dispositivos móviles** pero funciona correctamente en PC.

## ✅ Cambios Realizados

### 1. **Mejoras en el CSS** (`src/index.css`)
- ✅ Agregado `overflow-x-hidden` para prevenir scroll horizontal
- ✅ Agregado `-webkit-text-size-adjust: 100%` para Safari iOS
- ✅ Agregado `-webkit-tap-highlight-color: transparent` para mejor UX
- ✅ Agregado `min-height: -webkit-fill-available` para compatibilidad iOS

### 2. **Mejoras en el HTML** (`index.html`)
- ✅ Mejorado el viewport meta tag con `viewport-fit=cover`
- ✅ Corregida la ruta del favicon de absoluta a relativa

### 3. **Manejo de Errores** (`src/main.jsx`)
- ✅ Agregado ErrorBoundary para capturar errores de React
- ✅ Agregado manejador global de errores JavaScript
- ✅ Agregado manejador de promesas rechazadas
- ✅ Agregado logging para depuración

## 🔍 Cómo Depurar en Móvil

### Opción 1: Usar DevTools Remotos (Recomendado)

#### Para Android + Chrome:
1. En tu celular Android, habilita "Depuración USB" en Opciones de Desarrollador
2. Conecta el celular a la PC con USB
3. En Chrome de PC, ve a `chrome://inspect`
4. Abre la página en Chrome del celular
5. Haz clic en "Inspect" para ver la consola y errores

#### Para iPhone + Safari:
1. En iPhone: Settings > Safari > Advanced > Web Inspector (activar)
2. En Mac: Safari > Preferences > Advanced > Show Develop menu
3. Conecta el iPhone a la Mac
4. En Safari Mac: Develop > [Tu iPhone] > [Tu página]

### Opción 2: Ver Errores en el Dispositivo

1. Abre la página en tu celular
2. Si hay un error de JavaScript, verás un mensaje rojo en la pantalla
3. Toma una captura de pantalla y compártela

### Opción 3: Usar Eruda (Console en Móvil)

Agrega esto temporalmente al `index.html` antes de `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
```

Esto mostrará una consola flotante en el móvil.

## 🚀 Pasos para Desplegar y Probar

1. **Hacer commit de los cambios:**
```bash
git add .
git commit -m "fix: mobile rendering improvements"
git push origin main
```

2. **Esperar el deploy** (2-3 minutos)
   - Ve a: https://github.com/TU_USUARIO/Pepetoys-website/actions
   - Verifica que el workflow "Deploy static content to Pages" se complete

3. **Probar en móvil:**
   - Abre: `https://TU_USUARIO.github.io/Pepetoys-website/`
   - Si sigue en blanco, usa las opciones de depuración arriba

## 🐛 Posibles Causas del Problema

### 1. **Error de JavaScript**
- **Síntoma:** Pantalla completamente en blanco
- **Solución:** Revisar la consola del navegador (ver métodos arriba)

### 2. **Problema con las Rutas**
- **Síntoma:** Imágenes no cargan, CSS no se aplica
- **Verificar:** Que `base: '/Pepetoys-website/'` esté en `vite.config.js`
- **Verificar:** Que las imágenes usen `import.meta.env.BASE_URL`

### 3. **Problema de Viewport**
- **Síntoma:** Contenido se sale de la pantalla
- **Solución:** Ya implementada en los cambios recientes

### 4. **Problema de Memoria en Móvil**
- **Síntoma:** Página carga lento o se congela
- **Solución:** Optimizar imágenes (las actuales son grandes)

### 5. **Cache del Navegador**
- **Síntoma:** Cambios no se reflejan
- **Solución:** Limpiar cache o usar modo incógnito

## 📱 Verificación Rápida

Abre esta URL en tu móvil para ver si hay errores:
```
https://TU_USUARIO.github.io/Pepetoys-website/
```

Si ves texto rojo con "Error en la aplicación", toma captura y comparte el mensaje.

## 🔄 Próximos Pasos

1. **Hacer push de los cambios**
2. **Esperar el deploy**
3. **Probar en móvil**
4. **Si sigue en blanco:** Usar depuración remota para ver errores exactos
5. **Reportar:** Compartir el error específico que aparece en la consola

## 💡 Tips Adicionales

- **Limpiar cache:** En móvil, usa modo incógnito para evitar cache
- **Probar en diferentes navegadores:** Chrome, Safari, Firefox
- **Verificar conexión:** Asegúrate de tener buena conexión a internet
- **Tamaño de imágenes:** Las imágenes actuales son grandes (11MB+), considera optimizarlas

## 📞 Si Necesitas Ayuda

Comparte:
1. Captura de pantalla del error (si aparece)
2. Modelo de tu celular y navegador
3. Resultado de la depuración remota (si la usaste)
