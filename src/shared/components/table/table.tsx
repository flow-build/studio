import { LabelDisplayedRowsArgs } from "@mui/material/TablePagination";
import { useMemo, useState } from "react";

import { TColumn } from "shared/components/table/types/TColumn";
import { TRow } from "shared/components/table/types/TRow";

import * as S from "./styles";

type Props = {
  columnData: TColumn[];
  rows: TRow[];
  isCollapse?: boolean;
  pageSize?: number;
};

export const Table: React.FC<Props> = ({
  columnData,
  rows,
  isCollapse,
  pageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const currentTableData = useMemo(() => {
    const firstPageIndex = currentPage * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    return rows.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, rows]);

  const handleChange = (event: unknown, value: number) => {
    setCurrentPage(value);
  };

  const labelDisplayedRows = (info: LabelDisplayedRowsArgs) => {
    const { count, from, to } = info;

    return `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`;
  };

  return (
    <>
      <S.Wrapper>
        <S.Table>
          <S.TableHead>
            <S.TableRow>
              {isCollapse && <S.TableCell />}
              {columnData.map((data) => (
                <S.TableCell key={data.id}>{data.name}</S.TableCell>
              ))}
            </S.TableRow>
          </S.TableHead>

          <S.TableBody>
            {currentTableData.map((data, index) => (
              <S.TableBodyContent
                key={index.toString()}
                data={data}
                isCollapse={isCollapse}
              />
            ))}
          </S.TableBody>
        </S.Table>
      </S.Wrapper>

      <S.Pagination
        rowsPerPageOptions={[pageSize]}
        count={rows.length}
        rowsPerPage={pageSize}
        page={currentPage}
        labelDisplayedRows={labelDisplayedRows}
        onPageChange={handleChange}
      />
    </>
  );
};
