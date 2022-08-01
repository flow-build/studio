import * as S from "./styles";

type Props = {
  isLast: boolean;
  text: string;
  pathnames: string[];
  index: number;
  isParam: (value: string) => boolean;
};

export const Text: React.FC<Props> = (props) => {
  const { isLast, text, index, pathnames, isParam } = props;
  const to = getTo(pathnames[index]);

  function getTo(value: string) {
    if (isParam(value)) {
      return `/${pathnames.slice(0, index + 2).join("/")}`;
    }

    return `/${pathnames.slice(0, index + 1).join("/")}`;
  }

  if (isLast) {
    return <S.NavTitle>{text}</S.NavTitle>;
  }

  return <S.NavLink to={to}>{text}</S.NavLink>;
};
