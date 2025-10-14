import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext"; // import your context
import { useState } from "react";
import toast from "react-hot-toast";
const AdminLogin = () => {
  const {navigate, setIsAdmin, axios} = useContext(AppContext);   // ✅ from React Router
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
   e.preventDefault();
    try {
    const { data } = await axios.post("/admin/login", formData);
    if(data.success){
      toast.success(data.message);
      setIsAdmin(true);
      navigate("/admin");
    }
    else{
      toast.error(data.message);
    }
   } catch (error) {
    toast.error("Login failed. Please try again." + error.message);
   }
  }
  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <form onSubmit={handleSubmit}
      className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
    <h1 className="text-gray-900 text-3xl mt-10 font-medium">Admin Login</h1>
    <p className="text-gray-500 text-sm mt-2">Please sign</p>
    <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
      <IoMailOutline className="w-5 h-5" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email id" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required/>                 
    </div>

    <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <RiLockPasswordLine className="w-5 h-5" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required/>                 
    </div>
   

    <button className="mt-2 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity">
        Login
    </button>
    
</form>
    </div>
  );
};

export default AdminLogin;
