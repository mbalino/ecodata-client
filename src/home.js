import React, { useContext } from 'react';
import {Button, Jumbotron, Container, Row, Col} from "react-bootstrap";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import SignIn from "./signIn";
import { UserContext } from "./providers/UserProvider";

function Home() {

    const user = useContext(UserContext);

    return (
        <>
            <Container>
                <Row>
                    <Col sm={8}>
                        <Jumbotron fluid>
                            <h1>Welcome to EcoData</h1>
                            <p>
                                Economic data dashboard
                            </p>
                            <hr/>
                            <Button size={"lg"} href={"dollar"}>Dollar</Button>
                        </Jumbotron>
                    </Col>
                    <Col xs sm={4}>
                        {
                            user ?
                                <UserProfile />
                                :
                                <SignIn path="/" />
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Footer />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;