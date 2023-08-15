import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/HomePage/Home/Home";
import Service from "../pages/Service/Service";
import ErrorPage from "../pages/shared/ErrorPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import Election from "../pages/Election/Election";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import Contact from "../pages/Contact/Contact";
import ElectionCreationAndManagement from "../pages/ElectionCreationandManagement/ElectionCreationandManagement";

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
      },
      {
        path:'election-correction',
       element:<ElectionCreationAndManagement></ElectionCreationAndManagement>
      }
    ],
  },
]);

export default router;
