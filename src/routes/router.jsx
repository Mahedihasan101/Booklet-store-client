import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import Dashbord from "../pages/Dashbord/Dashbord";
import PrivateRoute from "./PrivateRoute";
import AddBook from "../pages/Dashbord/AddBook";
import AllBooks from "../pages/Dashbord/AllBooks";
import BookDetails from "../component/BookDetails";
import PaymentSuccess from "../component/PaymentSuccess";
import MyOrders from "../MyOrder/MyOrders";
import ManageBooks from "../component/ManageOrder/ManageBooks";
import MyProfile from "../component/MyProfile/MyProfile";
import Invoices from "../component/Invoices/Invoices";
import Payment from "../component/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/books/:id", Component: BookDetails },
      { path: "/all-books", Component: AllBooks },
      { path: "/payment-success", Component: PaymentSuccess },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Registration },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashbord />
          </PrivateRoute>
        ),
        children: [
          { path: "add-book", Component: AddBook },
          { path: "my-orders", Component: MyOrders }, // note: /dashboard/my-orders
          { path: 'manage-order', Component: ManageBooks },
          { path: 'payment/:orderId', Component: Payment },
          { path: 'my-profile', Component: MyProfile },
          { path: 'invoice', Component: Invoices },
          

        ],
      },
    ],
  },
]);
