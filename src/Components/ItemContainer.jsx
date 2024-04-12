/**
 * Eine Container-Komponente zur Anordnung von Elementen.
 * @param {object} props - Die Eigenschaften (Props) des ItemContainers.
 * @param {string} props.classname - Die CSS-Klasse für den äußeren Container.
 * @param {string} props.innerClassname - Die CSS-Klasse für den inneren Container.
 * @param {ReactNode} props.children - Item-Elemente, die im Container gerendert werden sollen.
 * @returns {JSX.Element} Die gerenderte ItemContainer-Komponente.
 */
function ItemContainer(props) {
    // Extrahieren der Props
    const {classname, innerClassname, children} = props;

    // Rendern des ItemContainers mit untergeordneten Komponenten
    return(
        <div className={classname}>
            <div className={innerClassname}>
                {children}
            </div>
        </div>
    );
}

export default ItemContainer;