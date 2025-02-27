'use client';

import React, { createContext, useContext, useState } from 'react';
import Notification from '@/components/ui/notification/Notification';

interface NotificationContextType {
  showNotification: (props: { 
    variant: "success" | "info" | "warning" | "error";
    title: string;
    description?: string;
    hideDuration?: number;
  }) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<{
    visible: boolean;
    props: {
      variant: "success" | "info" | "warning" | "error";
      title: string;
      description?: string;
      hideDuration?: number;
    };
  } | null>(null);

  const showNotification = (props: {
    variant: "success" | "info" | "warning" | "error";
    title: string;
    description?: string;
    hideDuration?: number;
  }) => {
    setNotification({ visible: true, props });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification?.visible && (
        <div className="fixed bottom-4 right-4 z-50">
          <Notification {...notification.props} />
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