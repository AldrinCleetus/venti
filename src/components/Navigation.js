import RideType from "./RideType";
import Stats from "./Stats";

import { GoogleMap,Marker, useJsApiLoader, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useMemo, useRef, useState } from "react";
import Loading from "./Loading";



const Navigation = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries:['places'],
      })

    const currentlocationRef = useRef()
    const destinationRef = useRef()


    const [directionResponse,setDirectionsResponse] = useState(null)
    const [distance,setDistance] = useState('NA')
    const [duration,setDuration] = useState('NA')
    const [cost,setCost] = useState('NA')


    // 0 -> selecting car type, 1-> Confirmation?
    const [processStage,setProcessStage] = useState(0)
    // Default Center
    const [center,setCenter] = useState({
        lat: 6.6418,
        lng: 3.3515
    })


    const [cabsNearMe,setCabsNearMe] = useState([{
        driver: "John",
        cabType: "economy",
        distance: "3", //km
        isSelected: false,
        location: {
            lng: center.lng + Math.random() * 0.01 ,
            lat: center.lat + Math.random() * 0.01 
        }
    },
    {
        driver: "Jane",
        cabType: "premium",
        distance: "5", //km
        isSelected: true,
        location: {
            lat:  center.lat + Math.random() * 0.01 ,
            lng: center.lng + Math.random() * 0.01 
        }
    },
    {
        driver: "Mathew",
        cabType: "economy",
        distance: "7", //km
        isSelected: false,
        location: {
            lat: center.lat + Math.random() * 0.01 ,
            lng: center.lng + Math.random() * 0.01 
        }
    },
    {
        driver: "Elton",
        cabType: "premium",
        distance: "6", //km
        isSelected: false,
        location: {
            lat: center.lat + Math.random() * 0.01 ,
            lng: center.lng + Math.random() * 0.01 
        }
    }])

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
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: [
                {
                    // eslint-disable-next-line no-undef
                    location: new google.maps.LatLng(6.4698,3.5852)
                },
                {
                    // eslint-disable-next-line no-undef
                    location: new google.maps.LatLng(6.6018,3.3515)
                }]
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

    const nextProcess = ()=>{
        setProcessStage( processStage + 1)
    }

    const cancelBooking = ()=>{
        setProcessStage(0)
    }

    const selectCab = (selectedCabId)=>{
        const newCabs = cabsNearMe.map( (ele,idx) =>{
            if(idx === selectedCabId){
                return({
                    ...ele,
                    isSelected:true
                }) 
            }
            else{
                return({
                    ...ele,
                    isSelected:false
                })
            }
        })

        setCabsNearMe(newCabs)

    }

    




    const buttonpressed = (e)=>{
       

        console.log((currentlocationRef.current.value))
    }


    const [place,setCurrentPlace] = useState(1)

    const [loading,setLoading] = useState(false)

   

    const [newCoords,setNewCoords] = useState(center) 
   
    useEffect(()=>{
        console.log(newCoords)
        setCenter(newCoords)
    },[newCoords])

    const getCoordinates = async ()=>{

        const formattedAddress = currentlocationRef.current.value.replace(/\s/g, '')
        console.log("fetching ",formattedAddress)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            
            setNewCoords({
                    lat:5.4,
                    lng:7.2
                })
        }, 2000);

        // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
        // .then(res =>{
        //     if(res.ok){
        //         return res.json()
        //     }
        // })
        // .then(data =>{
        //     setNewCoords({
        //         lat:data.results[0].geometry.location.lat,
        //         lng:data.results[0].geometry.location.lng
        //     })
        // })
    }

   


    

 





    return ( 

        

        <div className="my-auto  has-text-centered">
            {!isLoaded && <Loading></Loading>}
            {loading && <Loading></Loading>}
            <div className="map-container rounded">

            

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


                
                
                
                {/* {cabsNearMe.map((el,i)=>{
                    return (<Marker position={el.location} key={i}></Marker>)
                })} */}
               
               

                {/* Turn these two into components if u can */}
                {/* <div className="destination-from " >
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
                </div> */}


                <div className="search-bars columns ">
                    <div className="column ">
                        <div class="field mt-5">
                                <div class="control has-icons-left">
                                    <Autocomplete
                                    onPlaceChanged={getCoordinates}>
                                        <input class=" input placeholder-color-white has-background-black has-text-white is-rounded is-large " type="email" placeholder="From" ref={currentlocationRef}/>
                                    </Autocomplete>
                                    <span class="icon is-medium is-left mt-2 ml-2">
                                        <img src="images/button1.svg" alt=""/>
                                    </span>

                                </div>
                        </div>
                    </div>
                    <div className="column ">
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

                </div>

                {/* <div class="confirm" >
                <button class="button is-rounded is-primary is-size-4" onClick={calculateDistance}>Confirm</button>
                </div>
                <div class="cancel" >
                <button class="button is-rounded is-primary is-size-4" onClick={clearRoute}>Cancel</button>
                </div> */}
           
                

              


                {
                    processStage === 0 && <div className="ride-type columns is-multiline ">
        
                    {cabsNearMe.map((el,idx)=>{
                        return(
                            <RideType id={el.cabType} selected={el.isSelected} key={idx} onClick={selectCab} index={idx}></RideType>
                        )
                    })}

                </div>
                }


                {
                    processStage === 1 &&   
                    
                    <div className="stats columns m-0 mx-auto">
                        <Stats name={"Distance"} count={distance}></Stats>
                        <Stats name={"Duration"} count={duration}></Stats>
                        <Stats name={"Cost"} count={cost}></Stats>
                    </div>
                }



                <div className="columns buttons">
                    {processStage === 0 && 
                    <div className="column">
                        <button class="button is-rounded is-primary is-size-4" onClick={ nextProcess}>Confirm Pick Up</button>
                    </div>
                    }
                    {processStage === 1 && 
                    <div className="column">
                        <button class="button is-rounded is-primary is-size-4" onClick={nextProcess}>Book </button>
                    </div>
                    }
                    <div className="column">
                        <button class="button is-rounded is-primary is-size-4" onClick={cancelBooking}>Cancel </button>
                    </div>
                    
                    
                </div>


               
            </GoogleMap>}

                
            


            </div>
        </div>
     );
}
 
export default Navigation;