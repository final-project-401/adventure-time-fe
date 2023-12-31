// import logo from './logo.svg';
import Home from './Components/AdventureHome';
import Header from './Components/Header';
import About from './Components/About';
import Events from './Components/Events';
import Footer from './Components/Footer';
import Restaurants from './Components/Activities/food';
import Lodging from './Components/Activities/lodging';
import Recreation from './Components/Activities/fun';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <>
    
      <BrowserRouter>

        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight: '100vh'}}>
          <Header />
          <div style={{flexGrow:1}}>
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
      </BrowserRouter>
    </>
  );
};

export default App;
