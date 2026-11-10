import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

/**
 * Genera la clave única de un item del carrito.
 * Los productos con modelo (Lin Economico) se distinguen por id + modelo,
 * de modo que el mismo producto con modelos distintos son líneas separadas.
 */
export const getCartItemKey = (item) => {
  if (!item) return '';
  const modelo = item.modelo ?? null;
  return modelo ? `${item.id}-M${modelo}` : String(item.id);
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  // Compra directa: artículo que se paga de inmediato SIN pasar por el carrito
  // (ej. la "Caja navideña"). Mientras exista, el flujo de cobro usa solo este artículo.
  const [directBuyItem, setDirectBuyItem] = useState(null);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('pepetoysCart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    try {
      localStorage.setItem('pepetoysCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  }, [cartItems]);

  // Mostrar notificación toast
  const showToast = (message) => {
    setToast(message);
  };

  const hideToast = () => {
    setToast(null);
  };

  // Agregar producto al carrito
  // modelo: opcional, para productos Lin Economico ('1'-'6')
  const addToCart = (product, quantity = 1, modelo = null) => {
    setCartItems(prevItems => {
      const itemKey = getCartItemKey({ id: product.id, modelo });
      const existingItem = prevItems.find(item => getCartItemKey(item) === itemKey);
      const modeloLabel = modelo ? ` (Modelo ${modelo})` : '';

      if (existingItem) {
        // Si existe (mismo id + mismo modelo), incrementar cantidad
        showToast(`${product.name}${modeloLabel} (x${quantity}) agregado al carrito`);
        return prevItems.map(item =>
          getCartItemKey(item) === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, agregar nuevo
        showToast(`${product.name}${modeloLabel} agregado al carrito`);
        return [...prevItems, {
          ...product,
          quantity,
          modelo: modelo ?? null,
          // Asegurar que tenemos el precio como número
          priceNumber: typeof product.price === 'number'
            ? product.price
            : parseFloat(product.price?.toString().replace(/[^0-9.-]+/g, '') || 0)
        }];
      }
    });
  };

  // Eliminar producto del carrito (por clave única id+modelo)
  const removeFromCart = (itemKey) => {
    setCartItems(prevItems => prevItems.filter(item => getCartItemKey(item) !== String(itemKey)));
  };

  // Actualizar cantidad de un producto (por clave única id+modelo)
  const updateQuantity = (itemKey, amount) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (getCartItemKey(item) === String(itemKey)) {
          const newQuantity = item.quantity + amount;
          // No permitir cantidades menores a 1
          if (newQuantity < 1) {
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  // Limpiar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Iniciar compra directa (pagar de inmediato, sin agregar al carrito)
  const startDirectBuy = (product, quantity = 1) => {
    setDirectBuyItem({
      ...product,
      quantity,
      modelo: null,
      // Asegurar que tenemos el precio como número (igual que en addToCart)
      priceNumber: typeof product.price === 'number'
        ? product.price
        : parseFloat(product.price?.toString().replace(/[^0-9.-]+/g, '') || 0)
    });
  };

  // Cancelar/limpiar la compra directa
  const cancelDirectBuy = () => {
    setDirectBuyItem(null);
  };

  // Obtener cantidad total de items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener precio total
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.priceNumber || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  // Abrir/cerrar carrito
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const value = {
    cartItems,
    isCartOpen,
    toast,
    directBuyItem,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    startDirectBuy,
    cancelDirectBuy,
    getTotalItems,
    getTotalPrice,
    openCart,
    closeCart,
    toggleCart,
    showToast,
    hideToast
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

