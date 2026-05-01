import PatientModal from '@/features/patient/components/details/ PatientModal';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <PatientModal>{children}</PatientModal>;
}

export default Layout;
