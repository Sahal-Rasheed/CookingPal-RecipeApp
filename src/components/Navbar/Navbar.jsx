import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

import logo from "../../assets/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import SideBar from "../SideBar/SideBar";

const Navbar = () => {
  const [ isSideBarOpen, setSideBarOpen ] = useState(false)
  return (
    <nav className="bg-white border-b border-white text-black overflow-hidden">
      <div className="mx-auto w-screen px-2 sm:px-6 lg:px-20">
        <div className="flex h-28 justify-between">
          <div className="flex gap-4">
            <Menu className="mt-9 cursor-pointer" size={30} onClick={() => setSideBarOpen(!isSideBarOpen)} />
            <a className="flex flex-shrink-0 mt-4" href="/index.html">
              <img className="h-14" src={logo} alt="logo" />
            </a>
          </div>
          <div className="flex mt-7">
            <SearchBar />
          </div>
          <div className="hidden md:flex space-x-10 items-center">
            <NavLink 
              to="/" 
              className={({isActive}) => isActive ? "text-lime-600 text-xl" : "text-xl hover:text-lime-600" }>
              Home
            </NavLink>
            <NavLink 
              to="explore" 
              className={({isActive}) => isActive ? "text-lime-600 text-xl" : "text-xl hover:text-lime-600" }>
              Explore
            </NavLink>
            <NavLink 
              to="help" 
              className={({isActive}) => isActive ? "text-lime-600 text-xl" : "text-xl hover:text-lime-600" }>
              Help
            </NavLink>
          </div>
        </div>
      </div>
      { isSideBarOpen && <SideBar isSideBarOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen} /> }
    </nav>

  );
};

export default Navbar;
