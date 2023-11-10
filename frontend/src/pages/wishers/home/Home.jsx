import Header from '../../../components/Header/HeaderPurple/Header';
import Footer from '../../../components/footer/footer';
import { useAuth } from '../../../networks/hooks/useAuth';

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
