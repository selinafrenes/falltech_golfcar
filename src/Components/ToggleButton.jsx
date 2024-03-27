import {useState} from "react";


function ToggleButton({onChange}) {
    const [toggled, setToggled] = useState(false);
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