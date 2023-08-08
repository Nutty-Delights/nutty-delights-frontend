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
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
