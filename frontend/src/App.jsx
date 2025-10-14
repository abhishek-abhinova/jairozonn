import {Routes , Route, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';
import AddAddress from './pages/AddAddress';
import Books from './pages/Books';
import BookDetails from './pages/Bookdetails';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
// import SEO from './components/SEO';
import { Toaster } from 'react-hot-toast';
import { use, useContext } from 'react';
import { AppContext } from './context/AppContext';
import AdminLayout from './pages/admin/AdminLayout';
import ProductList from './pages/admin/ProductList';
import Dashboard from './pages/admin/Dashboard';
import About from './pages/About';
import AddProduct from './pages/admin/AddProduct';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import AdminLogin from './pages/admin/AdminLogin';
import PrivacyPolicy from './pages/PrivacyPolicy';

const App = () => {
  const isAdminPath=useLocation().pathname.includes('admin');
  const { isAdmin,navigate } =useContext(AppContext);
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 max-w-screen-2xl mx-auto">
      {/* <SEO /> */}
      <Toaster />
      {isAdminPath ? null : <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/add-address' element={<AddAddress />} />
        <Route path='/books' element={<Books />} />
        <Route path='/book/:id' element={<BookDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route path='/admin/*' element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='products' element={<ProductList />} />
        <Route path='add-product' element={<AddProduct />} />
        <Route path='orders' element={<Orders />} />
        <Route path='users' element={<Users />} />
        <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='/admin/login' element={<AdminLogin />} />
      </Routes>
      {isAdminPath ? null : <Footer />}
      {isAdminPath ? null : <Chatbot />}
    </div>
  );
};

export default App;
