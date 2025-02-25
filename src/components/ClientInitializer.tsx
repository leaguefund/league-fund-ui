'use client';

import { useEffect } from 'react';
import { initializeSession } from '@/utils/session';

export default function ClientInitializer() {
  useEffect(() => {
    initializeSession();
  }, []);

  return null;
} 