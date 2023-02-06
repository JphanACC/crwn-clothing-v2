import React, { useState } from "react";

import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import './sign-in-form.styles.scss';

//properties
import errorMessage from '../../utils/messages/error-message-en.json'

import {
    //auth,
    signInWithGooglePopup,
    //signInWithGoogleRedirect,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

const defaultFormField = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { email, password } = formField;


    const resetFormFields = () => {
        setFormField(defaultFormField);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        //const { user } = await signInWithGooglePopup();
        //await createUserDocumentFromAuth(user);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            const {user} = response;
            resetFormFields();
        } catch (err) {
            switch(err.code ){
                case "auth/user-not-found":
                    alert(errorMessage.noUser);
                    break;
                case "auth/wrong-password":
                    alert(errorMessage.wrongPassword);
                    break;
                default:
                    console.log("Error trying login", err);
            }
        }
    }

    //generic the handle change
    const handleChange = (event) => {
        const { name, value } = event.target;

        //spread in this object formField, then modify one value on this object, 
        //because we know all of these form fields are essentially duplicated versions of the same state
        setFormField({ ...formField, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    required
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    required
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div id="sas" className="buttons-container">
                    <Button type="submit" >Sign In</Button>
                    <Button buttonType='google' onClick={signInWithGoogle} >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
