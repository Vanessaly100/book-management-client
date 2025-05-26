import { useState, useEffect,useContext } from "react";
import { ThemeContext } from "../contexts/theme-context";
import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";
import PropTypes from "prop-types";
import LogoutButton from "../components/buttons/LogoutButton";
import NotificationModal from "../pages/admin/notification/NotificationModal";
import { getUnreadNotificationCount } from "../api/notification";
import { useAuth } from "../contexts/AuthContext"
import socket from "../utils/socket";
import { getUser } from "../api/users";

export const Header = ({ collapsed, setCollapsed }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [profile, setProfile] = useState(null);
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  const { toggleTheme } = useContext(ThemeContext);

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
    user_id: user.user_id, 
    role: user.role,
  });

  socket.emit("join", user.user_id); 

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

  if (!mounted) return null
  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between px-4 shadow-md transition-colors bg-darkTealGreenish">
      <div className="flex items-center gap-x-3">
        <button
           className={`relative btn-ghost hover:bg-lightMainBg hover:text-ActionPurple size-10 transition-all cursor-pointer duration-200 rounded-full ${
    collapsed
      ? "btn-ghost"
      : "btn-ghost"
  }`}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed && "rotate-180"} />
        </button>
        <div className="input bg-transparent border border-gray-400 text-black dark:text-white">
          <Search size={20} className="text-slate-900 dark:text-white" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="w-full bg-transparent text-white outline-0 placeholder:text-white "
          />
        </div>
      </div>
      <div className="flex items-center gap-x-3">
      <button
                    className="btn-ghost size-10 hover:bg-lightMainBg hover:text-ActionPurple cursor-pointer "
                    onClick={toggleTheme}
                >
                    <Sun
                        size={20}
                        className="dark:hidden "
                    />
                    <Moon
                        size={20}
                        className="hidden dark:block"
                    />
                </button>
        <button
           className={`relative btn-ghost hover:bg-lightMainBg hover:text-ActionPurple cursor-pointer size-10 transition-all duration-200 rounded-full ${
    showNotifications
      ? "btn-ghost shadow"
      : "btn-ghost"
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
