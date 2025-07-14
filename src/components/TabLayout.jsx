import React from 'react';
import { Outlet } from 'react-router-dom';
import TabBar from './TabBar';

const TabLayout = () => {
  return (
    <div className="tab-layout">
      <div className="tab-content" style={{ paddingBottom: '60px' }}>
        <Outlet />
      </div>
      <TabBar />
    </div>
  );
};

export default TabLayout;
