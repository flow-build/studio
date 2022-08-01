import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import * as S from "./styles";
import { ILinkRouterProps } from "./types/ILinkRouterProps";

const LinkRouter = (props: ILinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

type Props = {
  text: string;
  pathnames: string[];
  index: number;
  params: string[];
};

export const BreadcrumbsText: React.FC<Props> = ({
  text,
  index,
  pathnames,
  params,
}) => {
  const last = index === pathnames.length - 1;
  const to = `/${pathnames.slice(0, index + 1).join("/")}`;

  console.log(last)

  console.log(to);

  function valueIsParam(value: string) {
    return params.includes(value);
  }

  if (valueIsParam(text)) {
    return null;
  }

  if (last) {
    return <S.NavTitle color="text.primary">{text}</S.NavTitle>;
  }

  return (
    <LinkRouter underline="hover" color="inherit" to={to}>
      {text}
    </LinkRouter>
  );
};
