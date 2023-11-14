// import header from '../../components/header/header';
import SigninForm from './signin-form-wisher/SigninFormWisher';
import Footer from '../../../components/footer/Footer';
import './signin.css';

function Signin() {
    return (
      <div className="signin">
          {/* <header></header> */}
          <SigninForm></SigninForm>
          <Footer />
      </div>
    );
  }
  
export default Signin;