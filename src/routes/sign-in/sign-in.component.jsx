import React from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const  { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };
  return (
    <div>
        <div>SignIn</div>;
        <button onClick={logGoogleUser}>
            Sign In With Google Popup
        </button>
    </div>
  )
};

export default SignIn;
