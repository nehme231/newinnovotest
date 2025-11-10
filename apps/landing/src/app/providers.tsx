'use client';

import { SonnerProvider, Toaster } from '@innovo/ui';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Toaster />
      <SonnerProvider />
    </div>
  );
};
