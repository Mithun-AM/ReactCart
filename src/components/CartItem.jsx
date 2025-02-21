import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

export default function CartItem({ item, itemIdx }) {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item removed from Cart");
  }

  return (

    <div className="p-4 border-b-2 border-slate-700 last:border-none">

      <div className="flex justify-between py-3.5 px-2.5 gap-14 flex-row">
        <NavLink to={`/${item.id}`}>
          <div className="md:w-[30%] w-full flex justify-center items-center">
            <img src={item.image} alt="cartItem" className="w-full" />
          </div>
        </NavLink>
        <div className=" w-full flex flex-col gap-5">
          <NavLink to={`/${item.id}`}>
            <h2 className="text-xl font-[600] text-green-600">{item.title}</h2>
          </NavLink>
          <p className="text-slate-400">
            {item.description.split(" ").slice(0, 14).join(" ") + "..."}
          </p>

          <div className="flex justify-between">
            <span className="font-bold text-[#16a34a] text-lg">${item.price}</span>
            <button
              className="w-10 h-10 rounded-full bg-red-200 flex justify-center items-center
             hover:bg-red-400 group transition-all"
              onClick={removeFromCart}>
              <MdDelete fontSize={18} className="group-hover:text-white text-red-800 transition-all" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
