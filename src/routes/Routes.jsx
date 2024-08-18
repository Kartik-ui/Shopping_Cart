import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from 'src/App';
import Cart from 'src/pages/Cart';
import NavRoutes from './NavRoutes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<NavRoutes />}>
      <Route path="/" element={<App />} />
      <Route path="/cart" element={<Cart />} />
    </Route>
  )
);

export { router };
