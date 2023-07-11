import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from './Promo/Promo';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';


const Main = () => {
  return (
    <div className='main'>
      <Header />
      <Promo />
      <AboutProject />
      <Techs  />
      <AboutMe />
      <Portfolio />
      <Footer />
    </div>
  );
};

export default Main;