import { Link } from "react-router-dom";
import { Autocomplete , useJsApiLoader} from "@react-google-maps/api";
import { useRef } from "react";

const HomePage = ({setLocation,isLoaded}) => {

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  //   libraries:['places'],
  // })

  const originLocation = useRef('')
  const destinationLocation = useRef('')

  const passLocationData = ()=>{
      setLocation({
        origin: originLocation.current.value,
        destination: destinationLocation.current.value
      })
    }

   

    return ( 
        <div className=" my-auto mx-5">
        <div className="columns m-0">
          <div className="column m-0 p-0">
            <h3 className="is-size-3 ml-6 has-text-primary ">Find your <strong>Ride!</strong></h3>
            <p className="is-size-5 ml-6">Using our top notch service</p>
            <img src="images/illustration.png" alt="ds" width={600}/>
          </div>

          {isLoaded &&
          <div className="column my-auto is-5 has-background-dark rounded mr-6 ">
          <div class="field ">
            <label class="label has-text-white is-size-3">Choose Your Destination</label>
            <div class="control has-icons-left">
            <Autocomplete>
                  <input class=" input placeholder-color-white has-background-black has-text-white is-rounded is-large " type="email" placeholder="From" ref={originLocation}/>
              </Autocomplete>
              <span class="icon is-medium is-left mt-2 ml-2">
                  <img src="images/button1.svg" alt=""/>
              </span>
            </div>
          </div>
          <div class="field mt-5">
            <div class="control has-icons-left">
            <Autocomplete>
            <input class="input is-rounded is-large placeholder-color-white has-background-black has-text-white" type="email" placeholder="To" ref={destinationLocation} />
            </Autocomplete>
            <span class="icon is-medium mt-2 ml-2 is-left">
            <img src="images/button2.svg" alt="" />
            </span>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control mx-auto">
              <button class="button is-rounded is-primary is-size-4" onClick={passLocationData}><Link to="/navigation">Find my Ride</Link></button>
            </div>

          </div>
        </div>}
          
        </div>
      </div>
     );
}
 
export default HomePage;