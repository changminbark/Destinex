import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Routes
} from "react-router-dom";

import './App.css';

import {AuthProvider} from "./context/AuthContext";

// Import files for wishers
import SignupWisher from './pages/wishers/signup/Signup';
import SigninWisher from './pages/wishers/signin/Signin';
import Home from "./pages/wishers/home/Home";
import WishProduct from './pages/wishers/wish-product/WishProduct';
import WishRecipient from "./pages/wishers/wish-recipient/WishRecipient";
import WishAdditional from "./pages/wishers/wish-additional/WishAdditional";
import WishSummary from "./pages/wishers/wish-summary/WishSummary";
import WishSuccess from "./pages/wishers/wish-success/WishSuccess";

// Import files for granters
import SignupGranter from './pages/granters/signup/Signup';
import SetupPage from './pages/granters/setup/Setup';
import GranterHome from './pages/granters/granter-home/GranterHome';
import BankAcc from './pages/granters/bank/Bank';
import JobList from "./pages/granters/jobs/JobList";
import WishGranted from "./pages/granters/wish-granted/WishGranted";
import CongratsPage from "./pages/granters/congrats/CongratsPage";
import Details from "./pages/granters/details/Details";

// Import error page
import ErrorPage from "./pages/common/error/ErrorPage";
import WaitingPayment from "./pages/granters/waiting-payment/WaitingPayment";
import WishConfirmation from "./pages/wishers/wish-confirmation/WishConfirmation";


function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<SignupWisher/>}/>
            <Route path="/signin" element={<SigninWisher/>}/>
            <Route path="/wish-product" element={<WishProduct/>}/>
            <Route path="/wish-recipient" element={<WishRecipient/>}/>
            <Route path="/wish-additional" element={<WishAdditional/>}/>
            <Route path="/wish-summary" element={<WishSummary/>}/>
            <Route path="/wish-confirmation" element={<WishConfirmation/>}/>
            <Route path="/wish-success" element={<WishSuccess/>}/>
            <Route path="/granter/signup" element={<SignupGranter/>}/>
            <Route path="/granter/setup" element={<SetupPage/>}/>
            <Route path="/granter/home" element={<GranterHome/>}/>
            <Route path="/granter/bank" element={<BankAcc/>}/>
            <Route path="/granter/jobs" element={<JobList/>} />
            <Route path="/granter/congrats" element={<CongratsPage/>}/>
            <Route path="/granter/details" element={<Details/>}/>
            <Route path="/granter/wish-granted" element={<WishGranted/>}/>
            <Route path="/granter/waiting-payment" element={<WaitingPayment/>}/>
            <Route path="/error" element={<ErrorPage/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;