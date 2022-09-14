import Stats from "./Stats";

const Navigation = () => {
    return ( 
        <div className="my-auto has-background-grey has-text-centered">
            <div className="map-container">
                <div className="map has-background-black rounded">
                    <img src="images/test.png" alt="" />
                </div>

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


            </div>
        </div>
     );
}
 
export default Navigation;