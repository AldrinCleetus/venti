import { Link } from "react-router-dom";
import { Autocomplete , useJsApiLoader} from "@react-google-maps/api";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const HomePage = ({setLocation,isLoaded}) => {

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  //   libraries:['places'],
  // })

  const originLocation = useRef('')
  const destinationLocation = useRef('')

  const [dataFilled,setDataFilled] = useState(false)

  useEffect(()=>{
    
  },[originLocation,destinationLocation])


  const updateLocation = ()=>{
    if(originLocation.current.value !== '' && destinationLocation.current.value !== ''){
      setDataFilled(true)
    }else{
      setDataFilled(false)
    }
  }

  const passLocationData = ()=>{
      setLocation({
        origin: originLocation.current.value,
        destination: destinationLocation.current.value
      })
    }

   

    return ( 
        <div className="hero is-fullheight my-auto mx-5 ">
        <div className="columns m-0 mt-6">
          <div className="column m-0 p-0 is-hidden-mobile">
            <h3 className="is-size-3 ml-6 has-text-primary ">Find your <strong>Ride!</strong></h3>
            <p className="is-size-5 ml-6">Using our top notch service</p>
            <img src="images/illustration.png" alt="ds" width={600}/>
          </div>

          {isLoaded &&
          <div className="column my-auto is-5 has-background-dark rounded mr-6">
          <div className="field ">
            <label className="label has-text-white is-size-3">Choose Your Destination</label>
            <div className="control has-icons-left">
            <Autocomplete
            onPlaceChanged={updateLocation}>
                  <input className=" input placeholder-color-white has-background-black has-text-white is-rounded is-large " type="text" placeholder="From" ref={originLocation} required />
              </Autocomplete>
              <span className="icon is-medium is-left mt-2 ml-2">
                  <img src="images/button1.svg" alt=""/>
              </span>
            </div>
          </div>
          
          <div className="field mt-5">
            <div className="control has-icons-left">
            <Autocomplete
             onPlaceChanged={updateLocation}>
            <input className="input is-rounded is-large placeholder-color-white has-background-black has-text-white" type="text" placeholder="To" ref={destinationLocation}  required />
            </Autocomplete>
            <span className="icon is-medium mt-2 ml-2 is-left">
            <img src="images/button2.svg" alt="" />
            </span>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control mx-auto">
              {/* <button className="button is-rounded is-primary is-size-4" type="submit" onClick={passLocationData}><Link type="submit" to="/navigation">Find my Ride</Link></button> */}
              <Link onClick={passLocationData}to={dataFilled? "/navigation": "#"} className="button is-rounded is-primary is-size-4">Find my Ride</Link>
            </div>

          </div>
          
        </div>}
          
        </div>
      </div>
     );
}
 
export default HomePage;