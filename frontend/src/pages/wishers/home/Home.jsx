import Header from '../../../components/header/header-purple/Header';
import Footer from '../../../components/footer/Footer';
import { useAuth } from '../../../networks/hooks/UseAuth';

function Home() {
    const { isLoggedIn } = useAuth();

    return (
        <div className="signup">
            {
                isLoggedIn ? (
                    <Header isLogin={true} isGrant={false}></Header>
                ) : (
                    <Header isLogin={false}></Header>
                )
            }

            <div>This is a placeholder home page</div>
            <Footer></Footer>
        </div>
    );
}

export default Home;
