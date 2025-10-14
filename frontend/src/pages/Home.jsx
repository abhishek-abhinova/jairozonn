import Category from '../components/Category';
import Hero from '../components/Hero';
import Search from '../components/Search';
import NewArrival from '../components/NewArrival';
import NewsLetter from '../components/NewsLetter';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const { setSearchQuery, setSelectedCategory } = useContext(AppContext);
  const [showNewsletter, setShowNewsletter] = useState(true);
  
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
      {showNewsletter && <NewsLetter onClose={() => setShowNewsletter(false)} />}
    </div>
  )
};

export default Home;
