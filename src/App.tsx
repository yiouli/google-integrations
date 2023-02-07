import { BrowserRouter, Link, Route } from "react-router-dom";
import SignIn from "./sign-in";

function App() {
  return <BrowserRouter>
    <div>
      <Link to='/sign-in'>Sign In</Link>
    </div>
    <div>
      <Route path='/sign-in'><SignIn /></Route>
      <Route path='/'><div>Various examples of integration with Google APIs.</div></Route>
    </div>
  </BrowserRouter>;
}

export default App;
