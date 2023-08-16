import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import AboutPage from "../pages/AboutPage/AboutPage";
import Contact from "../pages/Contact/Contact";
import Overview from "../pages/Dashboard/SubPages/Overview/Overview";
import Satings from "../pages/Dashboard/SubPages/Sattings/Sattings";
import Voters from "../pages/Dashboard/SubPages/Voters/Voters";
import Election from "../pages/Election/Election";
import ElectionCreationAndManagement from "../pages/ElectionCreationandManagement/ElectionCreationandManagement";
import Home from "../pages/HomePage/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Service from "../pages/Service/Service";
import ErrorPage from "../pages/shared/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "services",
        element: <Service></Service>,
      },
      {
        path: 'election',
        element: <Election></Election>
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Registration></Registration>,
      },
      {
        path: 'contact',
        element: <Contact></Contact>
      }
    ],
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: 'overview',
        element: <Overview />
      },
      {
        path: 'voters',
        element: <Voters />
      },
      {
        path: 'satings',
        element: <Satings />
      },
      ,
      {
        path: 'election-correction',
        element: <ElectionCreationAndManagement></ElectionCreationAndManagement>
      }
    ]
  }
]);

export default router;
