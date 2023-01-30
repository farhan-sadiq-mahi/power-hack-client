import Main from "../Layout/Main";
import Billing from "../Pages/BIlling/Billing"
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><Main /></PrivateRoute>,
        children: [
            {
                path: '/',
                element: <Billing />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    }
])