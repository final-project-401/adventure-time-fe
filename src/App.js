import Header from './Components/Header'
import Footer from './Components/Footer'
import About from './Components/About';
// import EventForm from './Components/EventForm';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" component={} /> */}
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
