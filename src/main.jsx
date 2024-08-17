import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AuthProvider from './Providers/AuthProvider';
import PrivateRoutes from './Routes/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Root from './Layout/Root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes><Root></Root></PrivateRoutes>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      }
    ]
  },
  {
    path:"/login",
    element: <Login></Login>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
