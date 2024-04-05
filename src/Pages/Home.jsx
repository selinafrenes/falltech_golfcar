import '../../src/styles/style.css';
// import Navbar from '../Navbar';
import {prevSlide, nextSlide} from '../script';
import Login from "../Components/Login";
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Sponsor from "../Components/Sponsor";
import {Route, Routes} from "react-router-dom";
import {useRef} from "react";


function Home({onLogin}) {
    const sponsorRef = useRef(null);

    return (
        <>
            <Login onLogin={onLogin}/>
            <div id="zumProjekt">
                <h1>Zum Projekt</h1>
                <div id="zumProjekt-Container">
                    <div className="pfeil-links">
                        <div className="prev" onClick={prevSlide}><FontAwesomeIcon icon={faArrowLeft} /></div>
                    </div>
                    <section id="zumProjektShow">
                        <div className="slides">
                            <div className="slide" id="slide-1">
                                <h3 className="slide-uberschrift">Schulprojekt</h3>
                                <div className="slide-text">
                                    <p>TEXT ÜBER PROJEKT</p>
                                </div>
                                <div className="slide-image">
                                    <img src="/assets/images/frosch.jpeg" alt="Bild"/>
                                </div>
                            </div>
                            <div className="slide" id="slide-2">
                                <h3 className="slide-uberschrift">Golf Car Projekt</h3>
                                <div className="slide-text">
                                    <p>TEXT ÜBER PROJEKT</p>
                                </div>
                                <div className="slide-image">
                                    <img src="/assets/images/frosch.jpeg" alt="Bild"/>
                                </div>
                            </div>
                            <div className="slide" id="slide-3">
                                <h3 className="slide-uberschrift">Ziele</h3>
                                <div className="slide-text">
                                    <p>TEXT ÜBER PROJEKT</p>
                                </div>
                                <div className="slide-image">
                                    <img src="/assets/images/frosch.jpeg" alt="Bild"/>
                                </div>
                            </div>
                            <div className="slide" id="slide-4">
                                <h3 className="slide-uberschrift">Bauteile des Autos</h3>
                                <div className="slide-text">
                                    <p>TEXT ÜBER PROJEKT</p>
                                </div>
                                <div className="slide-image">
                                    <img src="/assets/images/frosch.jpeg" alt="Bild"/>
                                </div>
                            </div>
                            <div className="slide" id="slide-5">
                                <h3 className="slide-uberschrift">Verwendete Programmiersprachen</h3>
                                <div className="slide-text">
                                    <p>TEXT ÜBER PROJEKT</p>
                                </div>
                                <div className="slide-image">
                                    <img src="/assets/images/frosch.jpeg" alt="Bild"/>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="pfeil-rechts">
                        <div className="next" onClick={nextSlide}><FontAwesomeIcon icon={faArrowRight}/></div>
                    </div>
                </div>

            </div>
            <div id="aboutUs" className="aboutUS">
                <h1>Unser Team</h1>
                <div className="unserTeamContainer">
                    <div className="unserTeam">
                        <div className="unserTeamItem">
                            <div className="unserTeam-image-container">
                                <img src="/assets/images/frosch.jpeg" alt="Foto Damian Mayr"/>
                            </div>
                            <p><span>Damian Mayr, PM</span></p>
                            <p>3D CAD Designer</p>
                        </div>
                        <div className="unserTeamItem">
                            <div className="unserTeam-image-container">
                                <img src="/assets/images/frosch.jpeg" alt="Foto David Maierhofer"/>
                            </div>
                            <p><span>David Mairhofer</span></p>
                            <p>Robotics Engineer</p>
                        </div>
                        <div className="unserTeamItem">
                            <div className="unserTeam-image-container">
                                <img src="/assets/images/frosch.jpeg" alt="Foto Fabian Reifer"/>
                            </div>
                            <p><span>Fabian Reifer</span></p>
                            <p>Software Engineer</p>
                        </div>
                        <div className="unserTeamItem">
                            <div className="unserTeam-image-container">
                                <img src="/assets/images/frosch.jpeg" alt="Foto Selina Frenes"/>
                            </div>
                            <p><span>Selina Frenes</span></p>
                            <p>Full Stack Developer</p>
                        </div>
                        <div className="unserTeamItem">
                            <div className="unserTeam-image-container">
                                <img src="/assets/images/frosch.jpeg" alt="Foto Wilma Frener"/>
                            </div>
                            <p><span>Wilma Frener</span></p>
                            <p>Full Stack Developer</p>
                        </div>
                    </div>
                </div>

            </div>
            <div id="sponsor" ref={sponsorRef}>
                <h1>Sponsor</h1>
                <p>Danke an unseren Sponsor</p>
                <a href="https://www.acs.it/de/">
                    <img src="/assets/images/acsLogo.svg" alt="Logo ACS"/>
                </a>
            </div>


        </>
    );
}

export default Home;
