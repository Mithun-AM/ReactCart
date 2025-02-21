import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import SingleProduct from "./pages/SingleProduct";

const App = () => {
  return (
    <div>
      <div className="bg-slate-900 fixed top-0 w-full z-10">
        <Navbar></Navbar>
      </div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/:productId" element={<SingleProduct/>}/>
      </Routes>
    </div>
  );
};

export default App;
