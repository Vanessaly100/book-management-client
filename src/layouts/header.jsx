import { useState, useEffect } from "react";
import { useTheme } from "../hooks/use-theme";
// import { ThemeProviderContext } from "../contexts/theme-context";
import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";
import PropTypes from "prop-types";
import LogoutButton from "../components/buttons/LogoutButton";
import { getUser } from "../api/users";
import NotificationModal from "../pages/admin/notification/NotificationModal";
import { getUnreadNotificationCount } from "../api/notification";
import { useAuth } from "../contexts/AuthContext"
import socket from "../utils/socket";

export const Header = ({ collapsed, setCollapsed }) => {
    // const { theme, setTheme } = useContext(ThemeProviderContext);
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user?.user_id) return;
    const fetchUnread = async () => {
      try {
        const count = await getUnreadNotificationCount(user.user_id);
        setUnreadCount(count);
      } catch (err) {
        console.error("Failed to fetch unread count:", err);
      }
    };

    fetchUnread();
   if (!user || !socket) return;

  socket.emit("register", {
    user_id: user.user_id, // or user.id
    role: user.role,
  });

  socket.emit("join", user.user_id); // optional, for rooms

  socket.on("newNotification", () => {
    setUnreadCount((prev) => prev + 1);
  });

  return () => {
    socket.off("newNotification");
    socket.emit("leave", user.user_id);
  };
}, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUser(); 
                setProfile(userData);
;
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-tealGreenish px-4 shadow-md transition-colors dark:bg-[#1E2727]">
      <div className="flex items-center gap-x-3">
        <button
           className={`relative btn-ghost size-10 transition-all duration-200 rounded-full ${
    collapsed
      ? "bg-offWhite text-Gold shadow dark:bg-gray-700 dark:text-Gold"
      : "hover:bg-gray-200 dark:hover:bg-gray-600"
  }`}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed && "rotate-180"} />
        </button>
        <div className="input bg-[#B3C7C6]">
          <Search size={20} className="text-slate-900" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-900 dark:text-slate-50"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10 cursor-pointer"
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
            console.log("theme button click");
          }}
        >
          <Sun size={20} className="dark:hidden" />
          <Moon size={20} className="hidden dark:block" />
        </button>
        <button
           className={`relative btn-ghost size-10 transition-all duration-200 rounded-full ${
    showNotifications
      ? "bg-offWhite text-Gold shadow dark:bg-gray-700 dark:text-Gold"
      : "hover:bg-gray-200 dark:hover:bg-gray-600"
  }`}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-red-600 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {profile ? (
          <>
            <img
              src={
                profile.profile_picture_url ||
                "../assets/gray-user-profile-icon-png-fP8Q1P.png"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </>
        ) : (
          <div>Loading...</div>
        )}
        <LogoutButton />
        {showNotifications && user && (
          <NotificationModal
            userId={user.user_id}
            onClose={() => setShowNotifications(false)}
          />
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
