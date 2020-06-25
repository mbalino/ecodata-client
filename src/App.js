import React, {useContext} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import Dollar from "./dollar";
import SignUp from "./signUp";
import SignIn from "./signIn";
import UserProfile from "./components/UserProfile";
import UserProvider, {UserContext} from "./providers/UserProvider";

function App() {

    const user = useContext(UserContext);

    return (
            <UserProvider value={user}>
                <Router>
                    <Route path={"/"} exact={true} component={Home} />
                    <Route path={"/dollar"} component={Dollar} />
                    <Route path={"/signIn"} component={SignIn} />
                    <Route path={"/signUp"} component={SignUp} />
                    <Route path={"/userProfile"} component={UserProfile} />
                </Router>
            </UserProvider>
      );
}

export default App;
