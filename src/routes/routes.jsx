import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/HomePage/Home/Home";
import Service from "../pages/Service/Service";
import ErrorPage from "../pages/shared/ErrorPage";
import AboutPage from "../pages/AboutPage/AboutPage";

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
        path: "services",
        element: <Service></Service>,
      },
      {
        path: "about",
        element: <AboutPage></AboutPage>,
      },
    ],
  },
]);

export default router;
