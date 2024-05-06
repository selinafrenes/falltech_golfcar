import '../src/styles/style.css';
import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from "./Pages/Home";
import Impressum from "./Pages/Impressum";
import Datenschutz from "./Pages/Datenschutz";
import Footer from "./Components/Footer";
import Tagebuch from "./Pages/Tagebuch";
import {useEffect, useState} from "react";
import {getCookieValue} from "./script";
import {Slide, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import specYAML from "./SwaggerSpec.yaml";

function App() {
    // authentifizierung für Tagebuch
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [spec, setSpec] = useState("");

    // // Zustand für den Inhalt der YAML-Datei
    // const [specYAML, setSpecYAML] = useState(null);
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    useEffect(() => {
        const username = getCookieValue("username");
        if (username){
            setIsAuthenticated(true);
        }

        // Lade den Inhalt der YAML-Datei
        fetch(specYAML)
            .then(response => response.text())
            .then(yamlText => {
                setSpec(yamlText);
            })
            .catch(error => {
                console.error('Fehler beim Laden der Swagger-Spezifikation:', error);
            });
    }, []);


    return (
        <>
            <Navbar/>
            <div id="content">
                <Routes>
                    <Route exact path="/" element={<Home onLogin={handleLoginSuccess}/>} />
                    <Route path="/tagebuch" element={isAuthenticated ? <Tagebuch /> : <Home onLogin={handleLoginSuccess} />}/>
                    <Route path="/impressum" element={<Impressum onLogin={handleLoginSuccess}/>} />
                    <Route path="/datenschutz" element={<Datenschutz onLogin={handleLoginSuccess}/>} />
                    <Route path="/swagger" element={<SwaggerUI spec={spec} />} />
                    {/* TODO route von davids seite einbinden */}
                    <Route path="*" element={<Navigate to="/" />} /> {/* Standardroute */}
                </Routes>
                <Footer/>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Slide}
                />
            </div>
        </>

  );
}

export default App;
