import { useMemo } from "react"

import SchemaIcon from '@mui/icons-material/Schema';

// import { Pages } from "routes"

export function useSidebar() {
  const menuItems = useMemo(() => {
    return [
      {
        name: 'Workflows',
        pathname: '/workflows',
        icon: <SchemaIcon />,
        // component: Pages.Workflows,
      }
    ]
  }, [])

  return { menuItems }
}