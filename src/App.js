import '../src/styles/style.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from "./Pages/Home";
import Impressum from "./Pages/Impressum";
import Datenschutz from "./Pages/Datenschutz";
import Footer from "./Components/Footer";
import { BrowserRouter as Router } from 'react-router-dom';
import Tagebuch from "./Pages/Tagebuch";
import {useState} from "react";


function App() {
    // authentifizierung für Tagebuch
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };
  return (
      <>
          <Router>
                  <Navbar/>
                  <Routes>
                      <Route path="/" element={<Home onLogin={handleLoginSuccess}/>} />
                      <Route path="/tagebuch" element={isAuthenticated ? <Tagebuch /> : <Home onLogin={handleLoginSuccess} />}/>
                      <Route path="/impressum" element={<Impressum />} />
                      <Route path="/datenschutz" element={<Datenschutz />} />
                      {/* Definieren Sie weitere Routen hier */}
                  </Routes>
                  <Footer/>
          </Router>
      </>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('app'));
// root.render(<App />);
export default App;
