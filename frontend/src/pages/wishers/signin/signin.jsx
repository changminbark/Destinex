// import Header from "../../components/header/header";
<<<<<<< HEAD
import SigninForm from "./signin-form/signin_form";
import Footer from "../../../components/footer/footer";
=======
import SigninForm from "./signin-form-wisher/signin_form_wisher";
// import Footer from "../../components/footer/footer";
>>>>>>> 706efba (Complete Sign Up page for granters)
import './signin.css'

function Signin() {
    return (
      <div className="signin">
          {/* <Header></Header> */}
          <SigninForm></SigninForm>
           <Footer />
      </div>
    );
  }
  
export default Signin;