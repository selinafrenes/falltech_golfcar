import {useRef} from "react";

function Sponsor () {
    const sponsorRef = useRef(null);
    return (
        <>
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

export default Sponsor;