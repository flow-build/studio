import { Link as RouterLink } from "react-router-dom";
import Link, { LinkProps } from "@mui/material/Link";

type Props = LinkProps & {
  to: string;
  replace?: boolean;
};

export const LinkRouter: React.FC<Props> = (props) => {
  return <Link {...props} component={RouterLink} />;
};
