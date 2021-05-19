import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import SignIn from "./Pages/SignIn/SignIn.page";
import SignUp from "./Pages/SignUp/SignUp.page";
import User from "./Pages/User/User.page";
import Redirect from "./Components/Redirect/Redirect.component";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/me" exact>
          <User />
        </Route>
        <Route path="*">
          <Redirect />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
