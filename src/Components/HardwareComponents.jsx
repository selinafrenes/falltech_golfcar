function HardwareComponents(props) {
    const {beschreibung, nameBauteil, imagePath } = props;

    const altText = "Foto" + beschreibung;
    return (
      <>
          <div className="hardwareComponent">
              <div className="hardwareComponent-image-container">
                  <img src={imagePath} alt={altText}/>
              </div>
              <p><span>{beschreibung}</span></p>
              <p>{nameBauteil}</p>
          </div>
      </>
    );
}

export default HardwareComponents;