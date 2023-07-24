// import logo from './logo.svg';
import Home from './Components/AdventureHome';
import Header from './Components/Header';
import About from './Components/About';
import EventItem from './Components/EventItem';
// import Contact from './Components/Contact';
// import Weather from './Components/Weather';
import Footer from './Components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Calendar from './Components/Calendar';
import Weather from './Components/Weather';
import Activities from './Components/Activities';


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
              <Route path="/activities" element={<Activities />} />
              <Route path="/sales-info" element={<EventItem />} />
              <Route path="/place-order" element={<Weather />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
