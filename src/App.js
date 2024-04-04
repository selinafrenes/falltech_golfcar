import '../src/styles/style.css';
import {Routes, Route, useNavigate, useLocation, redirect} from "react-router-dom";
import Navbar from './Navbar';
import Home from "./Pages/Home";
import Impressum from "./Pages/Impressum";
import Datenschutz from "./Pages/Datenschutz";
import Footer from "./Components/Footer";
import Tagebuch from "./Pages/Tagebuch";
import {useEffect, useState} from "react";
import Sponsor from "./Components/Sponsor";
import {getCookieValue} from "./script";


function App() {
    // authentifizierung für Tagebuch
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };


    useEffect(() => {
        //TODO mit db abfrage - evtl. optimieren ???
        const username = getCookieValue("username");
        if (username){
            setIsAuthenticated(true);
        }
    }, []);


  return (
      <>
          <Navbar/>
          <Routes>
              <Route exact path="/" element={<Home onLogin={handleLoginSuccess}/>} />
              <Route path="/tagebuch" element={isAuthenticated ? <Tagebuch /> : <Home onLogin={handleLoginSuccess} />}/>
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              {/* Definieren Sie weitere Routen hier */}
          </Routes>
          <Footer/>
      </>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('app'));
// root.render(<App />);
export default App;
