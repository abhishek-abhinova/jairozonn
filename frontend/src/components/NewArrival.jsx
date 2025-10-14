import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import BookCard from "./BookCard";

const NewArrival = () => {
  const { booksData } = useContext(AppContext);
  return (
    <div className="my-16">
       <h1 className="text-2xl md:text-5xl font-bold text-gray-800">New Arrival Books</h1>
       <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {booksData.slice(0,5).map((book) => (
          <BookCard book={book} />
        ))}
       </div>
    </div>
  )
}

export default NewArrival;
