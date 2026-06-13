import { Link } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../context/wishlist-context";
import { AuthContext } from "../context/auth-context";

function Navbar() {
  const auth = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);

  const user = auth?.user;
  const logout = auth?.logout;

  return (
    <nav className="bg-slate-950 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-3xl font-bold text-cyan-400">
        DriveEase
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>

        {/* Wishlist visible for everyone */}
        <Link to="/wishlist" className="relative">
          ❤️
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {wishlist.length}
          </span>
        </Link>

        {user ? (
          <>
            <Link to="/my-bookings">My Bookings</Link>

            <Link to="/profile">Profile</Link>

            {user.role === "admin" && (
              <Link to="/admin" className="bg-cyan-600 px-4 py-2 rounded">
                Admin
              </Link>
            )}

            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
