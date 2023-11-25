import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Routes
} from "react-router-dom";

import './App.css';

// Import files for wishers
import SignupWisher from './pages/wishers/signup/Signup';
import SigninWisher from './pages/wishers/signin/Signin';
import WishProduct from './pages/wishers/wish-product/WishProduct';
import WishRecipient from "./pages/wishers/wish-recipient/WishRecipient";
import WishAdditional from "./pages/wishers/wish-additional/WishAdditional";

// Import files for granters
import SignupGranter from './pages/granters/signup/Signup';
import SetupPage from './pages/granters/setup/Setup';
import BankAcc from './pages/granters/bank/Bank';

// Import error page
import ErrorPage from "./pages/common/error/ErrorPage";
import CongratsPage from "./pages/granters/congrats/CongratsPage";
import Home from "./pages/wishers/home/Home";
import {AuthProvider} from "./context/AuthContext";
import JobList from "./pages/granters/jobs/JobList";

function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<SignupWisher/>}/>
            <Route path="/signin" element={<SigninWisher/>}/>
            <Route path="/wishproduct" element={<WishProduct/>}/>
            <Route path="/wishrecipient" element={<WishRecipient/>}/>
            <Route path="/wishadditional" element={<WishAdditional/>}/>
            <Route path="/granter/signup" element={<SignupGranter/>}/>
            <Route path="/granter/setup" element={<SetupPage/>}/>
            <Route path="/granter/bank" element={<BankAcc/>}/>
            <Route path={"/granter/jobs"} element={<JobList/>} />
            <Route path="/granter/congrats" element={<CongratsPage />}/>
            <Route path="/error" element={<ErrorPage/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;