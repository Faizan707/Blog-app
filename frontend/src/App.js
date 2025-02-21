import './App.css';
import { router } from './Routes/BrowerRoutes';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={5000} style={{ zIndex: 99999 }} /> 

    </>
  );
}

export default App;
