import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/HomePage/Home/Home";
import Service from "../pages/Service/Service";
import ErrorPage from "../pages/shared/ErrorPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
<<<<<<< HEAD
import Election from "../pages/Election/Election";
=======
import Contact from "../pages/Contact/Contact";
>>>>>>> e7517c4514438d4d4a30c5207ad0bbeb8f8a7927

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
        path:'contact',
        element: <Contact></Contact>
      }
    ],
  },
]);

export default router;
