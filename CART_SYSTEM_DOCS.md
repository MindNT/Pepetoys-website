# 🛒 Sistema de Carrito de Compras - Pepe's Toys

## 📋 Descripción General

Sistema completo de carrito de compras implementado para el e-commerce de juguetes para aves "Pepe's Toys", siguiendo estrictamente el sistema de diseño establecido.

## 🎨 Sistema de Diseño Implementado

### Colores
- **Rosa/Rojo (#E11D48)**: Botón "Mi carrito" y elementos de acción principal
- **Verde (#008F24)**: Botones de agregar, controles de cantidad, checkout
- **Azul Oscuro (#1A237E)**: Header del drawer, textos importantes, totales
- **Amarillo (#FFD700)**: Badge contador del carrito
- **Blanco/Grises**: Fondos y textos secundarios

### Formas
- **Botones**: Border-radius completo (rounded-full) para estilo pill
- **Tarjetas**: Border-radius moderado (15px)
- **Sombras**: Suaves y sutiles para profundidad

## 🏗️ Arquitectura del Sistema

### 1. CartContext (`src/context/CartContext.jsx`)

**Contexto global** que maneja todo el estado del carrito.

#### Estado:
- `cartItems`: Array de productos en el carrito
- `isCartOpen`: Estado de visibilidad del drawer

#### Funciones:
- `addToCart(product, quantity)`: Agrega o incrementa cantidad
- `removeFromCart(productId)`: Elimina producto del carrito
- `updateQuantity(productId, amount)`: Incrementa/decrementa cantidad
- `clearCart()`: Vacía el carrito
- `getTotalItems()`: Retorna cantidad total de items
- `getTotalPrice()`: Calcula precio total
- `openCart()`, `closeCart()`, `toggleCart()`: Controla visibilidad

#### Persistencia:
- ✅ Guarda automáticamente en `localStorage` con clave `pepetoysCart`
- ✅ Restaura el carrito al recargar la página
- ✅ Maneja errores de localStorage gracefully

### 2. CartDrawer (`src/components/cart/CartDrawer.jsx`)

**Panel lateral deslizable** que muestra el contenido del carrito.

#### Características:
- ✅ **Animación suave**: Slide-in desde la derecha con backdrop
- ✅ **Responsive**: 100% ancho en móvil, 450px en desktop
- ✅ **Header azul oscuro**: Con título y botón cerrar
- ✅ **Lista scrolleable**: Items del carrito con imagen, nombre, precio
- ✅ **Controles de cantidad**: Botones +/- con diseño circular verde
- ✅ **Botón eliminar**: Icono de basurero por item
- ✅ **Footer fijo**: Subtotal, total de items, total grande
- ✅ **Botón Checkout**: Botón verde pill grande
- ✅ **Estado vacío**: Mensaje amigable cuando no hay items

### 3. Header Actualizado (`src/components/layout/Header.jsx`)

#### Mejoras:
- ✅ **Badge contador**: Círculo amarillo con borde blanco
- ✅ **Animación pulse**: El badge pulsa para llamar atención
- ✅ **Número dinámico**: Muestra cantidad de items (máx "9+")
- ✅ **Click handler**: Abre el CartDrawer al hacer clic

### 4. ProductModal Conectado (`src/components/common/ProductModal.jsx`)

#### Mejoras:
- ✅ **Botón "Agregar al Carrito"**: Incluye icono de carrito
- ✅ **Feedback visual**: Animación de scale al agregar
- ✅ **Flujo automático**: Cierra modal y abre carrito tras agregar
- ✅ **Cantidad configurable**: Respeta la cantidad seleccionada

### 5. CategoryPage Mejorada (`src/components/pages/CategoryPage.jsx`)

#### Nueva Funcionalidad:
- ✅ **Botón Quick Add**: Botón circular flotante en esquina superior derecha
- ✅ **Icono Plus/Check**: Cambia a check verde al agregar exitosamente
- ✅ **Hover effect**: Scale y cambio de color al pasar mouse
- ✅ **No interfiere**: No bloquea acceso al botón "Detalles"

## 🚀 Uso del Sistema

### Para Desarrolladores

#### 1. Usar el CartContext en cualquier componente:

```javascript
import { useCart } from '../context/CartContext';

function MiComponente() {
  const { 
    addToCart, 
    cartItems, 
    getTotalItems, 
    openCart 
  } = useCart();

  // Agregar producto
  const handleAdd = () => {
    addToCart(product, 1);
  };

  return (
    <button onClick={handleAdd}>
      Agregar ({getTotalItems()})
    </button>
  );
}
```

#### 2. Estructura de un producto en el carrito:

```javascript
{
  id: number,
  name: string,
  price: string | number,
  priceNumber: number,  // Calculado automáticamente
  image: string,
  description: string,
  quantity: number,
  // ... otros campos del producto
}
```

## 📱 Experiencia de Usuario

### Flujo de Compra:

1. **Usuario ve productos** en CategoryPage
2. **Opción A - Quick Add**: 
   - Click en botón "+" en tarjeta
   - Feedback visual inmediato (check verde)
   - Producto agregado al carrito
3. **Opción B - Con detalles**:
   - Click en "Detalles"
   - Modal se abre con info completa
   - Ajusta cantidad deseada
   - Click "Agregar al Carrito"
   - Modal cierra, carrito se abre automáticamente
4. **En el carrito**:
   - Ve todos sus productos
   - Ajusta cantidades con +/-
   - Elimina items no deseados
   - Ve total actualizado en tiempo real
5. **Finaliza compra**:
   - Click en "Finalizar Compra"
   - (Pendiente: implementar checkout)

## ✨ Características Destacadas

- 🎯 **Persistencia**: No pierde el carrito al recargar
- 🚀 **Performance**: Optimizado con React Context
- 📱 **Responsive**: Funciona perfecto en móvil y desktop
- 🎨 **Diseño coherente**: 100% fiel al style guide
- ♿ **Accesible**: Botones con aria-labels
- 🔄 **Feedback visual**: Animaciones suaves y confirmaciones
- 🛡️ **Robusto**: Maneja errores y casos edge

## 🔧 Configuración

El sistema está **listo para usar** sin configuración adicional. El `CartProvider` está integrado en `main.jsx` y envuelve toda la aplicación.

## 📦 Archivos Creados/Modificados

### Creados:
- `src/context/CartContext.jsx` - Contexto global del carrito
- `src/components/cart/CartDrawer.jsx` - Panel lateral del carrito

### Modificados:
- `src/main.jsx` - Agregado CartProvider
- `src/App.jsx` - Agregado CartDrawer global
- `src/components/layout/Header.jsx` - Badge y funcionalidad
- `src/components/common/ProductModal.jsx` - Botón agregar conectado
- `src/components/pages/CategoryPage.jsx` - Botón quick add

## 🎯 Próximos Pasos Sugeridos

1. **Implementar checkout real**: Conectar con backend/pasarela de pago
2. **Agregar validación de stock**: Verificar disponibilidad antes de agregar
3. **Cupones de descuento**: Sistema de códigos promocionales
4. **Envío**: Calculadora de costos de envío
5. **Favoritos**: Sistema de wishlist
6. **Notificaciones toast**: Feedback más elaborado al agregar items

## 🐛 Debugging

### LocalStorage Key:
- **Clave**: `pepetoysCart`
- **Formato**: JSON array de productos

### Limpiar carrito manualmente:
```javascript
localStorage.removeItem('pepetoysCart');
window.location.reload();
```

### Ver contenido del carrito en consola:
```javascript
console.log(JSON.parse(localStorage.getItem('pepetoysCart')));
```

## 📝 Notas Técnicas

- El precio se extrae y convierte a número automáticamente para cálculos
- Las imágenes fallback a `shopping.jpg` si no hay URL válida
- El drawer tiene z-index 50 para estar sobre todo el contenido
- Las animaciones usan Tailwind transitions para consistencia
- El badge desaparece completamente cuando cart está vacío

---

**Desarrollado con ❤️ para Pepe's Toys** 🦜

