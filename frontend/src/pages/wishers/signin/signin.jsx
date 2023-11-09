// import Header from '../../components/header/header';
import SigninForm from './signin-form-wisher/signin_form_wisher';
import Footer from '../../../components/Footer/footer';
import './signin.css';

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