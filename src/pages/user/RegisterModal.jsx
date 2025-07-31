import { useNavigate } from "react-router-dom";

const RegisterPromptModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRegister = () => {
    onClose(); 
    navigate("/register");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-2">Register Required</h2>
        <p className="text-gray-600 mb-4">
          You need to register an account to access our books. Would you like to register now?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleRegister}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPromptModal;
