import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {SnackbarProvider } from "notistack";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider>
    <App />
    </SnackbarProvider>
  </React.StrictMode>
);
