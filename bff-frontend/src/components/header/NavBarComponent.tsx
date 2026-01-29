"use client";
import { useIsAuthenticatedQuery } from "@/features/user/user-api";
import { AnimatePresence, motion, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserNav from "./user-nav";
export default function NavBarComponent() {
  const { scrollYProgress } = useScroll();
  const [navOpen, setNavOpen] = useState(false);
  const path = usePathname();
  const { data } = useIsAuthenticatedQuery();
  return (
    <>
      {/* ====== TRIGGER SCROLL ===== */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="h-[2px] w-full bg-gradient-to-r from-blue-400 to-blue-500 z-60 fixed top-0 left-0 origin-left "
      ></motion.div>
      {/* ===== HEADER ===== */}
      <header className="w-full fixed top-0 z-50 h-16 px-5 md:px-20 flex justify-center items-center border-b-2 bg-white border-gray-200">
        <nav className="w-full flex items-center justify-between ">
          {/* ====== LOGO ====== */}
          <Link href={"/"} className="font-bold text-lg">
            Kuika
          </Link>
          {/* ====== MENU DESKTOP ====== */}
          <ul className="md:flex gap-5 z-50 hidden">
            {menuItem.map((menu, index) => (
              <motion.li whileTap={{ scale: 0.99 }} key={index}>
                <Link
                  className={`text-sm ${
                    path === menu.path ? "text-blue-600" : ""
                  }`}
                  href={menu.path}
                >
                  {menu.item}
                </Link>
              </motion.li>
            ))}
          </ul>
          {/* ====== LOGIN & SIGNUP DESKTOP ====== */}
          <ul className="flex gap-3 items-center justify-center">
            {(data?.isAuthenticated ?? false) ? (
              <UserNav />
            ) : (
              <Link
                href={"/oauth2/authorization/auth"}
                className="text-sm cursor-pointer"
              >
                Log in
              </Link>
            )}
            {/* ====== HAMBURGER MENU BUTTON ====== */}
            <button onClick={() => setNavOpen(!navOpen)} className="md:hidden">
              <svg
                className="w-6 h-6 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ pathLength: 0 }}
                  transition={{ duration: 0.3 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </ul>
        </nav>
      </header>
      {/* ====== MOBILE MENU ====== */}
      {
        <AnimatePresence initial={false}>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col fixed top-16 left-0 px-5 w-full h-fit pb-5 rounded-b-md bg-white z-10"
            >
              <ul className="flex flex-col ">
                {menuItem.map((menu, index) => (
                  <li key={index} className="py-2">
                    <Link
                      onClick={() => setNavOpen(false)}
                      className={`text-sm ${
                        path === menu.path ? "text-blue-600" : ""
                      }`}
                      href={menu.path}
                    >
                      {menu.item}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col justify-center">
                <Link href={"/login"} className="text-sm cursor-pointer py-2">
                  Log in
                </Link>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      }
    </>
  );
}

type Menu = {
  path: string;
  item: string;
};

const menuItem: Menu[] = [
  {
    path: "/",
    item: "Home",
  },
  {
    path: "/product",
    item: "Product",
  },
  {
    path: "/about",
    item: "About",
  },
];
