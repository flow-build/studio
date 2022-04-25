import { useMemo } from "react"

import SchemaIcon from '@mui/icons-material/Schema';

export function useSidebar() {
  const menuItems = useMemo(() => {
    return [
      {
        name: 'Workflows',
        pathname: 'workflows',
        icon: <SchemaIcon />,
      }
    ]
  }, [])

  return { menuItems }
}