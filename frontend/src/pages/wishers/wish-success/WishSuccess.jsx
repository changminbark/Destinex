import {Link} from "react-router-dom";
import Header from "../../../components/header/header-no-background/Header";
import Footer from "../../../components/footer/Footer";
import "./wish_success.css"
import circledTick from "../../../assets/svg/circled-tick.svg"

function WishSuccess() {
    return (
        <div className="wishSuccess">
            <Header />
            <div className="wishSuccessContainer">
                <div className="circledTickPic">
                    <img className="circledTickIcon" src={circledTick} alt="Circled Tick Icon" />
                </div>

                <div className="wishSuccessTitle">
                    <span className="wishSuccessTitleText">Your Wish is Confirmed!</span>
                </div>

                <div className="wishSuccessMessage">
                    <span className="wishSuccessThankYouMessage">Thank you for making a wish with us.</span>
                    <span className="wishSuccessConfirmationMessage">We will send you a delivery confirmation email as soon as your wish is granted.</span>
                </div>


                <Link to={"/"} className="wishSuccessButton">
                    More Wishes
                </Link>

            </div>
            <Footer />
        </div>

    );
}

export default WishSuccess;