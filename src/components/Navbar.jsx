import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo, gif } from "../assets/data";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [click, setClick] = useState(false);
  const mobile = () => {
    setClick(!click);
  };

  return (
    <div className="navbar p-2 md:p-4 flex items-center justify-between h-12 w-full">
      <Link to={"/"} className="flex flex-row items-center gap-2">
        <img src={logo} alt="" height={50} width={50} className="dark:hidden" />
        <img
          src={gif}
          alt=""
          height={20}
          width={20}
          className="hidden dark:block"
        />
        <span className="text-2xl font-[1000] text-center dark:text-black">
          SHOE.
          <span className="font-extrabold text-sm">hub</span>
        </span>
      </Link>

      <ul className="hidden md:flex text-sm  text-black dark:text-dark items-center font-semibold md:tracking-wide alu flex-col  gap-2 md:flex-row  md:gap-8">
        <li>
          <Link to="/">Home</Link>
        </li> 
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        {user.user ? <li>
          <Link to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-xl " />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-2 bg-green-600 text-xs w-4 h-4 
                  flex justify-center items-center animate-bounce rounded-full text-white"
                >
                  {cart.length}
                </span>
              )}
            </div>
          </Link>
        </li>:null}
        <li >
        {user.user ? <Link className="flex items-center gap-2" to={"/profile"}><AiOutlineUser className="text-xl"/>{user.user.username}</Link>:
              <Link to="/Login"><button className="border border-[#2a2a2a] text-[#2a2a2a] p-1.5 rounded-md cursor-pointer hover:bg-[#2a2a2a] hover:text-white">
                Login 
              </button></Link>}
            </li>
            
             
              
        
      </ul>
      {/* hidden max-sm:block */}
      <div className="block md:hidden">
        <button onClick={mobile}>
          {!click && <GiHamburgerMenu className="text-2xl dark:text-black" />}
          {click && <FaTimes className="text-2xl dark:text-black" />}
          <ul
            className={`text-sm ${
              click ? "block" : "hidden"
            } w-full flex flex-col gap-y-4 absolute top-10 left-0 right-0 text-black dark:text-white font-semibold z-10 backdrop-blur-sm`}
          >
            <li className=" rounded-md h-8 text-black">
              <Link to="/">Home</Link>
            </li>
            <li className=" rounded-md h-8 text-black" >
              <Link to="/explore">Explore</Link>
            </li>
            <li className=" rounded-md h-8 text-black">
              <Link to="/cart">Cart</Link>
            </li>
            <li className="rounded-md h-8 ">
    {user.user ? <AiOutlineUser className="text-xl" /> : null}
    {user.user ? (
      <span className="hidden md:inline">{user.user.username}</span>
    ) : (
      <Link to="/Login">
        <button className="border border-[#2a2a2a]  text-[#2a2a2a] p-1.5 rounded-md cursor-pointer hover:bg-[#2a2a2a] hover:text-white">
          Login
        </button>
      </Link>
    )}
  </li>
          </ul>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
