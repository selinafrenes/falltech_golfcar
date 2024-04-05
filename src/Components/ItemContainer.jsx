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

export default ItemContainer;