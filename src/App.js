import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/AdventureHome';
import About from './Components/About';
import Events from './Components/Events';
import Restaurants from './Components/Activities/food';
import Lodging from './Components/Activities/lodging';
import Recreation from './Components/Activities/fun';

function App() {
  return (
    <>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh' }}>
          <Header />
          <div style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/lodging" element={<Lodging />} />
              <Route path="/recreation" element={<Recreation />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
