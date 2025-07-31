import {useState, useEffect} from "react";
import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";
import PropTypes from "prop-types";
import LogoutButton from "../../../components/buttons/LogoutButton";
import { getUser } from "../../../api/users"; 
import png from "../../../assets/gray-user-profile-icon-png-fP8Q1P.png";
import NotificationModal from "../../admin/notification/NotificationModal";
import { getUnreadNotificationCount } from "../../../api/notification";
import { useAuth } from "../../../contexts/AuthContext"
import socket from "../../../utils/socket";


export const Header = ({ collapsed, setCollapsed }) => {
    const { user } = useAuth();
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
  
      // Connect and listen to new notifications
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
        const userData = await getUser();  // just call your function
        setProfile(userData);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // const navigate = useNavigate();

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-tealGreenish px-4 shadow-md transition-colors">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10 cursor-pointer hover:bg-lightMainBg hover:text-ActionPurple"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed && "rotate-180"} />
                </button>
            </div>
            <div className="flex items-center gap-x-3">
            {user && (
            <div className="text-white font-semibold">
            <span>Hi! {user.first_name}</span>
          </div>
          )}<button
          className={`relative cursor-pointer hover:bg-lightMainBg hover:text-ActionPurple btn-ghost size-10 transition-all duration-200 rounded-full ${
   showNotifications
     ? "bg-offWhite text-ActionPurple shadow dark:bg-gray-700 dark:text--ActionPurple"
     : "hover:bg-gray-200 dark:hover:bg-gray-600"
 }`}
         onClick={() => setShowNotifications(!showNotifications)}
       >
         <Bell size={20} />
         {unreadCount > 0 && (
           <span className="absolute  right-0 top-0 h-4 w-4 rounded-full bg-red-600 text-xs text-white flex items-center justify-center">
             {unreadCount}
           </span>
         )}
       </button>
                <button className="size-10 hover:bg-lightMainBg hover:text-ActionPurple cursor-pointer overflow-hidden rounded-full text-white">
  {profile ? (
          <>
            <img
              src={profile.profile_picture_url || png}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover bg-gray-300"
            />
            <span className="text-sm font-medium">{profile.first_name}</span>
          </>
        ) : (
          <div>Loading...</div>
        )}
</button>

                <LogoutButton/>
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