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
    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;
