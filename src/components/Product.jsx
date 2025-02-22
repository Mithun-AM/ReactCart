import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { add, remove } from "../redux/Slices/CartSlice";
import { NavLink } from "react-router-dom";
import { MdShoppingCart, MdDelete } from "react-icons/md";

export default function Product({ item }) {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(item));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item removed from Cart");
  };

  const discountPercentage = item.discount || 0;
  const discountedPrice = (item.price * (1 - discountPercentage / 100)).toFixed(2);

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 p-4 
      w-full sm:w-[95%] max-w-[290px] min-[425px]:max-w-[300px] flex flex-col h-full">
      
      {/* Image Section */}
      <NavLink to={`/${item.id}`} className="w-full h-48 flex justify-center items-center bg-white rounded-md overflow-hidden">
        <img src={item.image} alt="Not Available" className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
      </NavLink>

      {/* Content Wrapper to Maintain Equal Heights */}
      <div className="flex-grow flex flex-col">
        {/* Title & Description */}
        <NavLink to={`/${item.id}`} className="text-lg font-semibold text-gray-800 hover:text-green-700 hover:underline line-clamp-2">
          {item.title.length > 50 ? item.title.substring(0, 50) + "..." : item.title}
        </NavLink>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{item.description.substring(0, 50) + "..." }</p>

        {/* Price Section (Sticks to Bottom) */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-gray-500 line-through text-sm">${item.price.toFixed(2)}</span>
            <span className="text-lg font-bold text-green-600">${discountedPrice}</span>
            {discountPercentage > 0 && <span className="text-xs text-red-600 font-semibold">-{discountPercentage}% OFF</span>}
          </div>

          {/* Add/Remove Button */}
          {cart.some((p) => p.id === item.id) ? (
            <button onClick={removeFromCart} className="group w-10 h-10 rounded-full border border-red-300 bg-red-100 flex justify-center items-center 
              hover:border-red-700 hover:bg-red-700 transition-all duration-300">
              <MdDelete fontSize={20} className="text-red-700 group-hover:text-white transition-all duration-300" />
            </button>
          ) : (
            <button onClick={addToCart} className="group w-10 h-10 rounded-full border border-green-300 bg-green-100 flex justify-center items-center 
              hover:border-green-700 hover:bg-green-700 transition-all duration-300">
              <MdShoppingCart fontSize={20} className="text-green-700 group-hover:text-white transition-all duration-300" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
