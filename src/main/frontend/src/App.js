/* eslint-disable */
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardModify from './pages/CardModify';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';


const App = () => {
  
  // const [isMember, setIsMember] = useState(false);
  // useEffect(() => {
  //   console.log("[Header] useEffect CALLED!!")

  //   axios.get("/api/member/loginCheck",
  //     config,
  //   )
  //     .then(response => {
  //       console.log(response.data)
  //       if (response.date > 0) {
  //         setIsMember(true)
  //       }

  //     }
  //     )
  //     .catch(error => console.log(error))

  // }, [])


  return (

    <BrowserRouter>
      <RecoilRoot>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/card/card_modify/:cNo" element={<CardModify />}></Route>
          <Route path="/member/sign_up" element={<SignUp />}></Route>
          <Route path="/member/sign_in" element={<SignIn />}></Route>
        </Routes>
        <Footer />
      </RecoilRoot>
    </BrowserRouter>

  );
}

export default App;