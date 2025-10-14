import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
const AddAddress = () => {
  const {axios,user,navigate} = useContext(AppContext);
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",email: "",
  });
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    };
    useEffect(() => {
      if (!user) {
        navigate("/cart");
      }
  }, []);
  return(
    <div className="flex items-center justify-center h-screen bg-primary">
   <form onSubmit={handleSubmit} className="bg-white text-gray-500 max-w-[500px] mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10">
    <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Add New Address</h2>
    <input className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-400 outline-none rounded py-2.5 px-3 " type="text" value={address.fullName} name="fullName" onChange={handleChange} placeholder="Full Name" required />
     <input className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-400 outline-none rounded py-2.5 px-3 " type="text" value={address.phoneNumber} name="phoneNumber" onChange={handleChange} placeholder="Phone Number" required />
      <input className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-400 outline-none rounded py-2.5 px-3 " type="email" value={address.email} name="email" onChange={handleChange} placeholder="Email" required />
      <input className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-400 outline-none rounded py-2.5 px-3 " type="text" value={address.street} name="street" onChange={handleChange} placeholder="Street Address" required />
        <input className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-400 outline-none rounded py-2.5 px-3 " type="text" value={address.city} name="city" onChange={handleChange} placeholder="City" required />
          <input className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-400 outline-none rounded py-2.5 px-3 " type="text" value={address.state} name="state" onChange={handleChange} placeholder="State" required />
            <input className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-400 outline-none rounded py-2.5 px-3 " type="text" value={address.zipCode} name="zipCode" onChange={handleChange} placeholder="Zip Code" required />
              <input className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-400 outline-none rounded py-2.5 px-3 " type="text" value={address.country} name="country" onChange={handleChange} placeholder="Country" required />

    <button type="submit" className="w-full my-3 bg-primary active:scale-95 transition py-2.5 rounded text-white">Add Address</button>
</form>
</div>
  )
};

export default AddAddress;
