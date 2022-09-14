import RideType from "./RideType";
import Stats from "./Stats";

const Navigation = () => {
    return ( 
        <div className="my-auto  has-text-centered">
            <div className="map-container rounded">
                {/* <div className="map has-background-black rounded">
                    <img src="images/test.png" alt="" />
                </div> */}

                {/* <div className="stats-container has-text-white p-5 rounded" id="duration">
                    <div className="count is-size-2">
                        53
                    </div>
                    <div className="status-name has-text-primary">
                        Duration
                    </div>
                </div> */}

                <Stats name={"Distance"} id={"distance"} count={"25 km"}></Stats>
                <Stats name={"Duration"} id={"duration"} count={"18 min"}></Stats>


                {/* Turn these two into components if u can */}
                <div className="destination-from " >
                        <div class="field mt-5">
                        <div class="control has-icons-left">
                        <input class=" input placeholder-color-white has-background-black has-text-white is-rounded is-large " type="email" placeholder="From"/>
                        <span class="icon is-medium is-left">
                            <img src="images/button1.svg" alt=""/>
                        </span>
                    </div>
                    </div>
                </div>

                <div className="destination-to">
                    <div class="field mt-5">
                            <div class="control has-icons-left">
                            <input class="input is-rounded is-large placeholder-color-white has-background-black has-text-white" type="email" placeholder="To"/>
                            <span class="icon is-medium is-left">
                            <img src="images/button2.svg" alt="" />
                            </span>
                        </div>
                        </div>
                </div>


                <RideType id={"economy"}></RideType>
                <RideType id={"premium"}></RideType>

            


            </div>
        </div>
     );
}
 
export default Navigation;