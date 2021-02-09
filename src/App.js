import React from "react";
import { Switch, Route,} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Header from "./components/header";

export default function App() {
  return (
      <div className="content">
        <Header/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/Signup">
              <SignUp />
            </Route>

            <Route path="/Signin">
              <SignIn />
            </Route>

            <Route path="/Profile">
              <Profile />
            </Route>

            <Route path="/Contact">
              <Contact />
            </Route>

            <Route path="/">
              <h1> 404 not found </h1>
            </Route>

          </Switch>
        </div>

  );
}
