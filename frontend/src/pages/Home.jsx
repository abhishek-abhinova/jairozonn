import Category from '../components/Category';
import Hero from '../components/Hero';
import Search from '../components/Search';
import NewArrival from '../components/NewArrival';
import NewsLetter from '../components/NewsLetter';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const { setSearchQuery, setSelectedCategory } = useContext(AppContext);
  const [showNewsletter, setShowNewsletter] = useState(false);
  
  useEffect(() => {
    setSearchQuery("");
    setSelectedCategory("");
    
    // Check if newsletter popup has been shown in this session
    const hasShownNewsletter = sessionStorage.getItem('newsletterShown');
    if (!hasShownNewsletter) {
      setShowNewsletter(true);
    }
  }, []);
  
  const handleCloseNewsletter = () => {
    setShowNewsletter(false);
    sessionStorage.setItem('newsletterShown', 'true');
  };
  
  return (
    <div>
      <Hero />
      <Search />
      <Category />
      <NewArrival />
      {showNewsletter && <NewsLetter onClose={handleCloseNewsletter} />}
    </div>
  )
};

export default Home;
