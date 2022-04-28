import { useCallback, useMemo, useState } from 'react';

import _isEmpty from 'lodash/isEmpty'

import { TRow } from 'shared/components/table/types/TRow';

import * as S from './styles'

type Props = {
  data: TRow,
  isCollapse?: boolean;
}

export const CollapseTableBody: React.FC<Props> = ({ data, isCollapse }) => {
  const CollapseContent = data.collapseContent

  const [isCollapseOpen, setIsCollapseOpen] = useState(false)

  const icon = useMemo(() => {
    if (isCollapseOpen) {
      return () => <S.ArrowUpIcon />
    }
    return () => <S.ArrowDownIcon />
  }, [isCollapseOpen])

  const onPressCollapse = useCallback(() => {
    setIsCollapseOpen(!isCollapseOpen)
  }, [isCollapseOpen])

  return (
    <>
      <S.TableRow>
        {isCollapse && (
          <S.TableCell>
            <S.IconButton icon={icon} onClick={onPressCollapse} />
          </S.TableCell>
        )}

        {data.items.map((item, indexItem) => (
          <S.TableCell key={indexItem.toString()}>{item}</S.TableCell>
        ))}

        {!_isEmpty(data.actions) && (
          <S.TableCell>
            {data.actions?.map((action, indexAction) => (
              <S.IconButton
                key={indexAction.toString()}
                icon={action.icon}
                tooltip={action.tooltip}
                onClick={action.onClick}
              />
            ))}
          </S.TableCell>
        )}
      </S.TableRow>

      {isCollapse && isCollapseOpen && (
        <S.TableRow>
          <S.TableCell colSpan={6}>
            <S.Collapse>
              {CollapseContent}
            </S.Collapse>
          </S.TableCell>
        </S.TableRow>
      )}
    </>
  )
}