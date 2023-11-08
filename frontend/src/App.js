import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Routes
} from "react-router-dom";

import './App.css';
import Signup from './pages/wishers/signup/signup';
import Signin from './pages/wishers/signin/signin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;