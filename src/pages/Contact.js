import Navbar from "../components/Navbar";
import "../css/contact.css"
import contactimg from "../assets/contact.jpg"
const Contact = () => {
    return (
        <>
         <Navbar/>
            <div class="bg-background"></div>
            <div class="container py-5">
                <div class="row py-2 g-3">
                    <div class="col-md-8 first_col ">
                        <h1 class="text-center mt-3">Contact Us</h1>
                        <form class=" contactcont p-5 mt-5">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label" style={{paddingTop:"-90px"}}>Enter your Name</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email ID</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Enter your massage</label>
                                <textarea type="text" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div>
                                <button class="contactbutton" >Send </button>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6 sec_col">
                        <img src={contactimg}
                            class="img-fluid2" alt="presentation" />
                    </div>
                </div>
                <div class="row-last">
                    <div class="row row-cols-1 row-cols-md-3  p-3 text-white">
                        <div class="col">
                            <h4>CALL US</h4>
                            <p>+917866655555,<br />+91786543211,<br />+919876543210</p>
                        </div>
                        <div class="col">
                            <h4>LOCATION</h4>
                            <p>Street: koramangla, 114 16th Main Road<br /> City: Bengaluru<br /> County: India<br /> State: Karnataka<br />Zip/Postcode: 560029 </p>
                        </div>
                        <div class="col">
                            <h4>Email</h4>
                            <p>contacts@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Contact 