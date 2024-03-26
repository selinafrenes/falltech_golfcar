// import {useState} from "react";

function EintragForm() {

    // const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // setIsSubmitting(true);

        // Erstellen Sie ein FormData-Objekt aus dem Formular
        const formData = new FormData(event.target);

        const data = {
            people: formData.getAll('people'),
            description: formData.get('description'),
            notes: formData.get('notes'),
            date: formData.get('date'),
            duration: formData.get('duration')

        }

        // Senden der Daten an den Server
        const response = await fetch('http://localhost:8000/tagebuch.html/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Verarbeiten der Serverantwort
        const jsonData = await response.json();
        // setIsSubmitting(false);

        if (jsonData.success) {
            alert("Success");
            console.log("S:DATA:" + JSON.stringify(jsonData));
            event.target.reset();
            // Erfolgreiche Verarbeitung
            // ... (z.B. setData(jsonData) um die Komponente zu aktualisieren)
        } else {
            alert("Error");
            console.log("E:DATA:" + JSON.stringify(jsonData));

            // Fehlerhafte Verarbeitung
            // ... (z.B. Fehlermeldung anzeigen)
        }

        // setIsSubmitting(false);
    };
    return (
        <>
            <div id="tagebuch - eintrage">
                <h1>Tagebuch</h1>
            </div>

            <div className="input-wrapper">
                <form /* action="http://localhost:8000/tagebuch.html/submit"*/ onSubmit={handleSubmit} className="input-container" /* method="post"*/>
                    <label htmlFor="date">Datum:</label>
                    <input className="input-date-field" type="date" id="date" name="date" required/>
                    <label htmlFor="duration">Zeit (h = 50min):</label>
                    <input className="input-nummer-field" type="number" id="duration" name="duration" required min="0"
                           step="0.01" pattern="^\d+(\.\d{0,2})?$"/>

                    <fieldset className="checkbox-container">
                        <legend>Personen:</legend>
                        <div className="checkbox-wrapper">
                            <label className="checkbox-input" htmlFor="checkboxDamian">
                                <input className="input-checkbox-field" type="checkbox" id="checkboxDamian" name="people"
                                       value="mayrdamian"/>
                            </label>
                            <label className="checkbox-label" htmlFor="checkboxDamian">Damian</label>
                        </div>
                        <div className="checkbox-wrapper">
                            <label className="checkbox-input" htmlFor="checkboxDavid">
                                <input className="input-checkbox-field" type="checkbox" id="checkboxDavid" name="people"
                                       value="mairhoferdavid"/>
                            </label>
                            <label className="checkbox-label" htmlFor="checkboxDavid">David</label>
                        </div>
                        <div className="checkbox-wrapper">
                            <label className="checkbox-input" htmlFor="checkboxFabian">
                                <input className="input-checkbox-field" type="checkbox" id="checkboxFabian" name="people"
                                       value="reiferfabian"/>
                            </label>
                            <label className="checkbox-label" htmlFor="checkboxFabian">Fabian</label>
                        </div>
                        <div className="checkbox-wrapper">
                            <label className="checkbox-input" htmlFor="checkboxSelina">
                                <input className="input-checkbox-field" type="checkbox" id="checkboxSelina" name="people"
                                       value="frenesselina"/>
                            </label>
                            <label className="checkbox-label" htmlFor="checkboxSelina">Selina</label>
                        </div>
                        <div className="checkbox-wrapper">
                            <label className="checkbox-input" htmlFor="checkboxWilma">
                                <input className="input-checkbox-field" type="checkbox" id="checkboxWilma" name="people"
                                       value="frenerwilma"/>
                            </label>
                            <label className="checkbox-label" htmlFor="checkboxWilma">Wilma</label>
                        </div>
                    </fieldset>
                    <label htmlFor="description">Beschreibung:</label>
                    <textarea className="input-text-field" id="description" name="description" rows="4" required></textarea>

                    <label htmlFor="notes">Notizen:</label>
                    <textarea className="input-text-field" id="notes" name="notes" rows="4"></textarea>

                    <button type="submit" className="submitBtn">Eintragen</button>
                </form>
            </div>

        </>
    );
}

export default EintragForm;