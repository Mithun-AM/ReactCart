import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item removed from Cart");
  };

  const discountPercentage = item.discount || 0;
  const discountedPrice = (item.price * (1 - discountPercentage / 100)).toFixed(2);

  return (
    <div className="p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-lg w-full transition-all duration-300">
      
      {/* First Row (Image - Full Width in Mobile) */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Image */}
        <NavLink to={`/${item.id}`} className="w-full sm:w-24 h-32 sm:h-24 flex justify-center items-center bg-white rounded-md overflow-hidden">
          <img src={item.image} alt="cart item" className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
        </NavLink>

        {/* Title */}
        <NavLink to={`/${item.id}`} className="text-sm sm:text-lg font-semibold text-green-700 hover:text-green-800 hover:underline line-clamp-2 text-center sm:text-left">
          {item.title.length > 50 ? item.title.substring(0, 50) + "..." : item.title}
        </NavLink>
      </div>

      {/* Second Row (Price + Discount + Delete Button) */}
      <div className="flex  sm:flex-row justify-between items-center mt-3 sm:mt-2">
        {/* Price & Discount */}
        <div className="flex flex-row items-center sm:items-center gap-2 w-full">
          <span className="text-gray-500 line-through text-sm sm:text-base">${item.price.toFixed(2)}</span>
          <span className="text-base sm:text-lg font-bold text-green-600">${discountedPrice}</span>
          {discountPercentage > 0 && (
            <span className="text-xs sm:text-sm text-red-600 font-semibold">-{discountPercentage}% OFF</span>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={removeFromCart}
          className="group w-8 h-8 rounded-full border border-red-300 bg-red-100 flex justify-center items-center 
          hover:border-red-700 hover:bg-red-700 transition-all duration-300 mt-2 sm:mt-0"
        >
          <MdDelete
            fontSize={18}
            className="text-red-700 group-hover:text-white transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
}
