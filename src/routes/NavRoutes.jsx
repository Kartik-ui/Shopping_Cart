import { Outlet } from 'react-router-dom';
import Navbar from 'src/components/Navbar';

const NavRoutes = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default NavRoutes;
