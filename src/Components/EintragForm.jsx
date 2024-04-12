import CheckboxElement from "./CheckboxElement";
import {toast} from "react-toastify";

/**
 * Eine Komponente zum Erstellen neuer Einträge im Tagebuch (Form).
 * @param {object} props - Die Eigenschaften (Props) der EintragForm-Komponente.
 * @param {function} props.onreload - Die Funktion zum Auslösen des Triggers.
 * @returns {JSX.Element} Die gerenderte EintragForm-Komponente.
 */
function EintragForm(props) {

    /**
     * Funktion zum Verarbeiten des Formulars beim Abschicken.
     * @param {Event} event - Das Ereignisobjekt des Formulars.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        // FormData-Objekt aus dem Formular erstellen
        const formData = new FormData(event.target);

        // Extrahieren der Daten aus dem FormData-Objekt
        const data = {
            people: formData.getAll('people'),
            description: formData.get('description'),
            notes: formData.get('notes'),
            date: formData.get('date'),
            duration: formData.get('duration')
        }

        // Validierung der Formulardaten
        if(data.people.length === 0 || data.description === '' || data.date === '' || data.duration === ''){
            toast.error("Alle nicht optionale Felder müssen ausgefüllt werden");
        } else {
            // Daten an den Server senden
            const response = await fetch('http://localhost:8000/tagebuch/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Verarbeiten der Serverantwort
            const jsonData = await response.json();

            if (jsonData.success) {
                toast.success('Daten wurden erfolgreich abgespeichert');
                console.log("S:DATA:" + JSON.stringify(jsonData));
                event.target.reset();
                // Aktualisieren der Einträge nach erfolgreichem Speichern
                props.onreload();
            } else {
                toast.error('Fehler beim abspeichern in der Datenbank');
            }
            // props.onreload();
        }
    };

    // Rendern des Eintrag-Formulars
    return (
        <>
            <div className="input-wrapper">
                <form onSubmit={handleSubmit} className="input-container" /* method="post"*/>
                    <label htmlFor="date">Datum:</label>
                    <input className="input-date-field" type="date" id="date" name="date"/>
                    <label htmlFor="duration">Zeit (h = 50min):</label>
                    <input className="input-nummer-field" type="number" id="duration" name="duration" min="0"
                           step="0.01" pattern="^\d+(\.\d{0,2})?$"/>
                    <fieldset className="checkbox-container">
                        <legend className="checkbox-legend">Personen:</legend>
                        <CheckboxElement username="mayrdamian" firstname="Damian"/>
                        <CheckboxElement username="mairhoferdavid" firstname="David"/>
                        <CheckboxElement username="reiferfabian" firstname="Fabian"/>
                        <CheckboxElement username="frenesselina" firstname="Selina"/>
                        <CheckboxElement username="frenerwilma" firstname="Wilma"/>
                    </fieldset>
                    <label htmlFor="description">Beschreibung:</label>
                    <textarea className="input-text-field" id="description" name="description" rows="4"></textarea>

                    <label htmlFor="notes">Notizen: (optional)</label>
                    <textarea className="input-text-field" id="notes" name="notes" rows="4"></textarea>

                    <button type="submit" className="submitBtn">Eintragen</button>
                </form>
            </div>
        </>
    );
}

export default EintragForm;