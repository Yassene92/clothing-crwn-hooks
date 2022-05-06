import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  SignInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import { SignIn, ButtonsContainer } from "./sign-in-form.styles";

const defaultFormFieleds = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFieleds, setFormFieleds] = useState(defaultFormFieleds);
  const { email, password } = formFieleds;

  const resetFormFieleds = () => {
    setFormFieleds(defaultFormFieleds);
  };

  const SignInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await SignInAuthUserWithEmailAndPassword(email, password);

      resetFormFieleds();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFieleds({ ...formFieleds, [name]: value });
  };
  return (
    <SignIn>
      <h2>Already have an account?</h2>
      <span>sign in with your email and password </span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={SignInWithGoogle}
          >
            Google Sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignIn>
  );
};

export default SignInForm;
