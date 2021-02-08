import React from "react";
import { Switch, Route,} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

export default function App() {
  return (

      <div className="content">
            {/*<ul>*/}
            {/*  <li>*/}
            {/*    <Link to="/">Home</Link>*/}
            {/*  </li>*/}

            {/*  <li>*/}
            {/*    <Link to="/Signup">Sign up</Link>*/}
            {/*  </li>*/}

            {/*  <li>*/}
            {/*    <Link to="/Signin">Sign in</Link>*/}
            {/*  </li>*/}

            {/*  <li>*/}
            {/*    <Link to="/Profile">Profile</Link>*/}
            {/*  </li>*/}

            {/*  <li>*/}
            {/*    <Link to="/Contact">Contact</Link>*/}
            {/*  </li>*/}

            {/*</ul>*/}

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
