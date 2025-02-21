import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";

export default function Cart() {

  const { cart } = useSelector((state) => state)
  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(() => {
    setTotalAmt(
      cart.reduce((sum, item) => sum + item.price, 0)
    )
  }, [cart])

  return (
    <div className="mt-20">
      {
        cart.length > 0 ?
          (
            <div className="w-10/12 max-w-6xl mx-auto flex p-6 gap-16 justify-between mb-10">
              {/* left Cart Item*/}
              <div className="w-[60%]">
                {
                  cart.map((item, index) => {
                    return <CartItem key={item.id} item={item} itemIdx={index} />
                  })
                }
              </div>

              {/* right Summary*/}
              <div className="w-[30%] flex flex-col gap-8 justify-between">

                <div className="mt-5">
                  <p className="text-xl text-[#166534] uppercase font-semibold">Your Cart</p>
                  <p className="text-5xl font-[600] text-[#15803d] uppercase mb-4">Summary</p>
                  <p className="font-[600] text-xl text-slate-700">
                    Total Items: <span className="font-bold">{cart.length}</span>
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-slate-700 text-xl font-semibold mb-5 ">Total Amount: <span className="font-bold ml-2 text-black">${totalAmt.toFixed(2)}</span>
                  </p>
                  <button className="text-lg w-full py-2.5 rounded-lg font-bold text-white bg-[#15803d] border-2 border-[#15803d] hover:bg-white hover:text-[#15803d] transition-all duration-300 ease-in">Checkout Now</button>
                </div>
              </div>
            </div>
          ) :
          (
            <div className="w-screen h-[calc(100vh-80px)] flex flex-col gap-6 justify-center items-center">
              <h2 className="font-semibold text-xl">Cart Empty</h2>
              <NavLink to="/">
                <button className="bg-[#16a34a] text-white text-md uppercase font-[600] py-3 px-10 rounded-md
        border-[#16a34a] border-2 hover:bg-white hover:text-[#16a34a] ease-in transition-all duration-300">Show Now</button>
              </NavLink>
            </div>
          )
      }
    </div>
  );
}