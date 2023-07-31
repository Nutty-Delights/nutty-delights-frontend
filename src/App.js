import { Outlet } from 'react-router-dom';
import NavBar from './components/shared/NavBar/NavBar';
import Carousel from './components/shared/Carousel/Carousel';
import Footer from './components/shared/Footer/Footer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
