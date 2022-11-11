import { useState } from "react";

import { FormConfirmationCode } from "./components/form-confirmation-code";
import { FormSignUp } from "pages/register/components/sign-up/components/form-sign-up";

export const SignUpForm = () => {
  const [state, setState] = useState({
    signedUp: false,
  });

  function handleFormSignUp() {
    setState((prev) => ({ ...prev, signedUp: true }));
  }

  if (state.signedUp) {
    return <FormConfirmationCode signedUp={state.signedUp}/>;
  }

  return <FormSignUp handleFormSignUp={handleFormSignUp}/>;
};
