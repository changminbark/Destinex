import Header from '../../../components/Header/HeaderLogoOnly/Header';
import SignupForm from './signup-form-wisher/signup_form_wisher';
import Footer from '../../../components/footer/footer';
import './signup.css';

function Signup() {
    return (
      <div className="signup">
          {/*<Header isLogin={false}></Header>*/}
          <Header></Header>
          <SignupForm></SignupForm>
          <Footer></Footer>
      </div>
    );
  }

export default Signup;