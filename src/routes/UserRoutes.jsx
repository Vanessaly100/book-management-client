
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/user/Profile";
import Cart from "../pages/user/Cart";
import Reservations from "../pages/user/Reservations";
// import BorrowedBooks from "../pages/user/BorrowedBooks";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="cart" element={<Cart />} />
      <Route path="reservations" element={<Reservations />} />
      {/* <Route path="borrowed" element={<BorrowedBooks />} /> */}
      <Route path="*" element={<h2>User Page Not Found</h2>} />
    </Routes>
  );
};

export default UserRoutes;

