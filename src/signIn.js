import React, { useState } from "react";
import { signInWithGoogle } from "./utils/firebase";
import { auth } from "./utils/firebase";
import {Button, Col, Form, Row} from "react-bootstrap";

function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
        });
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <div>
                {error !== null && <div>{error}</div>}
                <Form>
                    <Form.Group controlId={"formSignIn"}>
                        <Row>
                            <Col>
                                <Form.Label column={true}>
                                    Email:
                                </Form.Label>
                                <Form.Control
                                    placeholder={"Your name"}
                                    type={"email"}
                                    id={"userEmail"}
                                    value={email}
                                    onChange={(event) => onChangeHandler(event)}
                                />
                            </Col>
                            <Col>
                                <Form.Label column={true}>
                                    Password:
                                </Form.Label>
                                <Form.Control
                                    placeholder={"Your password"}
                                    type={"password"}
                                    id={"userPassword"}
                                    value={password}
                                    onChange={(event) => onChangeHandler(event)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Button
                        variant={"primary"}
                        onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
                    >
                        Sign in
                    </Button>
                </Form>
                <p>or</p>
                <Button variant={"primary"}
                        onClick={() => {
                            signInWithGoogle();
                        }}>

                    Sign in with Google
                </Button>
                <p>
                    Don't have an account?{" "}
                    <a href={"signUp"}>
                        Sign up here
                    </a>{" "}
                    <br />{" "}
                    <a href={"passwordReset"}>
                        Forgot Password?
                    </a>
                </p>
            </div>
        </div>
    );
}

export default SignIn;