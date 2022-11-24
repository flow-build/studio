import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import * as S from "./style";

type Props = {
  onClick: (showPassword: boolean) => void;
};

export const EyeIcon: React.FC<Props> = ({ onClick }) => {
  const [state, setState] = useState({
    showPassword: false,
  });

  function handleClickShowPassword() {
    const newShowPassword = !state.showPassword;
    setState((prev) => ({
      ...prev,
      showPassword: newShowPassword,
    }));

    onClick(newShowPassword);
  }
  
  return (
    <S.InputIcon>
      <S.Icon
        aria-label="toggle password visibility"
        onClick={() => handleClickShowPassword()}
      >
        {state.showPassword ? <VisibilityOff /> : <Visibility />}
      </S.Icon>
    </S.InputIcon>
  );
};
