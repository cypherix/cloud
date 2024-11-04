import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
  <>
  <div className="home relative flex flex-col gap-y-4 lg:flex-row items-center justify-center w-full min-h-screen">
    
    <div className="flex flex-col">
      <h1  style={{"zIndex": "999"}} className="herotext text-[150px] md:text-[200px] md:tracking-normal lg:text-[250px] text-slate-400 dark:text-[#f0e5f7]  dark:text-slate-900  font-bold lg:tracking-wide lg:leading-4 lg:shadow-md">
        AIR MAX
      </h1>
      
      <img
        src="./hero-img.png"
        alt="img"
        width={700}
        height={700}
        className="absolute w-[500px] h-[500px] object-cover md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] top-[10%] left-[5%] md:left-[30%] animation-move infinite ease-in-out duration-3s"
        onMouseEnter={(e) => e.currentTarget.classList.add('paused')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('paused')}
      />
    </div>
    <style jsx>{`
  @keyframes move {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .animation-move {
    animation: move 3s infinite;
  }

  .paused {
    animation-play-state: paused;
  }
`}</style>
    <button className="bg-[#2a2a2a] dark:bg-slate-800 text-white p-2 rounded-md cursor-pointer hover:bg-black">
          <Link to="/explore">Explore Now</Link>
        </button>
  </div>
</>



        
        
  
  );
};

export default Home;
