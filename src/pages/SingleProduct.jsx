import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { add, remove } from "../redux/Slices/CartSlice";

export default function SingleProduct() {

    const { cart } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { productId } = useParams();
    const product = useSelector((state) =>
        state.products.items.find((p) => p.id === Number(productId))
    )
    console.log(product);

    if (!product) {
        return <div className="h-screen w-full flex justify-center items-center text-2xl font-semibold text-[#50a060]">Product not found</div>;
    }

    const addToCart = () => {
        dispatch(add(product));
        toast.success("Item added to Cart");
      }
    
      const removeFromCart = () => {
        dispatch(remove(product.id));
        toast.error("Item removed from Cart");
      }

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <img src={product.image} alt={product.title} className="w-1/3 my-4" />
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-600 font-bold text-lg mt-2">${product.price}</p>
            <p className="text-yellow-500">⭐ {product.rating.rate} ({product.rating.count} reviews)</p>

            <div>
            {
          cart.some((p) => p.id === product.id) ?
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
    );
}