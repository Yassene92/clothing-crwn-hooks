import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError } from "firebase/auth";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignIn, ButtonsContainer } from "./sign-in-form.styles";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

const defaultFormFieleds = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFieleds, setFormFieleds] = useState(defaultFormFieleds);
  const { email, password } = formFieleds;

  const resetFormFieleds = () => {
    setFormFieleds(defaultFormFieleds);
  };

  const SignInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFieleds();
    } catch (error) {
      switch ((error as AuthError).code) {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
