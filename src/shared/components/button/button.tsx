import { ButtonProps } from "@mui/material";
import * as S from "./styles";

type Props = ButtonProps & {
  title: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  variant?: "contained" | "outlined" | "text";

  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const Button: React.FC<Props> = ({
  title,
  isLoading,
  variant = "contained",
  ...props
}) => {
  return (
    <S.Wrapper variant={variant} {...props}>
      {!isLoading && title}

      {isLoading && <S.Loading />}
    </S.Wrapper>
  );
};
