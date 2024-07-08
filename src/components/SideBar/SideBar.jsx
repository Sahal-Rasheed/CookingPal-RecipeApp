import { X, House, CircleHelp, ListCollapse } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const SideBar = ({ isSideBarOpen, setSideBarOpen }) => {
  return (
    <div
      className="fixed w-full h-screen z-10 top-0 left-0 bg-black/60 cursor-pointer"
      onClick={() => setSideBarOpen(!isSideBarOpen)}
    >
      <div
        className={
          isSideBarOpen
            ? 'fixed top-0 left-0 w-[400px] h-screen bg-white z-10 duration-300'
            : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'
        }
      >
        <X
          size={30}
          onClick={() => setSideBarOpen(!isSideBarOpen)}
          className="absolute cursor-pointer top-4 right-4 "
        />
        <div className="space-y-5 py-20 flex flex-col px-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-lime-600 text-xl flex' : 'text-xl hover:text-lime-600 flex'
            }
          >
            <House size={20} className="mr-2 mt-1" />
            Home
          </NavLink>
          <NavLink
            to="explore"
            className={({ isActive }) =>
              isActive ? 'text-lime-600 text-xl flex' : 'text-xl hover:text-lime-600 flex'
            }
          >
            <ListCollapse size={20} className="mr-2 mt-1" />
            Explore
          </NavLink>
          <NavLink
            to="help"
            className={({ isActive }) =>
              isActive ? 'text-lime-600 text-xl flex' : 'text-xl hover:text-lime-600 flex'
            }
          >
            <CircleHelp size={20} className="mr-2 mt-1" />
            Help
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
