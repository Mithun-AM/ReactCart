import { FaCartShopping, FaChevronDown, FaBars } from "react-icons/fa6";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slices/ProductSlice";
import { setSelectedCategory } from "../redux/Slices/CategorySlice";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);

  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const Categories_API = "https://fakestoreapi.in/api/products/category";

  async function fetchCategories() {
    try {
      let res = await fetch(Categories_API);
      let data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.log("Error fetching Categories", error);
      setCategories([]);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    if (path) {
      dispatch(setSelectedCategory(path));
    }
  }, [location, dispatch]);

  function handleCategoryClick(category) {
    dispatch(setSelectedCategory(category === "All" ? "Categories" : category));
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileDropdownOpen(false);

    if (category === "All") {
      navigate("/");
    } else {
      navigate(`/category/${category}`);
      dispatch(fetchProducts({ id: null, page: null, category }));
    }
  }

  const hideCategories = location.pathname === "/cart" || location.pathname.match(/^\/\d+$/);

  return (
    <div className="bg-[#053262] text-white shadow-md">
      <nav className="flex justify-between items-center h-16 max-w-6xl mx-auto px-4">
        <NavLink to="/" onClick={() => dispatch(setSelectedCategory("Categories"))}>
          <img src="image.png" alt="logo" className="h-12" />
        </NavLink>

        <div className="hidden md:flex items-center space-x-6 capitalize">
          <NavLink to="/" onClick={() => dispatch(setSelectedCategory("Categories"))}>
            <p className="hover:text-gray-300">Home</p>
          </NavLink>

          {!hideCategories && (
            <div 
              className="relative group" 
              onMouseEnter={() => setIsDropdownOpen(true)} 
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="px-4 py-2 bg-[#053262] rounded-md flex items-center gap-2 capitalize">
                {selectedCategory}
                <FaChevronDown className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-1 w-56 bg-[#0F4C81] rounded-md shadow-md shadow-[#022B5A] border border-[#033A7A]">
                  <div className="flex flex-col">
                    <p className="px-5 py-3 text-white hover:bg-[#1E5EB6] transition cursor-pointer" onClick={() => handleCategoryClick("All")}>All</p>
                    {categories.map((category) => (
                      <p key={category} className="px-5 py-3 text-white hover:bg-[#1E5EB6] transition cursor-pointer" onClick={() => handleCategoryClick(category)}>{category}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <NavLink to="/cart">
            <div className="relative">
              <FaCartShopping className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <FaBars />
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A4483] text-white flex flex-col p-4 space-y-3 capitalize">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <p className="hover:bg-[#0866C6] p-2 rounded">Home</p>
          </NavLink>

          {!hideCategories && (
            <div>
              <button 
                className="flex items-center justify-between w-full px-4 py-2 bg-[#0866C6] rounded cursor-pointer"
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              >
                Categories
                <FaChevronDown className={`transition-transform ${isMobileDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isMobileDropdownOpen && (
                <div className="mt-2 flex flex-col bg-[#04427F] rounded">
                  <p className="px-4 py-3 text-white hover:bg-[#1E5EB6] transition cursor-pointer" onClick={() => handleCategoryClick("All")}>All</p>
                  {categories.map((category) => (
                    <p key={category} className="px-4 py-3 text-white hover:bg-[#1E5EB6] transition cursor-pointer" onClick={() => handleCategoryClick(category)}>{category}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          <NavLink to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex items-center justify-between p-2 hover:bg-[#0866C6] rounded">
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="bg-green-600 text-xs w-5 h-5 flex justify-center items-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      )}
    </div>
  );
}