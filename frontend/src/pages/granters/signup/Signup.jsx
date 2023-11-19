import Header from '../../../components/header/header-no-background/Header';
import SignupForm from './signup-form-granter/SignupFormGranter';
import Footer from '../../../components/footer/Footer';
import './signup.css'

function Signup() {
    return (
      <div className="signup">
          <Header></Header>
          <SignupForm></SignupForm>
          <Footer></Footer>
      </div>
    );
  }
  
export default Signup;