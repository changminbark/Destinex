import Header from '../../../components/header/header-no-background/Header';
import WishRecipient from './wish-form-recipient/WishFormRecipient';
import Footer from '../../../components/footer/Footer';
import './wish_recipient.css';

function WishFormRecipient() {
    return (
        <div className="wishRecipient">
            <Header></Header>
            <WishRecipient></WishRecipient>
            <Footer></Footer>
        </div>
    );
}

export default WishFormRecipient;