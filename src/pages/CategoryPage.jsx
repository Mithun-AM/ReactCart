import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slices/ProductSlice";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

export default function CategoryPage() {
    const { category } = useParams();
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ category }));
    }, [category, dispatch]);

    return (
        <div className="min-h-screen flex flex-col items-center pt-24 pb-4 px-4 bg-gray-100">
            {
                status === "loading" ? (
                    <Spinner />
                ) : items.length > 0 ? (
                    <div className="w-full max-w-6xl">
                        <h2 className="text-xl md:text-2xl font-bold text-[#444444] mb-6">
                            Category: <span className="font-semibold text-[#00875A] uppercase">{category}</span>
                        </h2>

                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
                            {items.map((item) => (
                                <Product key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-screen w-full flex justify-center items-center text-2xl font-semibold text-[#50a060]">
                        No Data Found
                    </div>
                )
            }
        </div>
    );
}
