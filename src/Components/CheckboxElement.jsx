/**
 * Eine CheckboxElement-Komponente, die einen Namen anzeigt.
 * @param {object} props - Die Eigenschaften (Props) der CheckboxElement-Komponente.
 * @param {string} props.username - Wert des CheckboxElements, welcher beim Abschicken des Forms, mitgesendet wird.
 * @param {string} props.firstname - Name welcher bei CheckboxElement angezeigt wird.
 * @returns {JSX.Element} Die gerenderte CheckboxElement-Komponente.
 */
function CheckboxElement(props) {

    // Deklaration der Variablen für benutzername und vorname aus den props
    const { username, firstname } = props;

    // Namen für die Checkbox erstellen
    const checkboxName = "checkbox" + firstname;

    // Rendern der Checkbox-Komponente
    return(
        <div className="checkbox-wrapper">
            <label className="checkbox-input" htmlFor={checkboxName}>
                <input className="input-checkbox-field" type="checkbox"
                       name="people" value={username}/>
            </label>
            <label className="checkbox-label" htmlFor={checkboxName}>{firstname}</label>
        </div>
    );
}

export default CheckboxElement;