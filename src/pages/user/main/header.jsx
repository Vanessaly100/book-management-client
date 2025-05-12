import {useState, useEffect} from "react";
import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";
import PropTypes from "prop-types";
import LogoutButton from "../../../components/buttons/LogoutButton";
import { getUser } from "../../../api/users"; 
import { useNavigate } from "react-router-dom";
import png from "../../../assets/gray-user-profile-icon-png-fP8Q1P.png";

export const Header = ({ collapsed, setCollapsed }) => {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUser();  // just call your function
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const navigate = useNavigate();

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-tealGreenish px-4 shadow-md transition-colors">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed && "rotate-180"} />
                </button>
                <div className="input bg-[#B3C7C6]">
                    <Search
                        size={20}
                        className="text-slate-900"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-900"
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-3">
            {user && (
            <div className="text-white font-semibold">
            <span>Hi! {user.first_name}</span>
          </div>
          )}
                <button className="btn-ghost size-10"
                onClick={() => navigate("/user/notifications")}>
                    <Bell size={20} />
                </button>
                <button className="size-10 overflow-hidden rounded-full text-white">
  {user ? (
          <>
            <img
              src={user.profile_picture_url || png}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover bg-gray-300"
            />
            <span className="text-sm font-medium">{user.first_name}</span>
          </>
        ) : (
          <div>Loading...</div>
        )}
</button>

                <LogoutButton/>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
