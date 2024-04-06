function ItemContainer(props) {
    const {classname, innerClassname, children} = props;
    return(
        <div className={classname}>
            {/*unserTeam*/}
            <div className={innerClassname}>
                {children}
            </div>
        </div>
    );
}
// tainer className="hardwareContainer" innerClassName="hardwareWrapper">
export default ItemContainer;