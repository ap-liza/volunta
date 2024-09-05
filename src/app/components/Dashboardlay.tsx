
import React from 'react';
import Sidebar from '../components/Sidebar';

interface DashboardLayProps {
  children: React.ReactNode;
}

const DashboardLay: React.FC<DashboardLayProps> = ({ children }) => {
  return (
    <Sidebar>
      {children}
    </Sidebar>
  );
};

export default DashboardLay;
