export interface IAction {
  icon: JSX.Element;
  tooltip: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
