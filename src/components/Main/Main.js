import React from 'react';
import './Main.css';
import Promo from './Promo/Promo';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Main = ({ loggedIn }) => {
  return (
    <>
      <Header isMain={true} loggedIn={loggedIn} />
      <main className='main'>
        <Promo />
        <AboutProject />
        <Techs  />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};

export default Main;