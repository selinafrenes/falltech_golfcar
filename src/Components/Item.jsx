/**
 * Eine Komponente zur Anzeige eines einzelnen Elements in einem ItemContainer.
 * @param {object} props - Die Eigenschaften (Props) des Items.
 * @param {string} props.name - Der Name des Elements.
 * @param {string} props.description - Die Beschreibung des Elements.
 * @param {string} props.imagePath - Der Pfad zum Bild des Elements.
 * @returns {JSX.Element} Die gerenderte Item-Komponente.
 */
function Item(props) {
    // Extrahieren der Props
    const {name, description, imagePath} = props;

    // Alternativer Text für das Bild
    const altText = "Foto von " + name;

    // Rendern des Items
    return(
        <div className="item">
            <div className="image-container">
                <img src={imagePath} alt={altText}/>
            </div>
            <p><span>{name}</span></p>
            <p>{description}</p>
        </div>
    );
}

export default Item;