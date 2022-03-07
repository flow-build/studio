import { IoCogOutline, IoHomeOutline } from "react-icons/io5";

import Pages from "../pages";

const listRoutes = [
  {
    name: "Dashboard",
    pathname: "/",
    icon: <IoHomeOutline />,
    component: Pages.Dashboard,
  },
  {
    name: "Workflows",
    pathname: "/workflows",
    icon: <IoCogOutline />,
    component: Pages.Workflows,
  },
  {
    name: "Compare JSON",
    pathname: "/compare-json",
    icon: <IoCogOutline />,
    component: Pages.Workflows,
  },
];

export default listRoutes;
