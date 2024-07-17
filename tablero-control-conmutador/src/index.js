import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(<StrictMode>
  <App />
</StrictMode>);