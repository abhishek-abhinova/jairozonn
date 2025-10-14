import { categories } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const Category = () => {
  const { setSelectedCategory, navigate } = useContext(AppContext);
  const handleCategoryClick = (name) => {
    setSelectedCategory(name);
    navigate("/books");
  };
  return (
    <div className="my-16 ">
      <h1 className="text-2xl md:text-5xl font-bold text-gray-800">Shop by Category</h1>
      <div className="my-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-center justify-center gap-6">
        {categories.map((category) => (
            <div onClick={() => {handleCategoryClick(category.name);   window.scrollTo({top: 0, behavior: 'smooth'});}} key={category.id}  className="flex flex-col items-center justify-center border border-gray-300 rounded-lg transition-all hover:scale-105 p-3 cursor-pointer"> 
    <img src={category.image} alt="" />
    <p className="text-gray-700 text-2xl font-bold mt-2 mb-4">{category.name}</p>
</div>
        ))}
      </div>
    </div>
  )
}

export default Category;
