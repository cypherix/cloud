import React, { useState, useEffect } from "react";
import CartCard from "../components/CartCard";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkoutCart } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + curr.retail_price_cents * curr.qty, 0)
    );
  }, [cart]);

  const checkout = async () => {
    const orderData = {
      user_email: user.user.email,
      cart: cart
    };
    console.log(orderData);
    try {
      const response = await fetch('http://localhost/sensei/api/order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        toast.success("Order Placed Successfully");
        localStorage.removeItem("localCart");
        dispatch(checkoutCart());
        navigate("/");
      } else {
        const result = await response.json();
        throw new Error(result.error || "Failed to place order");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setError(error);
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen flex my-[100px] mx-[30px] md:mx-[100px] transition-transform duration-300 ease-in-out">
        <div className="flex flex-col lg:flex-row gap-x-6">
          <div>
            {cart.map((cartItem) => (
              <CartCard key={cartItem.id} item={cartItem} />
            ))}
          </div>
          {cart.length === 0 ? (
            <div className="min-w-[320px] md:min-w-[1280px] md:max-h-[100px] flex justify-center">
              <div className="flex flex-col justify-around gap-y-4 md:gap-y-10">
                <div>
                  <h1 className="text-4xl dark:text-white md:text-6xl font-semibold">
                    Cart is Empty !!
                  </h1>
                </div>
                <div className="flex justify-center">
                  <Link to="/explore">
                    <button className="bg-[#2a2a2a] w-[200px] text-white p-4 rounded-md cursor-pointer hover:bg-black">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[200px] mt-[40px] w-[300px] md:w-[600px] p-4 flex flex-col justify-between">
              <div>
                <h1 className="text-xl md:text-4xl font-bold text-slate-300 hover:text-slate-500">
                  TOTAL ITEMS : {cart.length}
                </h1>
                <h1 className="text-xl dark:text-black md:text-5xl font-bold text-slate-500">
                  TOTAL PRICE : ₹ {total}
                </h1>
              </div>
              <div>
                <button
                  className="bg-[#2a2a2a] w-full text-white p-2 rounded-md cursor-pointer hover:bg-black"
                  onClick={checkout}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="text-red-500 mt-4">
            <p>Error: {error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
