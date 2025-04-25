// src/pages/ErrorPage.jsx
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">404</h1>
      <p className="text-lg mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-500 underline hover:text-blue-700">
        Go back home
      </Link>
    </div>
  );
};

export default ErrorPage;
