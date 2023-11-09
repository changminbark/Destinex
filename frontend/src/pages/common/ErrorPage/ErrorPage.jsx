import {Link} from "react-router-dom";
import Footer from "../../../components/footer/footer";
import errorPic from "../../../assets/img/404_error.png";
import "./ErrorPage.css"

function ErrorPage() {
    return (
        <div className={"errorBody"}>
            {/*<Header />*/}
            <div className={"errorMessage"}>
                <div className={"errorPicBody"}>
                    <img className={"errorPic"} src={errorPic} alt={"404_error.png"} />
                </div>
                <div className={"errorLink"}>
                    <Link to={"home"} className={"errorToHome"}>Wish Your Way Home</Link>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default ErrorPage;