import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import _isEmpty from 'lodash/isEmpty'
import { IconButton } from '../icon-button';

import * as S from './styles'

type TColumnData = {
  id: string;
  name: string;
}

type TAction = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  tooltip?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

type TRows = {
  items: (string | number)[];
  actions?: TAction[];
}

type Props = {
  columnData: TColumnData[];
  rows: TRows[];
}

export const Table: React.FC<Props> = ({ columnData, rows/* , actions */ }) => {
  return (
    <S.Wrapper>
      <S.Table>
        <S.TableHead>
          <S.TableRow>
            {columnData.map(data => (<S.TableCell key={data.id}>{data.name}</S.TableCell>))}
          </S.TableRow>
        </S.TableHead>

        <S.TableBody>
          {rows.map((data, index) => (
            <S.TableRow key={index.toString()}>
              {data.items.map((item, indexItem) => (
                <S.TableCell key={indexItem.toString()}>{item}</S.TableCell>
              ))}

              {!_isEmpty(data.actions) && (
                <S.TableCell>
                  {data.actions?.map((action, indexAction) => (
                    <IconButton
                      key={indexAction.toString()}
                      icon={action.icon}
                      tooltip={action.tooltip}
                      onClick={action.onClick}
                    />
                  ))}
                </S.TableCell>
              )}
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>
    </S.Wrapper>
  )
}