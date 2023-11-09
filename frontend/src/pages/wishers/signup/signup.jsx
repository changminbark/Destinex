// import Header from '../../../components/header/header';
import SignupForm from './signup-form-wisher/signup_form_wisher';
import Footer from '../../../components/Footer/footer';
import './signup.css';

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