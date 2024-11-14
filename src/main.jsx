import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeFeedPg,
  AddPostPg,
  PostPg,
  EditPostPg,
  LoginPg,
  YourPostsPg,
  SignupPg,
  CommentPg,
} from "../pages";
import { Protected, PageNotFoundComp, OtpComp } from "../components";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication>
            <HomeFeedPg />
          </Protected>
        ),
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <LoginPg />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignupPg />
          </Protected>
        ),
      },

      {
        path: "/account-verify",
        element: (
          <Protected>
            <OtpComp />,
          </Protected>
        ),
      },

      {
        path: "/your-posts",
        element: (
          <Protected authentication>
            <YourPostsPg />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            <AddPostPg />
          </Protected>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            <EditPostPg />
          </Protected>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <Protected authentication>
            <PostPg />
          </Protected>
        ),
      },
      {
        path: "/post/:slug/comments",
        element: (
          <Protected authentication>
            <CommentPg />
          </Protected>
        ),
      },
      {
        path: "*",
        element: <PageNotFoundComp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </Provider>,
);
