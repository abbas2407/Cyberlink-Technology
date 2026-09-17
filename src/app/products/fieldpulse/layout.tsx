import React from 'react';

export const metadata = {
  title: 'FieldPulse — Field Operations Platform | Cyberlink Technology',
  description: 'A smart field operations SaaS platform by Cyberlink Technology. Track agent locations in real-time, enforce anti-fraud punch-in using face recognition, geofencing, and device verification.',
};

export default function FieldPulseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
