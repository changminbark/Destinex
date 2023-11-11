// import Header from '../../../components/header/header';
import Requirement from './requirement/requirement';
import SetupPage from './setup-fom/setup_form';
import Footer from '../../../components/footer/footer';
import './setup.css'

function Setup() {
    return (
        <div className="setup">
            {/* <Header></Header> */}
            <Requirement></Requirement>
            <SetupPage></SetupPage>
            <Footer></Footer>
        </div>
    );
}

export default Setup;