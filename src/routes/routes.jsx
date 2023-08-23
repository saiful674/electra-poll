import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import AboutPage from "../pages/AboutPage/AboutPage";
import Contact from "../pages/Contact/Contact";
import Overview from "../pages/Dashboard/SubPages/Overview/Overview";
import Sating from "../pages/Dashboard/SubPages/Sattings/Sating";
import Voters from "../pages/Dashboard/SubPages/Voters/Voters";
import Election from "../pages/Election/Election";
import Home from "../pages/HomePage/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import ErrorPage from "../pages/shared/ErrorPage";
import Blog from "../pages/Blog/Blog";
import ElectionCreationAndManagement from "../pages/ElectionCreationandManagement/ElectionCreationandManagement";
import PrivateRoutes from "./PrivateRoutes";
import ForgetPassword from "../components/ForgatePassword/ForgetPassword";
import VotingResults from "../pages/SocialSharing/VotingResults";
import YourComponent from "../pages/SocialSharing/YourComponent";
// asjdfoiajsdf
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
        path: "blog",
        element: <Blog></Blog>,
      },
      {
        path: "election/:id",
        element: <Election></Election>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
       path:'forget-password',
          element:<ForgetPassword></ForgetPassword>
      },
      {
        path: "registration",
        element: <Registration></Registration>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: 'VotingResults',
        element: <VotingResults></VotingResults>
      },
      {
        path:'YourComponent',
        element:<YourComponent></YourComponent>
      }
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "voters",
        element: <Voters />,
      },
      {
        path: "satings",
        element: <Sating />,
      },
      ,
      {
        path: "election-correction",
        element: (
          <ElectionCreationAndManagement></ElectionCreationAndManagement>
        ),
      },
    ],
  },
]);

export default router;
