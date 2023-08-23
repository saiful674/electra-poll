import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import AboutPage from "../pages/AboutPage/AboutPage";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";
import ElectionResult from "../pages/Dashboard/SubPages/ElectionResult/ElectionResult";
import Overview from "../pages/Dashboard/SubPages/Overview/Overview";
import Result from "../pages/Dashboard/SubPages/Result/Result";
import Sating from "../pages/Dashboard/SubPages/Sattings/Sating";
import Voters from "../pages/Dashboard/SubPages/Voters/Voters";
import Election from "../pages/Election/Election";
import ElectionCreationAndManagement from "../pages/ElectionCreationAndManagement/ElectionCreationAndManagement";
import Home from "../pages/HomePage/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import ErrorPage from "../pages/shared/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import TermsAndCondition from "../pages/Registration/TermsAndCondition/TermsAndCondition";
import ForgetPassword from "../components/ForgatePassword/ForgetPassword";
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
        path: "forget-password",
        element: <ForgetPassword></ForgetPassword>,
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
        path: "termsAndCondition",
        element: <TermsAndCondition></TermsAndCondition>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
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
      {
        path: "result",
        element: <Result />,
      },
      {
        path: "election-result/:id",
        element: <ElectionResult />,
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
