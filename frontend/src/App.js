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
import SignupWisher from './pages/wishers/signup/signup';
import SigninWisher from './pages/wishers/signin/signin';

// Import files for granters
import SignupGranter from './pages/granters/signup/signup';

// Import error page
import ErrorPage from "./pages/common/ErrorPage/ErrorPage";
import CongratsPage from "./pages/granters/CongratsPage/CongratsPage";
import Home from "./pages/wishers/home/Home";
import {AuthProvider} from "./context/AuthContext";

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<SignupGranter/>}/>
            <Route path="/signin" element={<SigninWisher/>}/>
            <Route path="/error" element={<ErrorPage/>}/>
            <Route path="/congrats" element={<CongratsPage />}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;