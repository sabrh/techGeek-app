"use client";
import Link from 'next/link';
import React from 'react';
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const links = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "Add Product", href: "/add-product" },
   
    ]

    return (
        <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                {links.map((link) => (
                <li key={link.href}>
                    <Link href={link.href} className="text-lg">{link.name}</Link>
                </li>
                ))}
            </ul>
            </div>
                <a href='/' className="text-2xl font-bold">techGeek</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className={`px-5 ${pathname === link.href ? 
                            "underline underline-offset-4 font-semibold" : ""}`}>
                            {link.name}</Link>
                    </li>
                ))}
                </ul>
            </div>
            <div className="navbar-end">
                <button className='btn rounded-full'>SignIn</button>
            </div>
            </div>
    );
};

export default Navbar;