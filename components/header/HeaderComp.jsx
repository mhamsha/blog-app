// import React from "react";
// import { LogoComp, ContainerComp,LogoutBtnComp } from "../index";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// function HeaderComp() {
//   const authStatus = useSelector((state) => state.auth.status);
//   // console.log(authStatus)
//   const navigate = useNavigate();
//   const navItems = [
//     {
//       name: "Home",
//       slug: "/",
//       active: true,
//     },
//     {
//       name: "login",
//       slug: "/login",
//       active: !authStatus,
//     },
//     {
//       name: "signup",
//       slug: "/signup",
//       active: !authStatus,
//     },
//     {
//       name: "Your Posts",
//       slug: "/all-posts",
//       active: authStatus,
//     },
//     {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//     },

//   ];
//   return (
//     <header className="py-3 shadow bg-slate-600">
//       <ContainerComp>
//         <nav className="flex">
//           <div className="mr-4">
//             <Link to={"/"}>
//               <LogoComp children="mhamsha" textColor="text-white" />
//             </Link>
//           </div>
//           <ul className="flex ml-auto">
//             {navItems.map((item) => {
//               return item.active ? (
//                 <li key={item.name}>
//                   {/* <Link to={item.slug}>{item.name}</Link> */}
//                   <button
//                     onClick={() => navigate(item.slug)}
//                     className="text-white inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full"
//                   >
//                     {item.name}
//                   </button>
//                 </li>
//               ) : null;
//             })}
//             {authStatus && (
//               <li>
//                 <LogoutBtnComp />
//               </li>
//             )}
//           </ul>
//         </nav>
//       </ContainerComp>
//     </header>
//   );
// }

// export default HeaderComp;

import React from "react";
import { LogoComp, ContainerComp, LogoutBtnComp } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function HeaderComp() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
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

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>{/* <svg*/}</span>
          <span className="font-bold">mhamsha</span>
        </div>
        <div className="hidden grow items-start sm:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => {
              return item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 transition-all"
                  >
                    {item.name}
                    {/* <span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </span> */}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
        <div className="hidden space-x-2 sm:block">
          {sideMenuItems.map((item) => {
            return item.active ? (
              <button
                type="button"
                onClick={() => {
                  navigate(item.slug);
                }}
                className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                {item.name}
              </button>
            ) : null;
          })}
          {authStatus && <LogoutBtnComp />}
          {/* <button
            type="button"
            onClick={() => {
              navigate("/signup");
            }}
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Sign Up
          </button> */}
          {/* <button
            type="button"
            onClick={() => {
              navigate("/login");
            }}
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/logout");
            }}
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log out
          </button> */}
        </div>
        <div className="sm:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>{/* <svg> */}</span>
                    <span className="font-bold">mhamsha</span>
                  </div>
                  <div className="-mr-2">
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
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => {
                      return item.active ? (
                        <Link
                          key={item.name}
                          to={item.slug}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold  transition-all "
                        >
                          <span className="ml-3 text-base font-medium hover:text-gray-800 text-gray-500">
                            {item.name}
                          </span>
                          <span>{/* <ChevronRight className="ml-3 h-4 w-4" /> */}</span>
                        </Link>
                      ) : null;
                    })}
                  </nav>
                </div>
                <div className="mt-2 space-y-2 ">
                  {sideMenuItems.map((item) => {
                    return item.active ? (
                      <button
                        type="button"
                        onClick={() => {
                          navigate(item.slug);
                        }}
                        className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        {item.name}
                      </button>
                    ) : null;
                  })}
                  {authStatus && <LogoutBtnComp className="w-[40%] " />}
                  {/* <button
                    type="button"
                    className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Log In
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
