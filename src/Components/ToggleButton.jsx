import {useState} from "react";


function ToggleButton() {
    const [toggled, setToggled] = useState(false);
    return(
        <>
            <button className={`toggle-btn ${toggled ? "toggled" : ""}`} onClick={() =>setToggled(!toggled)}>
                <div className='thumb'></div>
            </button>
        </>
    );

}

export default ToggleButton;