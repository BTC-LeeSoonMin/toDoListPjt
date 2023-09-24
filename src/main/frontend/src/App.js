/* eslint-disable */
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardModify from './pages/CardModify';


const App = () => {

  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/card/card_modify/:cNo" element={<CardModify />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>

  );
}

export default App;