
import React from 'react';
import Sidebar from './Sidebar';
import OrganizationSidebar from './OrganizationSidebar'



interface DashboardLayProps {
  children: React.ReactNode;
}

const DashboardLay: React.FC<DashboardLayProps> = ({ children }) => {
  return (
    < OrganizationSidebar>
      {children}
    </OrganizationSidebar>
  );
};

export default DashboardLay;
