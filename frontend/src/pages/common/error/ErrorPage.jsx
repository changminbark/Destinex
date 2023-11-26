import {Link} from "react-router-dom";
import Header from "../../../components/header/header-no-background/Header";
import Footer from "../../../components/footer/Footer";
import errorPic from "../../../assets/img/404_error.png";
import "./error_page.css"

function ErrorPage() {
    return (
        <div className={"errorBody"}>
            <Header />
            <div className={"errorMessage"}>
                <div className={"errorPicBody"}>
                    <img className={"errorPic"} src={errorPic} alt={"404_error.png"} />
                </div>
                <div className={"errorLink"}>
                    <Link to={"/granter-home"} className={"errorToHome"}>Wish Your Way Home</Link>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default ErrorPage;