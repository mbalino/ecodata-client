import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { auth } from "../../utils/firebase";
import { Image } from "react-bootstrap";

const UserProfile = () => {

    const user = useContext(UserContext);
    const {photoURL, displayName, email} = user;

    return (
        <>
            <div>
                <div>
                    <div>
                        <Image src={ photoURL || 'images/silueta.png' } />
                    </div>
                    <div>
                        <h2>{displayName}</h2>
                        <h3>{email}</h3>
                    </div>
                </div>
                <button onClick = {() => {auth.signOut()}}>Sign out</button>
            </div>
        </>
    )
};

export default UserProfile;