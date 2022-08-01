import { useLocation, useParams } from "react-router-dom";

import _isEqual from "lodash/isEqual";

import { Text } from "shared/components/breadcrumbs/components/text";

import * as S from "./styles";

export const BreadcrumbsNavigation = () => {
  const location = useLocation();
  const params = useParams();

  const pathnames = location.pathname.split("/").filter((x) => x);
  const breadcrumbs = pathnames.filter((pathname) => !valueIsParam(pathname));

  function valueIsParam(value: string) {
    return _isEqual(value, params?.id) || _isEqual(value, params?.process_id);
  }

  return (
    <S.NavBreadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((value, index) => (
        <Text
          key={index}
          isLast={_isEqual(breadcrumbs.length - 1, index)}
          text={value}
          index={index}
          pathnames={pathnames}
          isParam={valueIsParam}
        />
      ))}
    </S.NavBreadcrumbs>
  );
};
