import React, { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import './sign-up-form.styles.scss';

const defaultFormField = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formField;

    const resetFormFields = () => {
        setFormField(defaultFormField);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Your password is not matching your initial password")
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            alert("Account saved successfully");
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }
            console.log('user creation error', err);
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
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                {/* the value of the input field should be the same as the state. It's circular */}
                {/* <input required type="text" onChange={handleChange} name="displayName" value={displayName} /> */}
                <FormInput
                    label="Display Name"
                    // inputOptions={{
                    //     type: "text",
                    //     required: true,
                    //     onChange: handleChange,
                    //     name: "displayName",
                    //     value: displayName
                    // }}
                    required
                    type="text"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} 
                />

                <FormInput
                    label="Email"
                    required
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput
                    label="Password"
                    required
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password} />

                <FormInput
                    label="Confirm Password"
                    required
                    type="password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} />

                <Button type="submit" >Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
