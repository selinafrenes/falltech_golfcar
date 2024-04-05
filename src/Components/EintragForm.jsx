// import {useState} from "react";

import CheckboxElement from "./CheckboxElement";
import {toast} from "react-toastify";

function EintragForm(props) {

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
        const response = await fetch('http://localhost:8000/tagebuch/submit', {
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
            toast.success('Daten wurden erfolgreich abgespeichert');
            console.log("S:DATA:" + JSON.stringify(jsonData));
            event.target.reset();
            // Erfolgreiche Verarbeitung
            // ... (z.B. setData(jsonData) um die Komponente zu aktualisieren)
        } else {
            toast.error('Fehler beim abspeichern in der Datenbank');
        }

        props.onreload();
    };
    return (
        <>
            <div className="input-wrapper">
                <form /* action="http://localhost:8000/tagebuch.html/submit"*/ onSubmit={handleSubmit} className="input-container" /* method="post"*/>
                    <label htmlFor="date">Datum:</label>
                    <input className="input-date-field" type="date" id="date" name="date" required/>
                    <label htmlFor="duration">Zeit (h = 50min):</label>
                    <input className="input-nummer-field" type="number" id="duration" name="duration" required min="0"
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