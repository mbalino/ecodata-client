import React, { useContext } from 'react';
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import SignIn from "./signIn";
import UserContext from "./providers/UserProvider";

function Home() {

    const user = useContext(UserContext);

    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h1>Welcome to EcoData</h1>
                    <p>
                        Economic data dashboard
                    </p>
                    <hr/>
                    <Button size={"lg"} href={"dollar"}>Dollar</Button>
                </Container>
            </Jumbotron>

            {
                user ?
                    <UserProfile />
                    :
                    <SignIn path="/" />
            }

            <Footer />

        </>
    );
}

export default Home;