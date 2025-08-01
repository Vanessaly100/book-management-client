import { forwardRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { navbarLinksFrontend } from "../../../constants/Index";

import logo from "../../../assets/book_7629876.png";
import { cn } from "../../../lib/utils";

import PropTypes from "prop-types";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
  const navigate = useNavigate();
  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-tealGreenish dark:bg-darkTealGreenish text-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700",
        collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
        collapsed ? "max-md:-left-full" : "max-md:left-0"
      )}
    >
      <div
        className="flex gap-x-3 p-3 cursor-pointer items-center"
        onClick={() => navigate("/user/home")}
      >
        <img
          src={logo}
          alt="Logoipsum"
          className="dark:hidden w-[50px] h-[50px]"
        />
        <img
          src={logo}
          alt="Logoipsum"
          className="hidden dark:block w-[50px] h-[50px]"
        />
        {!collapsed && (
          <p className="text-lg font-medium text-white transition-colors dark:text-slate-50">
            FinLib
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
        {navbarLinksFrontend.map((navbarLink) => (
          <nav
            key={navbarLink.title}
            className={cn("sidebar-group", collapsed && "md:items-center")}
          >
            <p
              className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}
            >
              {navbarLink.title}
            </p>
            {navbarLink.links.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={cn("sidebar-item", collapsed && "md:w-[45px]")}
              >
                <link.icon
                  size={22}
                //   color="#FFB400"
                  className="flex-shrink-0 text-ActionMiniPurple"
                />
                {!collapsed && (
                  <p className="whitespace-nowrap">{link.label}</p>
                )}
              </NavLink>
            ))}
          </nav>
        ))}
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};
