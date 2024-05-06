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

/**
 * Home-Komponente repräsentiert die Startseite der Webseite.
 * @param {Object} props - Die Eigenschaften, die an die Home-Komponente übergeben werden.
 * @param {Function} props.onLogin - Rückruffunktion zur Behandlung von Anmeldeereignissen.
 * @returns {JSX.Element} Eine React-Komponente, die die Startseite der Webseite darstellt.
 */
function Home({onLogin}) {
    const sponsorRef = useRef(null);

    const textSchulprojekt = "Seit dem Schuljahr 2017/18 führt die Fachoberschule J.Ph.Fallmerayer in der " +
        "Fachrichtung Informatik in den Abschlussklassen ein interdisziplinäres Projekt durch. Dabei sollen die " +
        "technischen Fähigkeiten, die Teamarbeit und die Kreativität der Maturant*innen auf die Probe gestellt werde."

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

    return (
        <>
            <Login onLogin={onLogin}/>
            <div className="home">
                <div id="zumProjekt">
                    <h1>Zum Projekt</h1>
                    <div id="zumProjekt-Container">
                        <div className="pfeil-links">
                            <div className="prev" onClick={prevSlide}><FontAwesomeIcon icon={faArrowLeft}/></div>
                        </div>
                        <section id="zumProjektShow">
                            {/*TODO Problem mit Slideshow und Seite kleiner machen*/}
                            <div className="slides">
                                <SlideItem heading="Schulprojekt" text={textSchulprojekt}
                                           image="/assets/images/frosch.jpeg"
                                           altText="Bild"></SlideItem>
                                <SlideItem heading="Golf Car Projekt" text={textGolfCar}
                                           image="/assets/images/frosch.jpeg"
                                           altText="Bild"></SlideItem>
                                <SlideItem heading="Ziele" text={textZiele} image="/assets/images/frosch.jpeg"
                                           altText="Bild"></SlideItem>
                            </div>
                        </section>
                        <div className="pfeil-rechts">
                            <div className="next" onClick={nextSlide}><FontAwesomeIcon icon={faArrowRight}/></div>
                        </div>
                    </div>
                    <h2>Bauteile</h2>
                    <ItemContainer classname="hardwareContainer" innerClassname="hardwareWrapper">
                        <Item name="Mikrocontroller" description="Raspberry PI 3"
                              imagePath="/assets/images/components/raspberry3NEU.webp"/>
                        <Item name="Kamera" description="Rasperry Pi Camera Module 3"
                              imagePath="/assets/images/components/kameraPI3NEU.webp"/>
                        <Item name="Abstandssensor" description="3pcs Ultrasonic Sensor"
                              imagePath="/assets/images/components/ultrasonicSensorNEU.webp"/>
                        <Item name="Schrittmotor" description="5pcs 28BYJ-48 Schrittmotor"
                              imagePath="/assets/images/components/stepperMotorNEU.webp"/>
                        <Item name="DC Motor" description="GA12-N20 Gear Motor"
                              imagePath="/assets/images/components/gearMotorNEU.webp"/>
                        <Item name="Motortreiber" description="L298 Motor Drive Controller Board" imagePath="/assets/images/components/MotorControllerBoardNEU.webp" />
                        <Item name="LED" description="RC Headlight LEDs" imagePath="/assets/images/components/ledsNEU.webp" />
                        <Item name="Batterie" description="9V 650mA wiederaufladbare Batterie" imagePath="/assets/images/components/batteryNEU.webp" />
                        <Item name="Batterie Adapter" description="9V Batterie Adapter" imagePath="/assets/images/components/batteryAdapterNEU.webp" />
                        <Item name="Speicher" description="32GB Micro SD" imagePath="/assets/images/components/storageSDNEU.webp" />
                        <Item name="Kugellager" description="5pcs 10x3x4 mm" imagePath="/assets/images/components/kugellagerNEU.webp" />
                        <Item name="Aufbau" description="Filament" imagePath="/assets/images/components/filament.webp" />
                        <Item name="Power Bank" description="Mini Power Bank 5000mAh " imagePath="/assets/images/components/powerBankNEU.webp" />
                    </ItemContainer>

                    <h2>Software</h2>
                    <ItemContainer classname="unserSoftwareContainer" innerClassname="unsereSoftware">
                        <Item name="Python" description="Vielseitige Hochsprache für schnelle Entwicklung und Skripting" imagePath="/assets/images/software/python.webp"/>
                        <Item name="HTML" description="Auszeichnungssprache für Webseitenstruktur" imagePath="/assets/images/software/html.webp"/>
                        <Item name="CSS" description="Stylesheet-Sprache für das Styling von Webseiten" imagePath="/assets/images/software/css.webp"/>
                        <Item name="JavaScript" description="Skriptsprache für Webseiteninteraktion" imagePath="/assets/images/software/javascript.webp"/>
                        <Item name="React" description="JavaScript-Bibliothek für interaktive Benutzeroberflächenentwicklung auf Webseiten" imagePath="/assets/images/software/react.webp"/>
                        <Item name="Nodejs" description="Laufzeitumgebung für serverseitige JavaScript-Anwendungen" imagePath="/assets/images/software/nodejs.webp"/>
                        <Item name="MySQL" description="Relationales Datenbankverwaltungssystem für Datenbanken" imagePath="/assets/images/software/mysql.webp"/>
                    </ItemContainer>
                </div>
                <div id="aboutUs" className="aboutUS">
                    <h1>Unser Team</h1>
                    <ItemContainer classname="unserTeamContainer" innerClassname="unserTeam">
                        <Item name="Damian Mayr, PM" description="3D CAD Designer" imagePath="/assets/images/teamMembers/DamianMayr.webp"/>
                        <Item name="David Maierhofer" description="Robotics Engineer" imagePath="/assets/images/teamMembers/DavidMaierhofer.webp"/>
                        <Item name="Fabian Reifer" description="Software Engineer" imagePath="/assets/images/teamMembers/FabianReifer.webp"/>
                        <Item name="Selina Frenes" description="Full Stack Developer" imagePath="/assets/images/teamMembers/SelinaFrenes.webp"/>
                        <Item name="Wilma Frener" description="Full Stack Developer" imagePath="/assets/images/teamMembers/WilmaFrener.webp"/>
                    </ItemContainer>
                </div>
                {/*relationales Datenbankverwaltungssystem*/}
                <div id="sponsor" ref={sponsorRef}>
                    <h1>Sponsor</h1>
                    <p>Danke an unseren Sponsor</p>
                    <a href="https://www.acs.it/de/">
                        <img src="/assets/images/acsLogo.svg" alt="Logo ACS"/>
                    </a>
                </div>
            </div>


        </>
    );
}

export default Home;
