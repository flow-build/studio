import { useMemo } from "react"

import SchemaIcon from '@mui/icons-material/Schema';
import SearchIcon from '@mui/icons-material/Search';

export function useSidebar() {
  const menuItems = useMemo(() => {
    return [
      {
        name: 'Workflows',
        pathname: 'workflows',
        icon: <SchemaIcon />,
      },
      {
        name: 'Buscar',
        pathname: 'search',
        icon: <SearchIcon />,
      }
    ]
  }, [])

  return { menuItems }
}