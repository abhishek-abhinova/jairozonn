import { categories } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
const Search = () => {
  const { setSearchQuery, navigate } = useContext(AppContext);
  const [input, setInput] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(input);
    navigate("/books");
  }
  return (
    <div className="my-8 md:my-16 rounded-lg shadow-md bg-white min-h-[300px] md:h-[400px] flex flex-col bg-gradient-to-b from-purple-200/80 items-center justify-center p-4 md:p-8">
      <form onSubmit={handleSearch} className="max-w-4xl w-full mx-auto flex flex-col sm:flex-row justify-center gap-3 sm:gap-0">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Search Book..." 
          className="w-full sm:w-1/2 outline-none border border-gray-300 py-3 md:py-4 px-4 text-center rounded-l-lg sm:rounded-r-none rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button className="py-3 md:py-4 px-6 md:px-12 bg-primary text-white border rounded-r-lg sm:rounded-l-none rounded-l-lg cursor-pointer hover:bg-purple-700 transition-colors btn-touch">Search</button>
      </form>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-3 md:gap-5 mt-6 md:mt-8 w-full max-w-4xl">
        {
            categories.map((category, index) => (
<div key={category.id || index} tabIndex={category.id || index} className="w-full md:w-[116px] mx-auto flex items-center justify-center bg-gray-300 border border-gray-300 rounded-md cursor-pointer p-2 hover:bg-gray-400 transition-colors"> 
    <img src={category.image} alt={category.name || 'Category'} className="max-w-full h-auto" />
</div>
            ))}
      </div>
    </div>
  );
};

export default Search;

