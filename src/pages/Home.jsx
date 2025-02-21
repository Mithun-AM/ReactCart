import { useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slices/ProductSlice";

export default function Home(){
  const {items,status} = useSelector((state)=>state.products);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(status === "idle"){
      dispatch(fetchProducts())
    }
  },[status,dispatch])

  return(
      <div>
          {
            status === "loading" ? 
            (
              <Spinner/>
            ): 
            items.length > 0 ?
            (
              <div className="mt-20 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh] mb-4">
                {
                  items.map((item)=>(
                    <Product key={item.id} item={item}/>
                  ))
                }
              </div>
            ):
            (
              <div className="h-screen w-full flex justify-center items-center text-2xl font-semibold text-[#50a060]">No Data Found</div>
            ) 
          }
      </div>
  );
}