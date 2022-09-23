import RideType from "./RideType";
import Stats from "./Stats";

import { GoogleMap,Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";




const Navigation = ({location,isLoaded}) => {

    

    const currentlocationRef = useRef('')
    const destinationRef = useRef('')

    const [directionResponse,setDirectionsResponse] = useState(null)
    const [distance,setDistance] = useState()
    const [duration,setDuration] = useState()
    const [cost,setCost] = useState()




    // 0 -> selecting car type, 1-> Confirmation?
    const [processStage,setProcessStage] = useState(0)
    // Default Center
    const [center,setCenter] = useState({
        lat: 6.6418,
        lng: 3.3515
    })


    const [cabsNearMe,setCabsNearMe] = useState([{
        cabType: "economy",
        isSelected: false
    },
    {
        cabType: "premium",
        isSelected: true
    },
    {
        cabType: "luxury",
        isSelected: false
    }  
    ])


    const [modal,setModal] = useState(false)

    const toggleModal  = ()=>{
        setModal( modal? false : true)
    }

    const calculateDistance = async(origin,destination)=>{


        console.log("calculating distance")
        if(origin === "" || destination === ""){
            console.log("returning")
            return
        }

        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
            origin: origin , // currentlocationRef.current.value,
            destination: destination, //destinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
            // waypoints: [
            //     {
            //         // eslint-disable-next-line no-undef
            //         location: new google.maps.LatLng(6.4698,3.5852)
            //     },
            //     {
            //         // eslint-disable-next-line no-undef
            //         location: new google.maps.LatLng(6.6018,3.3515)
            //     }]
        })

        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        const cabFare = calculateCost(results.routes[0].legs[0].distance.text)
        setCost(cabFare)

    }

    const clearRoute = ()=>{
        setDirectionsResponse(null)
        setDuration("")
        //setDistance("")
        currentlocationRef.current.value = ""
        destinationRef.current.value = ""
    }


    const nextProcess = ()=>{
        if(directionResponse !== null){
            setProcessStage( processStage + 1)
        }
        if(processStage === 1){
            setModal(true)
        }
    }

    const cancelBooking = ()=>{
        setProcessStage(0)
        clearRoute()
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
        //nextProcess()

    }
    

    useEffect(()=>{
        if(isLoaded){
            console.log("Calculating Initial Distance")
            calculateDistance(location.origin,location.destination)    
        }
    },[])
    

   

    const locationChanged = async()=>{
        console.log('location changed')
        setProcessStage(0)
        await calculateDistance(currentlocationRef.current.value ,destinationRef.current.value)
    }


    const setInitialValues = ()=>{
        currentlocationRef.current.value = location.origin
        destinationRef.current.value = location.destination
    }

    useEffect(()=>{
        if(distance){
            const cabFare = calculateCost(distance)
            setCost(cabFare)
        }
        
    },[cabsNearMe])
    
    const calculateCost = (currentDistance)=>{
        const intitalFare = 20 // Booking Fee
        const costPerKM = 11 // Rupees per km
        const hours = new Date().getHours()
        const isDayTime = hours > 6 && hours < 20
        let dayTimeCostMultiplier = 1
        if(isDayTime){
            dayTimeCostMultiplier = 1.2
        }

        let cabMultiplier = 1

        const cabType  = cabsNearMe.map((el,idx)=>{
            if(el.isSelected){
                switch (el.cabType) {
                    case "economy":
                        cabMultiplier = 1.2
                        break;
                    case "premium":
                        cabMultiplier = 1.4
                        break;
                    case "luxury":
                        cabMultiplier = 2
                        break;
                    default:
                        cabMultiplier = 1
                        break;
                }
            }
        })

        

        

 
        let distanceValue = currentDistance.split(' ')[0]
        
        const totalCost = Math.round((costPerKM * distanceValue) * dayTimeCostMultiplier   + intitalFare) * cabMultiplier
        console.log('calcualting cost ',totalCost," - ",cabMultiplier)
        return (totalCost+" ₹")
    }


    // const getCoordinates = async ()=>{

    //     if(currentlocationRef.current.value === "" || destinationRef.current.value === ""){
    //         //calculateDistance(location.origin,location.destination)
    //         return
    //     }

        

    //     const formattedAddress = location.origin.replace(/\s/g, '')
    //     console.log("fetching ",formattedAddress)
    //     setLoading(true)
    //     // setTimeout(() => {
    //     //     setLoading(false)
            
    //     //     setNewCoords({
    //     //             lat:5.4,
    //     //             lng:7.2
    //     //         })

                
    //     // }, 2000);

    //     // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
    //     // .then(res =>{
    //     //     if(res.ok){
    //     //         return res.json()
    //     //     }
    //     // })
    //     // .then(data =>{
    //     //     setLoading(false)
    //     //     setNewCoords({
    //     //         lat:data.results[0].geometry.location.lat,
    //     //         lng:data.results[0].geometry.location.lng
    //     //     })
    //     // })
    // }

 





    return ( 

        

        <div className="my-auto  has-text-centered">
            {!isLoaded && <Loading></Loading>}
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


                <div className="search-bars columns ">
                    <div className="column ">
                        <div className="field mt-5">
                                <div className="control has-icons-left">
                                    <Autocomplete
                                    onLoad={setInitialValues}
                                    onPlaceChanged={locationChanged}
                                    >
                                        <input className=" input placeholder-color-white has-background-black has-text-white is-rounded is-large " type="email" placeholder="From" ref={currentlocationRef}
                                        />
                                    </Autocomplete>
                                    <span className="icon is-medium is-left mt-2 ml-2">
                                        <img src="images/button1.svg" alt=""/>
                                    </span>

                                </div>
                        </div>
                    </div>
                    <div className="column ">
                    <div className="field mt-5">
                            <div className="control has-icons-left">
                            <Autocomplete
                            onPlaceChanged={locationChanged}>
                            <input className="input is-rounded is-large placeholder-color-white has-background-black has-text-white" type="email" placeholder="To" ref={destinationRef}/>
                            </Autocomplete>
                            <span className="icon is-medium mt-2 ml-2 is-left">
                            <img src="images/button2.svg" alt="" />
                            </span>
                        </div>
                        </div>
                    </div>

                </div>



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
                        <button className="button is-rounded is-primary is-size-4" onClick={ nextProcess}>Book</button>
                    </div>
                    }
                    {processStage === 1 && 
                    <div className="column">
                        <button className="button is-rounded is-primary is-size-4" onClick={nextProcess}>Confirm </button>
                    </div>
                    }
                   {processStage > 0 && <div className="column">
                        <button className="button is-rounded is-primary is-size-4" onClick={cancelBooking}>Cancel </button>
                    </div>}
                    
                    
                </div>




               
            </GoogleMap>}

                
            


            </div>

            <div className={`modal ${modal? "is-active": ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <button className="button is-large is-rounded is-primary" onClick={toggleModal}>Thank you for using Venti to Book your cab!</button>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
            </div>
        </div>
     );
}
 
export default Navigation;