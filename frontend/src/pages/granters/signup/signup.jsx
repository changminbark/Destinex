// import Header from '../../../components/header/header';
import SignupForm from './signup-form-granter/signup_form_granter';
import Footer from '../../../components/footer/Footer';
import './signup.css'

function Signup() {
    return (
      <div className="signup">
          {/* <Header></Header> */}
          <SignupForm></SignupForm>
          <Footer></Footer>
      </div>
    );
  }
  
export default Signup;