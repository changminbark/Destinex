import Header from '../../../components/header/header-logo-only/Header';
import SigninForm from './signin-form-wisher/SigninFormWisher';
import Footer from '../../../components/footer/Footer';
import './signin.css';

function Signin() {
    return (
      <div className="signin">
           <Header></Header>
          <SigninForm></SigninForm>
          <Footer />
      </div>
    );
  }
  
export default Signin;