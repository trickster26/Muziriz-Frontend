import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import UserPage from "views/UserPage.js";
import Register from "views/Register";
import Login from "views/Login";
// import Busiest from "views/Busiest";
import Slowest from "views/Slowest";
import UserList from "views/UserList";
import Fastest from "views/Fastest";
import Owasp from "views/Owasp.js";
import SystemsHealth from "views/SystemsHealth";
console.log(Owasp);
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: <Dashboard />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "design_image",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "location_map-big",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  {
    path: "/Owasp",
    name: "Security Analytics",
    icon: "ui-1_lock-circle-open",
    component: <Owasp />,
    layout: "/admin",
  },
  
  // {
  //   path: "/extended-tables",
  //   name: "Table List",
  //   icon: "files_paper",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: <Upgrade />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "users_single-02",
  //   component: <Register/>,
  //   layout: "/admin",
  // },
  // {
  //   path: "/login",
  //   name: "login",
  //   icon: "users_single-02",
  //   component: <Login/>,
  //   layout: "/admin",
  // },
  // {
  //   path: "/busiest",
  //   name: "busiest",
  //   icon: "tech_watch-time",
  //   // component: <Busiest/>,
  //   component: <Login/>,
  //   layout: "/admin",
  // },
  {
    path: "/fastest",
    name: "fastest",
    icon: "sport_user-run",
    component: <Fastest/>,
    layout: "/admin",
  },
  {
    path: "/slowest",
    name: "slowest",
    icon: "ui-2_time-alarm",
    component: <Slowest/>,
    layout: "/admin",
  },
  // {
  //   path: "/least-slowest",
  //   name: "least-slowest",
  //   icon: "users_single-02",
  //   // component: <LeastBusy/>,
  //   component: <Login/>,
  //   layout: "/admin",
  // },
  {
    path: "/system health",
    name: "system health",
    icon: "media-2_sound-wave",
    component: <SystemsHealth/>,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users List",
    icon: "users_single-02",
    component: <UserList />,
    layout: "/admin",
  },
];
export default dashRoutes;
