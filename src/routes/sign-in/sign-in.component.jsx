import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-in-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };
  return (
    <div>
      <h1>I an sign in</h1>
      <button onClick={logGoogleUser}>sign in with google popup</button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
