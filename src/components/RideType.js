const RideType = ({id,name}) => {
    return ( 
        <div className="column">
            <a>
            <div className="ride-type-container has-text-white p-5 rounded" >
                    <div className="ride-type-cab-pic pop">
                        <img src={`images/${id}.png`} alt="test" />
                    </div>
                    <div className="ride-type-name has-text-primary">
                        {name}
                    </div>
                </div>
            </a>
        </div>
        
     );
}
 
export default RideType;