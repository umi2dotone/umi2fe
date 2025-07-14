import { Outlet } from 'react-router-dom';
import TabBar from './TabBar';

const TabLayout = () => {
  return (
    <div>
      <div style={{ paddingBottom: '60px' }}>
        <Outlet />
      </div>
      <TabBar />
    </div>
  );
};

export default TabLayout;
