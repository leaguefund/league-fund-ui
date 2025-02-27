'use client';

import React, { createContext, useContext, useState } from 'react';
import Notification from '@/components/ui/notification/Notification';

interface NotificationContextType {
  showNotification: (props: NotificationProps) => void;
}

interface NotificationProps {
  variant: "success" | "info" | "warning" | "error";
  title: string;
  description?: string;
  hideDuration?: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  const showNotification = (props: NotificationProps) => {
    setNotification(props);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <Notification {...notification} onClose={hideNotification} />
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
} 