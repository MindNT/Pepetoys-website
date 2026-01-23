# 🛒 Ejemplos de Uso - Sistema de Carrito

## 📚 Tabla de Contenidos
- [Uso Básico del CartContext](#uso-básico-del-cartcontext)
- [Componente Personalizado](#componente-personalizado)
- [Notificaciones Toast](#notificaciones-toast-futuro)
- [Validación de Stock](#validación-de-stock-futuro)
- [Checkout Process](#proceso-de-checkout-futuro)

---

## Uso Básico del CartContext

### Importar el Hook

```javascript
import { useCart } from '../context/CartContext';
```

### Ejemplo 1: Agregar Producto Simple

```javascript
function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, 1);
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAdd}>Agregar</button>
    </div>
  );
}
```

### Ejemplo 2: Agregar Múltiples Unidades

```javascript
function ProductDetail({ product }) {
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    openCart(); // Abre el carrito automáticamente
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <input 
        type="number" 
        value={quantity} 
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
      />
      <button onClick={handleAddToCart}>
        Agregar {quantity} al carrito
      </button>
    </div>
  );
}
```

### Ejemplo 3: Mostrar Contador en Badge

```javascript
function CartButton() {
  const { getTotalItems, openCart } = useCart();
  const count = getTotalItems();

  return (
    <button onClick={openCart} className="relative">
      <ShoppingCart />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {count}
        </span>
      )}
    </button>
  );
}
```

### Ejemplo 4: Lista de Items del Carrito

```javascript
function MiniCart() {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  return (
    <div>
      <h3>Tu Carrito ({cartItems.length} items)</h3>
      {cartItems.map(item => (
        <div key={item.id}>
          <span>{item.name} x {item.quantity}</span>
          <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
        </div>
      ))}
      <p>Total: ${getTotalPrice().toFixed(2)} MXN</p>
    </div>
  );
}
```

---

## Componente Personalizado

### Mini Carrito Flotante

```javascript
import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, X } from 'lucide-react';

function FloatingMiniCart() {
  const { cartItems, getTotalItems, openCart, removeFromCart } = useCart();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Mostrar brevemente cuando se agrega algo
    if (cartItems.length > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [cartItems.length]);

  if (!isVisible || cartItems.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-2xl rounded-lg p-4 w-80 z-50 animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold flex items-center gap-2">
          <ShoppingCart size={18} />
          Agregado al carrito
        </h4>
        <button onClick={() => setIsVisible(false)}>
          <X size={18} />
        </button>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600">
          {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
        </p>
      </div>

      <button 
        onClick={() => {
          setIsVisible(false);
          openCart();
        }}
        className="w-full bg-[#008F24] text-white py-2 rounded-full hover:bg-[#007520]"
      >
        Ver Carrito Completo
      </button>
    </div>
  );
}

export default FloatingMiniCart;
```

---

## Notificaciones Toast (Futuro)

### Sistema de Notificaciones al Agregar

```javascript
// toast.js - Sistema simple de toast
import React, { createContext, useContext, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className="bg-white shadow-lg rounded-lg p-4 flex items-center gap-3 min-w-[300px] animate-slide-down"
          >
            <CheckCircle className="text-green-500" size={24} />
            <span className="flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)}>
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Uso en CartContext:
const addToCart = (product, quantity = 1) => {
  // ... lógica existente ...
  addToast(`${product.name} agregado al carrito`, 'success');
};
```

---

## Validación de Stock (Futuro)

### Verificar Disponibilidad Antes de Agregar

```javascript
// En CartContext.jsx
const addToCart = async (product, quantity = 1) => {
  // Verificar stock disponible
  try {
    const response = await fetch(`/api/products/${product.id}/check-stock`);
    const { available, stock } = await response.json();
    
    if (!available || stock < quantity) {
      alert(`Solo hay ${stock} unidades disponibles`);
      return false;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        
        // Verificar que no exceda el stock
        if (newQuantity > stock) {
          alert(`No puedes agregar más de ${stock} unidades`);
          return prevItems;
        }
        
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error verificando stock:', error);
    alert('Error al verificar disponibilidad');
    return false;
  }
};
```

---

## Proceso de Checkout (Futuro)

### Componente de Checkout Completo

```javascript
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        customer: formData,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.priceNumber
        })),
        total: getTotalPrice(),
        timestamp: new Date().toISOString()
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        // Limpiar carrito
        clearCart();
        
        // Redirigir a página de confirmación
        window.location.href = `/order-confirmation/${result.orderId}`;
      } else {
        alert('Error al procesar la orden');
      }
    } catch (error) {
      console.error('Error en checkout:', error);
      alert('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulario */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            
            <input
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            
            <input
              type="tel"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            
            <textarea
              placeholder="Dirección de envío"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
              className="w-full px-4 py-2 border rounded-lg"
              rows="3"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Ciudad"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                required
                className="px-4 py-2 border rounded-lg"
              />
              
              <input
                type="text"
                placeholder="Código Postal"
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                required
                className="px-4 py-2 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#008F24] text-white py-3 rounded-full font-bold hover:bg-[#007520] disabled:bg-gray-400"
            >
              {loading ? 'Procesando...' : 'Confirmar Pedido'}
            </button>
          </form>
        </div>

        {/* Resumen del Pedido */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
          
          <div className="space-y-3 mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.priceNumber * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${getTotalPrice().toFixed(2)} MXN</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Envío:</span>
              <span>$100.00 MXN</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${(getTotalPrice() + 100).toFixed(2)} MXN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
```

---

## Cupones de Descuento (Futuro)

### Sistema de Cupones

```javascript
// En CartContext.jsx
const [coupon, setCoupon] = useState(null);

const applyCoupon = async (code) => {
  try {
    const response = await fetch(`/api/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, total: getTotalPrice() })
    });
    
    const result = await response.json();
    
    if (result.valid) {
      setCoupon({
        code: code,
        discount: result.discount,
        type: result.type // 'percentage' or 'fixed'
      });
      return { success: true, message: 'Cupón aplicado' };
    } else {
      return { success: false, message: 'Cupón inválido' };
    }
  } catch (error) {
    return { success: false, message: 'Error al validar cupón' };
  }
};

const getTotalWithDiscount = () => {
  const total = getTotalPrice();
  if (!coupon) return total;
  
  if (coupon.type === 'percentage') {
    return total * (1 - coupon.discount / 100);
  } else {
    return total - coupon.discount;
  }
};

// Componente para aplicar cupón
function CouponInput() {
  const { applyCoupon } = useCart();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleApply = async () => {
    const result = await applyCoupon(code);
    setMessage(result.message);
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Código de cupón"
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <button 
        onClick={handleApply}
        className="bg-[#008F24] text-white px-6 py-2 rounded-lg"
      >
        Aplicar
      </button>
      {message && <p className="text-sm mt-1">{message}</p>}
    </div>
  );
}
```

---

## Debug y Testing

### Ver Estado del Carrito en Tiempo Real

```javascript
// Componente de Debug (solo para desarrollo)
function CartDebugger() {
  const cart = useCart();

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-0 left-0 bg-black text-white p-4 text-xs font-mono max-w-md overflow-auto max-h-64">
      <h3 className="font-bold mb-2">🐛 Cart Debug</h3>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  );
}
```

---

**¡Estos ejemplos te ayudarán a extender el sistema de carrito según tus necesidades!** 🚀

