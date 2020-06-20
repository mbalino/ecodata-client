import React from 'react';
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

function Home() {
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
        </>
    );
}

export default Home;