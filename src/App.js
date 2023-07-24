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


function App() {

  return (

    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<About />} />
          <Route path="/event" element={<EventItem />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/forecast" element={<Weather />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
