import RideType from "./RideType";
import Stats from "./Stats";

import { GoogleMap,Marker, useJsApiLoader, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useRef, useState } from "react";
import Loading from "./Loading";



const Navigation = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries:['places'],
      })

    

    const center = {
        lat: 53.161910, 
        lng: -7.190269
    };


    const currentlocationRef = useRef()
    const destinationRef = useRef()


    const [directionResponse,setDirectionsResponse] = useState(null)
    const [distance,setDistance] = useState('')
    const [duration,setDuration] = useState('')
    const [cost,setCost] = useState('')


    const calculateDistance = async()=>{
        if(currentlocationRef.current.value === "" || destinationRef.current.value === ""){
            return
        }

        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
            origin:currentlocationRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
        })

        setDirectionsResponse(results)
        // Take the first route 
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)



    }

    const clearRoute = ()=>{
        setDirectionsResponse(null)
        setDuration("")
        setDistance("")
        currentlocationRef.current.value = ""
        destinationRef.current.value = ""
    }



    return ( 

        

        <div className="my-auto  has-text-centered">
            <div className="map-container rounded">

            {!isLoaded && <Loading></Loading>}

            {isLoaded && <GoogleMap
                mapContainerStyle={{width:"100%",height:"100%"}}
                center={center}
                zoom={10}
                options={{
                    mapTypeControl:false,
                    fullscreenControl:false,
                    streetViewControl:false
                }}
                >
            {directionResponse && 
            <DirectionsRenderer
            directions={directionResponse}
            ></DirectionsRenderer>}

<Stats name={"Distance"} id={"distance"} count={distance}></Stats>
                <Stats name={"Duration"} id={"duration"} count={duration}></Stats>
                <Stats name={"Cost"} id={"cost"} count={cost}></Stats>


                {/* Turn these two into components if u can */}
                <div className="destination-from " >
                        <div class="field mt-5">
                        <div class="control has-icons-left">
                        <Autocomplete>
                            <input class=" input placeholder-color-white has-background-black has-text-white is-rounded is-large " type="email" placeholder="From" ref={currentlocationRef}/>
                        </Autocomplete>
                        <span class="icon is-medium is-left mt-2 ml-2">
                            <img src="images/button1.svg" alt=""/>
                        </span>
                        
                    </div>
                    </div>
                </div>


                <div className="destination-to">
                    <div class="field mt-5">
                            <div class="control has-icons-left">
                            <Autocomplete>
                            <input class="input is-rounded is-large placeholder-color-white has-background-black has-text-white" type="email" placeholder="To" ref={destinationRef}/>
                            </Autocomplete>
                            <span class="icon is-medium mt-2 ml-2 is-left">
                            <img src="images/button2.svg" alt="" />
                            </span>
                        </div>
                        </div>
                </div>

                <div class="confirm" >
                <button class="button is-rounded is-primary is-size-4" onClick={calculateDistance}>Confirm</button>
                </div>
                <div class="cancel" >
                <button class="button is-rounded is-primary is-size-4" onClick={clearRoute}>Cancel</button>
                </div>
           


                <RideType id={"economy"}></RideType>
                <RideType id={"premium"}></RideType>



            </GoogleMap>}

                
            


            </div>
        </div>
     );
}
 
export default Navigation;