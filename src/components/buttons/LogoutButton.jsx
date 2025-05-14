import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (

    <button onClick={handleLogout} className="bg-red-500 text-offWhite px-4 py-2 rounded-2xl hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer">
      Logout
    </button>
  );
};

export default LogoutButton;
