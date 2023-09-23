/* eslint-disable */
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';


const App = () => {
  
  return (
    
      <BrowserRouter>
        <Header />
        <Home />
        <Footer />
      </BrowserRouter>
    
  );
}

export default App;