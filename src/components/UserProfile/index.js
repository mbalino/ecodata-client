import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { auth } from "../../utils/firebase";
import { Card, Button } from "react-bootstrap";

function UserProfile() {

    const user = useContext(UserContext);
    const {photoURL, displayName, email} = user;

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top"
                          src={ photoURL || 'images/silueta.png' }
                />
                <Card.Body>
                    <Card.Title>{displayName}</Card.Title>
                    <Card.Text>
                        {email}
                    </Card.Text>
                    <Button variant={"primary"}
                            onClick = {() => {auth.signOut()}}>
                        Sign out
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default UserProfile;