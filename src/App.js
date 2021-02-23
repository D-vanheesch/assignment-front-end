import React from "react";
import { Switch, Route, Redirect} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Header from "./components/header";
import {useAuthState} from "./context/AuthContext";
import StartPage from "./components/startPage";

export default function App() {

  const {isAuthenticated} = useAuthState();

  return (
      <div className="content">
        <Header/>

          <Switch>
            <Route exact path="/">
              <StartPage />
            </Route>

            <Route path="/Startpage">
              <StartPage/>
            </Route>

            <Route path="/Home">
              <Home />
            </Route>

            <Route path="/Signup">
              <SignUp />
            </Route>

            <Route path="/Signin">
              <SignIn />
            </Route>

            <Route path="/Profile">
              {isAuthenticated ? <Profile /> : <Redirect to="/signin"/>}
            </Route>

            <Route path="/">
              <h1>404 not found</h1>
            </Route>

          </Switch>
        </div>
  );
}
