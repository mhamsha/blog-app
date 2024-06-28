import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePg, AddPostPg, PostPg, EditPostPg, LoginPg, AllPostsPg, SignupPg } from "../pages";
import {Protected} from "../components";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePg />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout Protected={false}>
            <LoginPg />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout Protected={false}>
            <SignupPg />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout Protected>
            {" "}
            <AllPostsPg />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout Protected>
            {" "}
            <AddPostPg />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout Protected>
            {" "}
            <EditPostPg />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <PostPg />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
