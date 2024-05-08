/**
 * Eine Funktionskomponente zum Rendern einer einzelnen Folie.
 * @param {Object} props - Die Eigenschaften der Slide-Komponente.
 * @param {string} props.heading - Die Überschrift der Slide.
 * @param {string} props.text - Der Textinhalt der Slide.
 * @param {string} props.image - Der Pfad zum Bild der Slide.
 * @param {string} props.altText - Der alternative Text für das Bild der Slide.
 * @returns {JSX.Element} Die gerenderte Slide-Komponente.
 */
export function Slide({heading, text, image, altText}) {

     // Rendern der Folie
    return(
        <div className="slide">
            <h3 className="slide-uberschrift">{heading}</h3>
            <div className="slide-text">
                {text}
            </div>
            <div className="slide-image-container">
                <img className="img_slide" src={image} alt={altText}/>
            </div>
        </div>
    );
}