import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/CartSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Card = ({ shoe }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // Local state to manage loading animation

  const img = shoe.original_picture_url;
  const price = shoe.retail_price_cents;
  const desc = shoe.story_html;
  const id = shoe.id;

  const dispatch = useDispatch();

  const add = () => {
    if (!user.user) {
      toast.error('Please Login First');
      return;
    }
    dispatch(addToCart(shoe));
    toast.success('Added to cart');
  };

  const remove = () => {
    dispatch(removeFromCart(shoe.id));
    toast.error('Removed item from cart');
  };

  const handleImageLoaded = () => {
    setIsLoading(false); // Set loading state to false once image is loaded
  };

  return (
    <div>
      <div className="w-[300px] h-[420px] shadow-sm rounded-2xl p-4 bg-[#ffffffdd] dark:bg-[#ffffff3f] dark:hover:bg-[#ffffff] dark:text-white dark:outline-none dark:border-none border border-slate-100 outline outline-slate-100 hover:shadow-2xl relative">
        <div className="flex flex-col gap-6">
          {isLoading && (
            <div className="w-[200px] h-[200px] bg-gray-500 animate-pulse rounded-full mx-auto"></div>
          )}
          <div>
            <img
              src={img}
              width={200}
              height={200}
              alt="shoe"
              className="mx-auto"
              onLoad={handleImageLoaded} // Event handler to handle image load
              style={{ display: isLoading ? 'none' : 'block' }}
            />
            <Link to={`/preview/${id}`}>
              <button className="absolute bg-slate-600 dark:bg-slate-800 dark:font-semibold text-white text-xs p-1 top-2 right-2 rounded-md animate-pulse">
                Preview
              </button>
            </Link>
          </div>

          <p className="text-base text-[#303030] font-medium max-h-[96px] overflow-y-hidden">
            {desc.split(' ').slice(0, 20).join(' ') + '...'}
          </p>

          <div className="flex items-center justify-between">
            {cart.some((item) => item.id === shoe.id) ? (
              <button
                onClick={remove}
                className="bg-red-400 text-white p-2 rounded-md text-sm"
              >
                Remove Item
              </button>
            ) : (
              <button
                onClick={add}
                className="bg-black dark:bg-slate-800 dark:hover:bg-black text-white p-2 rounded-md text-sm"
              >
                Add to Cart
              </button>
            )}
            <span className="text-xl text-black font-semibold">₹ {price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
