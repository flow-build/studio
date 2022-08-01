import { useLocation, useParams } from "react-router-dom";
import { BreadcrumbsText } from "../breadcrumb-text";
import * as S from "./styles";

export const BreadcrumbsNavigation = () => {
  const location = useLocation();
  const { id, process_id } = useParams();

  const pathnames = location.pathname.split("/").filter((x) => x);

  console.log(location);
  console.log(pathnames);

  return (
    <S.NavBreadcrumbs aria-label="breadcrumb">
      {pathnames.map((value, index) => (
        <BreadcrumbsText
          key={index}
          text={value}
          index={index}
          pathnames={pathnames}
          params={[id as string, process_id as string]}
        />
      ))}
    </S.NavBreadcrumbs>
  );
};
