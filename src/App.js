import { Outlet } from 'react-router-dom';
import NavBar from './components/shared/NavBar/NavBar';
import Carousel from './components/shared/Carousel/Carousel';
import Footer from './components/shared/Footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <NavBar />

      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Footer />
    </div>
  );
}

export default App;
