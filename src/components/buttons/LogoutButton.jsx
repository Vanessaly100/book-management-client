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
    <button onClick={handleLogout} className="bg-darkTealGreenish px-4 py-2 rounded text-white hover:bg-Gold transition duration-300">
      Logout
    </button>
  );
};

export default LogoutButton;
