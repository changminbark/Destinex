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
import SetupPage from './pages/granters/setup/setup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupGranter/>}/>
        <Route path="/setup" element={<SetupPage/>}/>
        <Route path="/" element={<SignupWisher/>}/>
        <Route path="/signin" element={<SigninWisher/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;