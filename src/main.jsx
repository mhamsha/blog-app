import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePg, AddPostPg, PostPg, EditPostPg, LoginPg, AllPostsPg, SignupPg } from "../pages";
import { Protected } from "../components";

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
          // <Protected authentication={true}>
          <LoginPg />
          // </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          // <Protected authentication={true}>
            <SignupPg />
          // </Protected>
        ),
      },
      {
        path: "/all-posts",
        element: (
          // <Protected authentication>
            <AllPostsPg />
          // </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          // <Protected authentication>
            <AddPostPg />
          // </Protected>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          // <Protected authentication>
            <EditPostPg />
          // </Protected>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          // <Protected authentication>
            <PostPg />
          // </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </Provider>
);
