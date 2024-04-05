import Login from "../Components/Login";

function Impressum({onLogin}){
    return(
        <>
            <Login onLogin={onLogin}/>
            <div id="impressum">
                <h1>Impressum</h1>
                <p><span>Eigentümer der Webseite:</span></p><br/>
                <p>FallTech GmbH</p><br/>
                <p>Mayr | Mairhofer | Reifer | Frenes | Frener</p><br/>
                <p>Dantestraße 39E</p><br/>
                <p>I-39042 Brixen</p><br/>
                <p><span>Bildmaterial</span></p><br/>
                <p>© FallTech</p>
            </div>

        </>
    );
}
export default Impressum;