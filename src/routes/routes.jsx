import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/HomePage/Home/Home";
import Service from "../pages/Service/Service";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'services',
                element: <Service></Service>
            }
        ]
    }
])

export default router;