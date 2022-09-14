const HomePage = () => {
    return ( 
        <div className=" my-auto mx-5">
        <div className="columns">
          <div className="column">
            <h3 className="is-size-3 ml-6 has-text-primary">Find your <strong>Ride!</strong></h3>
            <p className="is-size-5 ml-6 ">Using our top notch service</p>
            <img src="images/illustration.png" alt="ds" width={600}/>
          </div>

          <div className="column my-auto is-5 has-background-dark rounded mr-6 ">
            <div class="field ">
              <label class="label has-text-white is-size-3">Choose Your Destination</label>
              <div class="control has-icons-left">
                <input class="input is-rounded is-large " type="email" placeholder="From"/>
                <span class="icon is-medium is-left">
                  <img src="images/button1.svg" alt="" />
                </span>
              </div>
            </div>
            <div class="field mt-5">
              <div class="control has-icons-left">
                <input class="input is-rounded is-large " type="email" placeholder="To"/>
                <span class="icon is-medium is-left">
                  <img src="images/button2.svg" alt="" />
                </span>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control mx-auto">
                <button class="button is-rounded is-primary is-size-4">Find my Ride</button>
              </div>
  
            </div>
          </div>
          
        </div>
      </div>
     );
}
 
export default HomePage;