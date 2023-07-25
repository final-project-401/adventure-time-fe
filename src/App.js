// import logo from './logo.svg';
import Home from './Components/AdventureHome';
import Header from './Components/Header';
import About from './Components/About';
import EventItem from './Components/EventItem';
import Contact from './Components/Contact';
// import Weather from './Components/Weather';
import Footer from './Components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Calendar from './Components/Calendar';
import Weather from './Components/Weather';
import Restaurants from './Components/Activities/food';
import Lodging from './Components/Activities/lodging';
import Recreation from './Components/Activities/fun';


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
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/lodging" element={<Lodging />} />
              <Route path="/recreation" element={<Recreation />} />
              <Route path="/event" element={<Calendar />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/weather" element={<Weather />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
