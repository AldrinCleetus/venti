const RideType = ({id,selected,onClick,index}) => {

    const firstLetterCapital = (word)=>{
        return (word.charAt(0).toUpperCase() + word.slice(1))
    }

    const test = ()=>{
        console.log(selected)
    }



    return ( 
        <div className="column mx-1 " onClick={()=>{
            onClick(index)
        }}>
            <a >
            <div className={`ride-type-container has-text-white p-5 rounded ${selected? "cab-selected": ""}`} >
                    <div className="ride-type-cab-pic pop">
                        <img src={`images/${id}.png`} alt="test" />
                    </div>
                    <div className="ride-type-name has-text-primary">
                        {firstLetterCapital(id)}
                    </div>
                </div>
            </a>
        </div>
        
     );
}
 
export default RideType;