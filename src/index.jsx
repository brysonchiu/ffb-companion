import React from 'react';
import { createRoot } from 'react-dom/client'; // Notice the '/client' import path
import App from './App';
import './styles/main.scss';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
