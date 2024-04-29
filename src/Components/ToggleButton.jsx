import {useState} from "react";

/**
 * Eine Schaltflächenkomponente zum Umschalten zwischen zwei Zuständen.
 * @param {Object} props - Die Eigenschaften der ToggleButton-Komponente.
 * @param {Function} props.onChange - Die Funktion, die aufgerufen wird, wenn der Zustand geändert wird.
 * @returns {JSX.Element} Die gerenderte ToggleButton-Komponente.
 */
function ToggleButton({onChange}) {
    const [toggled, setToggled] = useState(false);

    // Rendern der ToggleButton-Komponente
    return(
        <>
            <button className={`toggle-btn ${toggled ? "toggled" : ""}`} onClick={() => {
                setToggled(!toggled);
                onChange();
            }}>
                <div className='thumb'></div>
            </button>
        </>
    );

}

export default ToggleButton;