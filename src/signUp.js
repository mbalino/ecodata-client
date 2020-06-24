import React, {  useState } from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import { auth, signInWithGoogle, generateUserDocument } from "./utils/firebase";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, {displayName});

            user.sendEmailVerification().then(function () {
                alert('Verification email sent.');
            }).catch(function (error) {
                setError('Error sending verification email:' + error);
            })
        }
        catch(error){
            setError('Error Signing up with email and password');
        }

        setEmail("");
        setPassword("");
        setDisplayName("");
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "displayName") {
            setDisplayName(value);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                {error !== null && (
                    <div>
                        {error}
                    </div>
                )}
                <Form>
                    <Form.Group controlId={"formSignUp"}>
                        <Row>
                            <Col>
                                <Form.Label>
                                        Display Name:
                                </Form.Label>
                                <Form.Control placeholder={"Your Name"}
                                              type={"text"}
                                              id={"displayName"}
                                              value={displayName}
                                              onChange={event => onChangeHandler(event)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>
                                    Email:
                                </Form.Label>
                                <Form.Control placeholder={"mail@example.com"}
                                              type={"email"}
                                              id={"userEmail"}
                                              value={email}
                                              onChange={event => onChangeHandler(event)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>
                                    Password:
                                </Form.Label>
                                <Form.Control placeholder={"mail@example.com"}
                                              type={"password"}
                                              id={"userPassword"}
                                              value={password}
                                              onChange={event => onChangeHandler(event)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Button variant={"primary"}
                            onClick={event => {
                            createUserWithEmailAndPasswordHandler(event, email, password);
                        }}
                    >
                        Sign up
                    </Button>
                </Form>
                <p>
                    <br />
                    or
                </p>
                <Button variant={"primary"}
                        onClick={() => {
                        try {
                            signInWithGoogle();
                        } catch (error) {
                            console.error("Error signing in with Google", error);
                        }
                    }}
                >
                    Sign In with Google
                </Button>
                <br /><br />
                <p>
                    Already have an account?{" "}
                    <a href={"/"}>
                        Sign in here
                    </a>{" "}
                </p>
            </div>
        </div>
    );
}

export default SignUp;