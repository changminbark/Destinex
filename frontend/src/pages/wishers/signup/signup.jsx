// import Header from "../../components/header/header";
<<<<<<< HEAD
import SignupForm from "./signup-form/signup_form";
=======
import SignupForm from "./signup-form-wisher/signup_form_wisher";
// import Footer from "../../components/footer/footer";
>>>>>>> 706efba (Complete Sign Up page for granters)
import './signup.css'
import Footer from "../../../components/footer/footer";
import React from "react";

function Signup() {
    return (
      <div className="signup">
          {/* <Header></Header> */}
          <SignupForm></SignupForm>
          <Footer />
      </div>
    );
  }
  
export default Signup;