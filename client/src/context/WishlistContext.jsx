import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "./auth-context";
import { WishlistContext } from "./wishlist-context";

const getSavedWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState(getSavedWishlist);

  useEffect(() => {
    let mounted = true;

    if (!user) {
      Promise.resolve().then(() => {
        if (mounted) {
          setWishlist(getSavedWishlist());
        }
      });

      return () => {
        mounted = false;
      };
    }

    API.get("/wishlist")
      .then(({ data }) => {
        const cars = data.wishlist
          .map((item) => item.car)
          .filter(Boolean);

        if (mounted) {
          setWishlist(cars);
          localStorage.setItem("wishlist", JSON.stringify(cars));
        }
      })
      .catch((error) => console.log(error));

    return () => {
      mounted = false;
    };
  }, [user]);

  const addToWishlist = async (car) => {
    const exists = wishlist.find((item) => item._id === car._id);

    if (exists) return false;

    if (user) {
      try {
        await API.post("/wishlist", {
          carId: car._id,
        });
      } catch (error) {
        if (error.response?.status === 400) {
          return false;
        }

        console.log(error);
        return false;
      }
    }

    const updated = [...wishlist, car];

    setWishlist(updated);

    localStorage.setItem("wishlist", JSON.stringify(updated));

    return true;
  };

  const removeFromWishlist = async (id) => {
    if (user) {
      try {
        await API.delete(`/wishlist/${id}`);
      } catch (error) {
        console.log(error);
        return;
      }
    }

    const updated = wishlist.filter((car) => car._id !== id);

    setWishlist(updated);

    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const clearWishlist = async () => {
    if (user) {
      try {
        await Promise.all(
          wishlist.map((car) => API.delete(`/wishlist/${car._id}`)),
        );
      } catch (error) {
        console.log(error);
        return;
      }
    }

    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
