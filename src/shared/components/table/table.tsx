import { TColumn } from 'shared/components/table/types/TColumn';
import { TRow } from 'shared/components/table/types/TRow';

import * as S from './styles'

type Props = {
  columnData: TColumn[];
  rows: TRow[];
  isCollapse?: boolean;
}

export const Table: React.FC<Props> = ({ columnData, rows, isCollapse }) => {
  return (
    <S.Wrapper>
      <S.Table>
        <S.TableHead>
          <S.TableRow>
            {isCollapse && <S.TableCell />}
            {columnData.map(data => (<S.TableCell key={data.id}>{data.name}</S.TableCell>))}
          </S.TableRow>
        </S.TableHead>

        <S.TableBody>
          {rows.map((data, index) => (
            <S.TableBodyContent key={index.toString()} data={data} isCollapse={isCollapse} />
          ))}
        </S.TableBody>
      </S.Table>
    </S.Wrapper>
  )
}