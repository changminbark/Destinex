// import header from '../../../components/header/header';
import SignupForm from './signup-form-granter/SignupFormGranter';
import Footer from '../../../components/footer/Footer';
import './signup.css'

function Signup() {
    return (
      <div className="signup">
          {/* <header></header> */}
          <SignupForm></SignupForm>
          <Footer></Footer>
      </div>
    );
  }
  
export default Signup;