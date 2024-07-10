import React from "react";
import { LogoutBtnComp, ButtonComp, TogglerComp } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { useClickOutside } from "@mantine/hooks";

export default function HeaderComp() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const currentPage = window.location.pathname;

  // * menu item for header component
  const menuItems = [
    {
      name: "Home Feed",
      slug: "/",
      active: authStatus,
    },
    {
      name: "Your Posts",
      slug: "/your-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  // * side menu item for header component
  const sideMenuItems = [
    {
      name: "SIgn Up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Log In",
      slug: "/login",
      active: !authStatus,
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // * click outside the menu to close it
  const refe = useClickOutside(() => {
    toggleMenu();
  });
  return (
    <div className="relative w-full bg-white dark:bg-transparent dark:text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* logo */}
        <div className="inline-flex items-center space-x-2">
          <span>{/* <svg*/}</span>
          <span className="font-bold">mhamsha</span>
        </div>
        {/* menu items like HomeFeed,yourPosts for big devices */}
        <div className="hidden grow items-start sm:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => {
              const isActive = currentPage === item.slug;
              return item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className={`inline-flex items-center text-sm font-semibold transition-all hover:text-gray-900 dark:text-neutral-400 dark:hover:text-slate-300 ${isActive ? "text-black dark:text-slate-300" : "text-gray-500 dark:text-neutral-200"} `}
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
        {/* side menu items like login/logout for big devices */}
        <div className="hidden space-x-2 sm:block">
          {sideMenuItems.map((item) => {
            const isActive = currentPage === item.slug;
            return item.active ? (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  navigate(item.slug);
                }}
                className={`rounded-md bg-transparent px-3 py-2 text-sm font-semibold hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:text-neutral-300 dark:hover:text-slate-500 ${isActive ? "text-black dark:text-slate-500" : "text-gray-500 dark:text-neutral-300"} `}
              >
                {item.name}
              </button>
            ) : null;
          })}
          {/* account verification button if the user is logged in */}
          {authStatus && (
            <ButtonComp
              font="font-normal"
              type="button"
              onClick={() => {
                navigate("/account-verify");
              }}
              // className={`text-sm py-1.5 px-1 bg-red-500 hover:bg-red-600 `}
              className={`px-1 py-2 text-sm ${
                userData.emailVerification
                  ? "cursor-default bg-green-500 hover:bg-green-500"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={userData.emailVerification}
            >
              {userData.emailVerification ? "Verified" : "Verify User"}
            </ButtonComp>
          )}
        </div>
        {/* logout button if the user is logged in */}
        <div>
          {authStatus && (
            <LogoutBtnComp className="hidden outline-none dark:border-2 dark:border-solid dark:border-gray-600 dark:bg-transparent dark:text-white dark:hover:bg-red-600 sm:block" />
          )}
        </div>
        {/* dark mode toggler */}
        <div className="m-3 hidden bg-white dark:bg-black sm:block">
          <TogglerComp />
        </div>

        <div className="sm:hidden">
          {/* hamburger icon for small devices */}
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div
            ref={refe}
            className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-black">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  {/* logo */}
                  <div className="inline-flex items-center space-x-2">
                    <span>{/* <svg> */}</span>
                    <span className="font-bold">mhamsha</span>
                  </div>
                  {/* exit menu button */}
                  <div className="-mr-2">
                    <div className="mx-4 inline-flex bg-white dark:bg-black">
                      <TogglerComp />
                    </div>
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  {/* menu items for small devces */}
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => {
                      const isActive = currentPage === item.slug;
                      return item.active ? (
                        <Link
                          onClick={toggleMenu}
                          key={item.name}
                          to={item.slug}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold transition-all dark:text-neutral-400 dark:hover:text-slate-300"
                        >
                          <span
                            className={`ml-3 text-base font-medium hover:text-gray-800 ${isActive ? "text-black dark:text-slate-300" : "text-gray-500 dark:text-neutral-400"} `}
                          >
                            {item.name}
                          </span>
                        </Link>
                      ) : null;
                    })}
                  </nav>
                </div>
                {/* side menu items for small devices */}
                <div className="mt-2 space-y-2">
                  {sideMenuItems.map((item) => {
                    const isActive = currentPage === item.slug;
                    return item.active ? (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          navigate(item.slug);
                          toggleMenu();
                        }}
                        className={`w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-gray-600 dark:bg-black dark:text-neutral-300 ${isActive ? "text-black dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}`}
                      >
                        {item.name}
                      </button>
                    ) : null;
                  })}
                  {/* account verification button for small devices */}
                  {authStatus && (
                    <ButtonComp
                      type="button"
                      onClick={() => {
                        navigate("/account-verify");
                      }}
                      className={`ml-2 px-1 py-1.5 text-sm ${
                        userData.emailVerification
                          ? "cursor-default bg-green-500 hover:bg-green-500 dark:opacity-85"
                          : "bg-red-600 hover:bg-red-600 dark:opacity-85"
                      }`}
                      disabled={userData.emailVerification}
                    >
                      {userData.emailVerification
                        ? "Account Verified"
                        : "Verify Account"}
                    </ButtonComp>
                  )}
                  {/* logout button for small devices */}
                  {authStatus && (
                    <LogoutBtnComp
                      className="w-[40%] bg-red-600 text-white dark:opacity-85"
                      hover=""
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
