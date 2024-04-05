function Item(props) {
    const {name, description, imagePath} = props;
    // const {classname, innerClassname} = classnames;

    const altText = "Foto" + name;
    return(
        // unserTeamItem
        <div className="item">
            {/*unserTeam-image-container*/}
            <div className="image-container">
                <img src={imagePath} alt={altText}/>
            </div>
            <p><span>{name}</span></p>
            <p>{description}</p>
        </div>
    );
}

export default Item;