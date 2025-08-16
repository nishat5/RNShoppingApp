// ContextWrapper.js
import React from 'react';
import { AuthProvider } from './authContext';
import { CartProvider } from './cartContext';

// This wraps both providers into a single component
export const ContextWrapper = ({ children }) => {
  return (
    <CartProvider>
      <AuthProvider>{children}</AuthProvider>
    </CartProvider>
  );
};
