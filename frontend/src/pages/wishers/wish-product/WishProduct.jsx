import Header from '../../../components/header/header-no-background/Header';
import WishProduct from './wish-form-product/WishFormProduct';
import Footer from '../../../components/footer/Footer';
import './wish_product.css';

function WishFormProduct() {
    return (
        <div className="wishProduct">
            <Header></Header>
            <WishProduct></WishProduct>
            <Footer></Footer>
        </div>
    );
}

export default WishFormProduct;