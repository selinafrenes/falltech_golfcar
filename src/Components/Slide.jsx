import Login from "./Login";
import {useEffect, useState} from "react";

 export function Slide(props) {
    const {heading, text, image, altText} = props;

    return(
        <div className="slide">
            <h3 className="slide-uberschrift">{heading}</h3>
            <div className="slide-text">
                {text}
            </div>
            <div className="slide-image">
                <img src={image} alt={altText}/>
            </div>
        </div>
    );
}

// export default Slide;