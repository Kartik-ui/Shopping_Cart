import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from 'src/context/Context';
import { router } from 'src/routes/Routes.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </Context>
  </StrictMode>
);
