import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Aquí puedes añadir estilos globales si es necesario, aunque en este caso
// todo el CSS se maneja con clases de Tailwind.

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
