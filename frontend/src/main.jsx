import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ShopContextProvider } from './contexts/ShopContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
