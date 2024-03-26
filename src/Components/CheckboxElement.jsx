function CheckboxElement(props) {

    const { username, firstname } = props;
    const checkboxName = "checkbox" + firstname;
    // brauch es die id??
    return(
        <div className="checkbox-wrapper">
            <label className="checkbox-input" htmlFor={checkboxName}>
                <input className="input-checkbox-field" type="checkbox"
                       name="people" value={username}/>
            </label>
            <label className="checkbox-label" htmlFor={checkboxName}>{firstname}</label>
        </div>
    );
}

export default CheckboxElement;