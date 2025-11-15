"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearCredentials } from "@/redux/slices/authSlice"; 

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const links = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "Add Product", href: "/products/new" },
  ];

  const handleLogout = () => {
    dispatch(clearCredentials()); 
    router.push("/signin"); 
  };

  const hideMenu = pathname === "/signin" || !token;

  return (
    <div className="navbar bg-[#0D1821] shadow-sm md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {!hideMenu && (
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-2xl py-2 text-[#0D1821]">
                    {link.name} 
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <a href="/" className="text-2xl font-bold text-white">
          techGeek
        </a>
      </div>

      {!hideMenu && (
        <>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-5 font-bold text-[#EFF1F3] ${
                      pathname === link.href
                        ? "underline underline-offset-4 font-semibold"
                        : ""
                    }`}
                  >
                    {link.name} 
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-end">
            <button onClick={handleLogout} className="btn rounded-full bg-[#4E6E5D] text-white border-[#4E6E5D]">
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;