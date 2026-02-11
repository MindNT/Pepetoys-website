import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

console.log('🚀 Main.jsx cargado y ejecutándose...');
import { CartProvider } from './context/CartContext.jsx'

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', fontFamily: 'monospace' }}>
          <h1>Error en la aplicación</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Log that the app is starting
console.log('App starting...');
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('Mode:', import.meta.env.MODE);
console.log('User Agent:', navigator.userAgent);
console.log('Screen:', window.screen.width, 'x', window.screen.height);
console.log('Window:', window.innerWidth, 'x', window.innerHeight);

// Verify root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found</div>';
} else {
  console.log('Root element found, rendering app...');

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <HashRouter>
            <CartProvider>
              <App />
            </CartProvider>
          </HashRouter>
        </ErrorBoundary>
      </React.StrictMode>,
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: monospace; background: white; min-height: 100vh;">
        <h1>Error al cargar la aplicación</h1>
        <pre>${error.toString()}</pre>
        <p>Revisa la consola para más detalles.</p>
      </div>
    `;
  }
}


