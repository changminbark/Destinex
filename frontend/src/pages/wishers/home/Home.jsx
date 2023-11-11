import Header from '../../../components/header/header-purple/Header';
import Footer from '../../../components/footer/Footer';
import { useAuth } from '../../../networks/hooks/UseAuth';

function Signup() {
    const { isLoggedIn } = useAuth();

    return (
        <div className="signup">
            {
                isLoggedIn ? (
                    <Header isLogin={true}></Header>
                ) : (
                    <Header isLogin={false}></Header>
                )
            }

            <div>This is a placeholder home page</div>
            <Footer></Footer>
        </div>
    );
}

export default Signup;
