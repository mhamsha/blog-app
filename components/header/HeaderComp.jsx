import React from "react";
import { LogoComp, ContainerComp,LogoutBtnComp } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function HeaderComp() {
  const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus)
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Your Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
   
  ];
  return (
    <header className="py-3 shadow bg-slate-600">
      <ContainerComp>
        <nav className="flex">
          <div className="mr-4">
            <Link to={"/"}>
              <LogoComp children="mhamsha" textColor="text-white" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) => {
              return item.active ? (
                <li key={item.name}>
                  {/* <Link to={item.slug}>{item.name}</Link> */}
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-white inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null;
            })}
            {authStatus && (
              <li>
                <LogoutBtnComp />
              </li>
            )}
          </ul>
        </nav>
      </ContainerComp>
    </header>
  );
}

export default HeaderComp;
