import Category from '../components/Category';
import Hero from '../components/Hero';
import Search from '../components/Search';
import NewArrival from '../components/NewArrival';
import NewsLetter from '../components/NewsLetter';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
const Home = () => {
  const { setSearchQuery, setSelectedCategory } = useContext(AppContext);
  useEffect(() => {
    setSearchQuery("");
    setSelectedCategory("");
  }, []);
  return (
    <div>
      <Hero />
      <Search />
      <Category />
      <NewArrival />
      <NewsLetter />
    </div>
  )
};

export default Home;
