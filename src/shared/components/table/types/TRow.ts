import { TAction } from "shared/components/table/types/TAction";

export type TRow = {
  items: (string | number)[];
  actions?: TAction[];
  collapseContent?: JSX.Element;
}
