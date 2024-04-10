import '../../src/styles/style.css';
import {prevSlide, nextSlide} from '../script';
import Login from "../Components/Login";
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRef} from "react";
import { Slide as SlideItem } from "../Components/Slide";
import Item from "../Components/Item";
import ItemContainer from "../Components/ItemContainer";
import {redirect} from "react-router-dom";

function Home({onLogin}) {
    const sponsorRef = useRef(null);

    const textZiele = "Unser Ziel besteht darin, ein autonomes Fahrzeug zu entwickeln, das in der Lage ist, " +
        "einen Ball auf einem Spielfeld zu lokalisieren und sicher in ein definiertes Zielgebiet zu bringen. " +
        "Dabei soll das Fahrzeug Hindernisse erkennen und umfahren können, sowie flexibel an verschiedene Umgebungen " +
        "anpassbar sein. Die Steuerung erfolgt über WLAN, unterstützt durch eine Kamera für die Navigation. " +
        "Zusätzlich wird das Fahrzeug bei Dunkelheit automatisch Licht einschalten, um die Sichtbarkeit zu verbessern " +
        "und seine Aufgaben effektiv zu erfüllen.";

    const textGolfCar = "Unser Projekt umfasst die Entwicklung eines Autos, welches autonom einen Golfball auf einem " +
        "Parcours findet und ihn sicher zum Ziel bringt. Wir haben die Karosserie und das Chassis mit einem 3D-Drucker " +
        "selbst entworfen. Das Auto erkennt Hindernisse autonom und weicht ihnen aus. Zudem haben wir die Webseite " +
        "und den Server für das Projekt selbst erstellt, was eine nahtlose Steuerung und Überwachung ermöglicht. " +
        "Unser Ziel ist es, ein zuverlässiges und leistungsfähiges autonomes Golfcar zu schaffen."

    const onClick = () => {
        redirect("/swagger");
    }

    return (
        <>
            <Login onLogin={onLogin}/>
            <button onClick={onClick}>Button Swagger</button>
            <div id="zumProjekt">
                <h1>Zum Projekt</h1>
                <div id="zumProjekt-Container">
                    <div className="pfeil-links">
                        <div className="prev" onClick={prevSlide}><FontAwesomeIcon icon={faArrowLeft} /></div>
                    </div>
                    <section id="zumProjektShow">
                        {/*TODO Problem mit Slideshow und Seite kleiner machen*/}
                        <div className="slides">
                            <SlideItem heading="Schulprojekt" text="TEXT ÜBER PROJEKT" image="/assets/images/frosch.jpeg"
                                       altText="Bild"></SlideItem>
                            <SlideItem heading="Golf Car Projekt" text={textGolfCar} image="/assets/images/frosch.jpeg"
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
                {/*{name, description, imagePath}*/}
                <ItemContainer classname="hardwareContainer" innerClassname="hardwareWrapper">
                    <Item name="Mikrocontroller" description="Raspberry PI 3" imagePath="/assets/images/components/raspberry3.png" />
                    <Item name="Kamera" description="Rasperry Pi Camera Module 3" imagePath="/assets/images/components/kameraPI3.png" />
                    <Item name="Abstandssensor" description="3pcs Ultrasonic Sensor" imagePath="/assets/images/components/ultrasonicSensor.png" />
                    <Item name="Schrittmotor" description="5pcs 28BYJ-48 Schrittmotor" imagePath="/assets/images/components/stepperMotor.png" />
                    <Item name="DC Motor" description="GA12-N20 Gear Motor" imagePath="/assets/images/components/gearMotor.png" />
                    <Item name="Motortreiber" description="L298 Motor Drive Controller Board" imagePath="/assets/images/components/MotorControllerBoard.png" />
                    <Item name="LED" description="RC Headlight LEDs" imagePath="/assets/images/components/leds.png" />
                    <Item name="Batterie" description="9V 650mA wiederaufladbare Batterie" imagePath="/assets/images/components/battery.png" />
                    <Item name="Batterie Adapter" description="9V Batterie Adapter" imagePath="/assets/images/components/batteryAdapter.png" />
                    <Item name="Speicher" description="32GB Micro SD" imagePath="/assets/images/components/storageSD.png" />
                    <Item name="Kugellager" description="5pcs 10x3x4 mm" imagePath="/assets/images/components/kugellager.png" />
                    <Item name="Aufbau" description="Filament" imagePath="/assets/images/components/kugellager.png" />
                    <Item name="Power Bank" description="Mini Power Bank 5000mAh " imagePath="/assets/images/components/powerBank.png" />
                </ItemContainer>

            </div>
            <div id="aboutUs" className="aboutUS">
                <h1>Unser Team</h1>
                <ItemContainer classname="unserTeamContainer" innerClassname="unserTeam">
                    <Item name="Damian Mayr, PM" description="3D CAD Designer" imagePath="/assets/images/frosch.jpeg"/>
                    <Item name="David Maierhofer" description="Robotics Engineer" imagePath="/assets/images/frosch.jpeg"/>
                    <Item name="Fabian Reifer" description="Software Engineer" imagePath="/assets/images/frosch.jpeg"/>
                    <Item name="Selina Frenes" description="Full Stack Developer" imagePath="/assets/images/frosch.jpeg"/>
                    <Item name="Wilma Frener" description="Full Stack Developer" imagePath="/assets/images/frosch.jpeg"/>
                </ItemContainer>
            </div>
            {/*relationales Datenbankverwaltungssystem*/}
            <div id="software" className="software">
                <h1>Software</h1>
                <ItemContainer classname="unserSoftwareContainer" innerClassname="unsereSoftware">
                    <Item name="Python" description="Vielseitige, interpretierte Programmiersprache" imagePath="/assets/images/software/python.jpg"/>
                    <Item name="HTML" description="Markup-Sprache für Webinhalte" imagePath="/assets/images/software/html.jpg"/>
                    <Item name="CSS" description="Stylesheet-Sprache für das Webdesign" imagePath="/assets/images/software/css.jpg"/>
                    <Item name="JavaScript" description="Skriptsprache für Webentwicklung" imagePath="/assets/images/software/javascript.jpg"/>
                    <Item name="React" description="JavaScript-Bibliothek für Benutzeroberflächen" imagePath="/assets/images/software/react.jpg"/>
                    <Item name="Nodejs" description="JavaScript-Laufzeitumgebung für Server" imagePath="/assets/images/software/nodejs.jpg"/>
                    <Item name="MySQL" description="Relationales Datenbankverwaltungssystem" imagePath="/assets/images/software/mysql.jpg"/>
                </ItemContainer>
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
