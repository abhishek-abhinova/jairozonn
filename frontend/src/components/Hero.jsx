import { useContext } from 'react';
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className="my-28 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 shadow-2xl p-12 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full z-0"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-400 opacity-20 rounded-full z-0"></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-pink-400 opacity-15 rounded-full z-0"></div>

      <div className="relative z-10">
        <img src={assets.hero_girl} alt="Hero Girl" className="w-72 md:w-96 drop-shadow-2xl animate-fade-in" />
        <div className="hidden md:block absolute top-20 -right-40">
          <img src={assets.image8} alt="Decorative" className="w-40 animate-bounce-slow" />
        </div>
      </div>
      <div className="z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
          Discover Your Next <br />
          <span className="text-yellow-300">Favorite Book</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-blue-100 font-medium leading-relaxed">
          Dive into a world of stories, knowledge, and adventure. <br />
          <span className="text-yellow-200">Educational excellence at your fingertips.</span>
        </p>
        <div className="my-10 flex flex-col md:flex-row gap-5 md:gap-10">
          <button
            onClick={() => {
              navigate("/books");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 text-gray-800 rounded-full px-12 py-4 shadow-xl font-bold text-lg cursor-pointer transform hover:scale-105"
          >
            Shop Now
          </button>
          <button
            className="bg-transparent hover:bg-white hover:text-gray-800 transition-all duration-300 text-white border-2 border-white rounded-full px-12 py-4 shadow-xl font-bold text-lg cursor-pointer transform hover:scale-105"
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
