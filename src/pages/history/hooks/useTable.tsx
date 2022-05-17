import { useMemo } from "react"

import { TState } from "models/state"

import { CollapseContent } from "pages/history/components/collapse-content"

import { getLongFormatByDate } from "shared/utils/date"

export function useTable(states: TState[]) {
  const columnData = useMemo(() => {
    return [
      { id: 'id', name: 'ID' },
      { id: 'node', name: 'Node' },
      { id: 'nextNode', name: 'Next node' },
      { id: 'status', name: 'Status' },
      { id: 'createdAt', name: 'Created at' },
    ]
  }, [])

  const rows = useMemo(() => {
    return states.map(state => {
      const items = [
        state.id,
        state.node_id,
        state.next_node_id ?? 'null',
        state.status,
        getLongFormatByDate(state.created_at)
      ];

      const collapseContent = <CollapseContent state={state} />

      return { items, collapseContent }
    })
  }, [states])

  return { columnData, rows }
}