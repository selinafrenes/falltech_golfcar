function TeamItem(props) {
    const {name, job, imagePath} = props;

    const altText = "Foto" + name;
    return(
        <div className="unserTeamItem">
            <div className="unserTeam-image-container">
                <img src={imagePath} alt={altText}/>
            </div>
            <p><span>{name}</span></p>
            <p>{job}</p>
        </div>
    );
}

export default TeamItem;