// import header from '../../../components/header/header';
import Requirement from './requirement/Requirement';
import SetupPage from './setup-fom/SetupForm';
import Footer from '../../../components/footer/Footer';
import './setup.css'

function Setup() {
    return (
        <div className="setup">
            {/* <header></header> */}
            <Requirement></Requirement>
            <SetupPage></SetupPage>
            <Footer></Footer>
        </div>
    );
}

export default Setup;