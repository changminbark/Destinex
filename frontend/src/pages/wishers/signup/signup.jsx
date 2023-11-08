// import Header from "../../components/header/header";
import SignupForm from "./signup-form-wisher/signup_form_wisher";
// import Footer from "../../components/footer/footer";
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