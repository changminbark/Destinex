import Header from '../../../components/Header/HeaderPurple/Header';
import Footer from '../../../components/footer/footer';

function Signup() {
    return (
        <div className="signup">
            {/*<Header isLogin={false}></Header>*/}
            <Header isLogin={true}></Header>
            <div>This is a placeholder home page</div>
            <Footer></Footer>
        </div>
    );
}

export default Signup;
