import { LinkProps } from '@mui/material/Link';

export interface ILinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}