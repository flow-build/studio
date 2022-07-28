import { Link as RouterLink } from "react-router-dom";
import Link, { LinkProps } from "@mui/material/Link";

import * as S from "./styles";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

type Props = {
  text: string;
  pathnames: string[];
  index: number;
  params: (string | undefined)[];
};

export const BreadcrumbsText: React.FC<Props> = ({
  text,
  index,
  pathnames,
  params,
}) => {
  const last = index === pathnames.length - 1;
  const to = `${pathnames.slice(0, index + 1).join("/")}`;

  function valueIsParam(value: string) {
    return params.includes(value);
  }

  if (valueIsParam(text)) {
    return null;
  }

  if (last) {
    return (
      <S.NavTitle color="text.primary" key={to}>
        {text}
      </S.NavTitle>
    );
  }

  return (
    <LinkRouter underline="hover" color="inherit" to={to} key={to}>
      {text}
    </LinkRouter>
  );
};
