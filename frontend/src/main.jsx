import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import App from './App.jsx';
import { NotificationProvider } from './components/NotificationContext'; 

// Set default URL untuk Axios
axios.defaults.baseURL = 'http://127.0.0.1:5000';

// Interceptor untuk menyisipkan token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Render root dengan NotificationProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider> 
        <App />
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);
