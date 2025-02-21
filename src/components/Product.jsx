import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-hot-toast';
import { add, remove } from "../redux/Slices/CartSlice";
import { NavLink } from "react-router-dom";

export default function Product({ item }) {

  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(item));
    toast.success("Item added to Cart");
  }

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item removed from Cart");
  }

  return (
    <NavLink to={`/${item.id}`}>

      <div
        className="flex flex-col items-center justify-between hover:scale-105 transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl border border-slate-200 shadow-xl hover:shadow-slate-400"
      >
        <div>
          <p
            className="text-gray-700 font-semibold text-lg truncate text-left w-40 mt-1"
          >{item.title}</p>
        </div>

        <div>
          <p className="w-40 text-gray-400 font-normal text-[10px] text-left">{item.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
        </div>

        <div className="h-[180px]">
          <img src={item.image} alt="Product" className="h-full w-full" />
        </div>

        <div className="flex justify-between w-full items-center mt-5">
          <div>
            <p className="text-green-600 font-semibold">${item.price}</p>
          </div>

          {
            cart.some((p) => p.id === item.id) ?
              (
                <button
                  className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                  onClick={removeFromCart}>
                  Remove Item
                </button>
              ) :
              (
                <button
                  className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                  onClick={addToCart}>
                  Add to Cart
                </button>
              )
          }

        </div>
      </div>
    </NavLink>

  );
}