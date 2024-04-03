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

function getCookieValue(cookieName) {
    // Zuerst die Cookies anhand ihres Namens suchen
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        // Prüfen, ob der Name des aktuellen Cookies dem gewünschten Namen entspricht
        if (cookie.startsWith(cookieName + '=')) {
            // Wenn ja, den Wert des Cookies zurückgeben
            return cookie.substring(cookieName.length + 1);
        }
    }
    // Wenn kein entsprechendes Cookie gefunden wird, wird null zurückgegeben
    return null;
}

function App() {
    const navigate = useNavigate();
    const location = useLocation();
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
    //
    // useEffect(() => {
    //     sessionStorage.setItem("lastPath", location.pathname);
    // }, [location.pathname]);
    //
    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         event.preventDefault();
    //         event.returnValue = 'Möchtest du sicher die Seite verlassen? Eventuelle Änderungen werden nicht gespeichert';
    //
    //         // Benachrichtigung anzeigen und Navigation durchführen, wenn Benutzer bestätigt
    //         const confirmationMessage = 'Möchtest du wirklich die Seite verlassen?';
    //         event.returnValue = confirmationMessage; // Dies ist für Chrome erforderlich
    //         return confirmationMessage;
    //     };
    //
    //     const handleUnload = (event) => {
    //         debugger;
    //         const confirmation = window.confirm('Möchtest du wirklich die Seite verlassen?');
    //         if (confirmation) {
    //             window.location.pathname = "/";
    //             console.log("WLP: " + window.location.pathname)
    //             // const lastPath = sessionStorage.getItem("lastPath");
    //             // if (lastPath && lastPath !== window.location.pathname) {
    //                 navigate("/");
    //
    //         }
    //     };
    //
    //     window.addEventListener("beforeunload", handleBeforeUnload);
    //     window.addEventListener("unload", handleUnload);
    //
    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //         window.removeEventListener("unload", handleUnload);
    //     };
    // }, [navigate]);

    //TODO pfad bei reload anpassen! History?


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
