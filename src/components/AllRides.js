import { useState } from "react";
import Economy from "./Economy";
import EconomyLite from "./EconomyLite";
import Luxury from "./Luxury";
import Premium from "./Premium";
import RideType from "./RideType";

const AllRides = () => {
    const [currentRide,setCurrentRide] = useState([<Economy></Economy>,<Premium></Premium>,<Luxury></Luxury>,<EconomyLite></EconomyLite>])
    const [currentPage,setCurrentPage] = useState(0)

    
    return ( 
        
        <div className="hero is-fullheight ">
            <div className="hero-head  mx-auto">
                <div className="is-size-1 mt-4 ">Our Ride Types</div>
            </div>

            <div className="hero-body ">
                {currentRide[currentPage]}
            </div>
            <div className="hero-foot ">
                     <div className="has-text-centered">
                        <button className= {`button is-rounded mx-2 mb-5 pop ${currentPage===0 ? "is-white": "is-primary"}`} onClick={()=>{
                            setCurrentPage(0)
                        }}>Economy</button>
                        <button className={`button is-rounded mx-2 mb-5 pop ${currentPage===1 ? "is-white": "is-primary"}`}  onClick={()=>{
                            setCurrentPage(1)
                        }}>Premium</button>
                        <button className={`button is-rounded mx-2 mb-5 pop ${currentPage===2 ? "is-white": "is-primary"}`}  onClick={()=>{
                            setCurrentPage(2)
                        }}>Luxury</button>
                        <button className={`button is-rounded mx-2 mb-5 pop ${currentPage===3 ? "is-white": "is-primary"}`}  onClick={()=>{
                            setCurrentPage(3)
                        }}>Economy Lite</button>
                        
                     </div>
                   </div>
        </div>

    )
}
 
export default AllRides;