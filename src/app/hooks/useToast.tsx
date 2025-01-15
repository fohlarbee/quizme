"use client"
import React, { createContext, useContext, useState, useCallback } from 'react';
import CustomToast from '../components/CustomToast';

interface Toast {
  id: number;
  title: string;
  description: string;
  variant: 'success' | 'error' | 'info';
}

interface ToastContextProps {
  addToast: (toast: Omit<Toast, 'id'>) => void;
}
interface ToastProviderProps {
    children: React.ReactNode;
  }
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, 3000); // Hide after 3 seconds
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toastWrapper">
        {toasts.map((toast) => (
          <CustomToast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};