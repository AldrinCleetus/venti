const RideType = ({id}) => {
    return ( 
        // <a>
        //     <div className="stats-container has-text-white p-5 rounded" id={id}>
        
        // {/* Empty Character for consistent sizing */}
        // <div className="is-size-2">&#x200B;</div> 

        //     <div className="cab-pic pop">
        //         <img src={`images/${id}.png`} alt="test" />
        //     </div>

        //     <div className="status-name has-text-primary">
        //         Economy
        //     </div>
        // </div>
        // </a>


        <div className="column">
            <a>
            <div className="ride-type-container has-text-white p-5 rounded" >
                    <div className="ride-type-cab-pic pop">
                        <img src={`images/${id}.png`} alt="test" />
                    </div>
                    <div className="ride-type-name has-text-primary">
                        Economy
                    </div>
                </div>
            </a>
        </div>
        
     );
}
 
export default RideType;