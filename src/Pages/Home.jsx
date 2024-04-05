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
import { Slide as SlideItem } from "../Components/Slide";
import TeamItem from "../Components/TeamItem";


function Home({onLogin}) {
    const sponsorRef = useRef(null);

    const textZiele = "Unser Ziel besteht darin, ein autonomes Fahrzeug zu entwickeln, das in der Lage ist, " +
        "einen Ball auf einem Spielfeld zu lokalisieren und sicher in ein definiertes Zielgebiet zu bringen. " +
        "Dabei soll das Fahrzeug Hindernisse erkennen und umfahren können, sowie flexibel an verschiedene Umgebungen " +
        "anpassbar sein. Die Steuerung erfolgt über WLAN, unterstützt durch eine Kamera für die Navigation. " +
        "Zusätzlich wird das Fahrzeug bei Dunkelheit automatisch Licht einschalten, um die Sichtbarkeit zu verbessern " +
        "und seine Aufgaben effektiv zu erfüllen."

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
                            <SlideItem heading="Schulprojekt" text="TEXT ÜBER PROJEKT" image="/assets/images/frosch.jpeg"
                                       altText="Bild"></SlideItem>
                            <SlideItem heading="Golf Car Projekt" text="TEXT ÜBER PROJEKT" image="/assets/images/frosch.jpeg"
                                       altText="Bild"></SlideItem>
                            <SlideItem heading="Ziele" text={textZiele} image="/assets/images/frosch.jpeg"
                                       altText="Bild"></SlideItem>
                            {/*<SlideItem heading="Verwendete Programmiersprachen" text="TEXT ÜBER PROJEKT" image="/assets/images/frosch.jpeg"*/}
                            {/*           altText="Bild"></SlideItem>*/}
                        </div>
                    {/*    TODO Programmmierpraschen und Bauteile darunter!*/}
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
                        <TeamItem name="Damian Mayr, PM" job="3D CAD Designer" imagePath="/assets/images/frosch.jpeg"/>
                        <TeamItem name="David Maierhofer" job="Robotics Engineer" imagePath="/assets/images/frosch.jpeg"/>
                        <TeamItem name="Fabian Reifer" job="Software Engineer" imagePath="/assets/images/frosch.jpeg"/>
                        <TeamItem name="Selina Frenes" job="Full Stack Developer" imagePath="/assets/images/frosch.jpeg"/>
                        <TeamItem name="Wilma Frener" job="Full Stack Developer" imagePath="/assets/images/frosch.jpeg"/>
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
