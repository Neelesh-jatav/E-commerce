import React from "react";
import {
  Bell,
  LayoutDashboard,
  ListOrdered,
  Package,
  Users,
  User,
  LogOut,
  MoveLeft,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toggleNavbar, toggleComponent } from "../store/slices/extraSlice";
import { logout } from "../store/slices/authSlice";

const SideBar = () => {
  const { isNavbarOpened, openedComponent } = useSelector((state) => state.extra);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavClick = (title) => {
    dispatch(toggleComponent(title));
    if (window.innerWidth < 768) {
      dispatch(toggleNavbar());
    }
  };

  const links = [
    { icon: <LayoutDashboard />, title: "Dashboard" },
    { icon: <ListOrdered />, title: "Orders" },
    { icon: <Package />, title: "Products" },
    { icon: <Users />, title: "Users" },
    { icon: <User />, title: "Profile" },
    { icon: <Bell />, title: "Notifications" },
  ];

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <aside
      className={`${isNavbarOpened ? "left-[10px]" : "-left-full"}
        fixed w-64 h-[97.5vh] rounded-xl bg-white z-10 mt-[10px] transition-all duration-300 shadow-lg p-4 flex flex-col justify-between md:left-[10px]`}
    >
      <nav className="space-y-2">
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <MoveLeft className="block md:hidden cursor-pointer" onClick={() => dispatch(toggleNavbar())} />
          </div>
          <hr />
        </div>
        {links.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(item.title)}
            className={`${openedComponent === item.title ? "bg-dark-gradient text-white" : "hover:bg-gray-200"}
              w-full transition-all duration-300 rounded-md cursor-pointer px-3 py-2 flex items-center gap-2`}
          >
            {item.icon} {item.title}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="pt-2 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="text-white rounded-md cursor-pointer flex items-center px-3 
          py-2  gap-2 bg-red-gradient"
        >
          <LogOut /> Logout
        </button>
      </div>
    </aside>
  );
};

export default SideBar;