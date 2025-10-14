import { Link, Outlet, Navigate } from "react-router-dom";  
import {assets} from "../../assets/assets";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
const AdminLayout = () => {
    const { setIsAdmin, navigate, axios, isAdmin } = useContext(AppContext);
    
    useEffect(() => {
        // Check admin auth on component mount
        const checkAdminAuth = async () => {
            try {
                await axios.get('/admin/is-auth');
            } catch (error) {
                setIsAdmin(false);
                navigate('/admin/login');
            }
        };
        checkAdminAuth();
    }, []);
    
    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }
    const sidebarLinks = [
        { name: "Dashboard", path: "/admin", icon: assets.list_icon },
        { name: "All Books", path: "/admin/products", icon: assets.list_icon },
        { name: "Add Book", path: "/admin/add-product", icon: assets.add_icon },
        { name: "Orders", path: "/admin/orders", icon: assets.order_icon },
        { name: "Users", path: "/admin/users", icon: assets.list_icon },
    ];
    const logout = async()=>{
        try {
            const { data } = await axios.get("/admin/logout");
            if(data.success){
              toast.success(data.message);
              setIsAdmin(false);
              navigate("/");
            }
        } catch (error) {
            toast.error("Logout failed. Please try again." + error.message);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to="/admin">
                    <img className="h-9" src={assets.logo1} alt="" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500 font-bold text-xl">
                    <p>Hi! Jairo (Admin)</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
            <div className="flex">
                <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item, index) => (
                    <NavLink to={item.path} key={index}
                    end={item.path === "/admin"}
                        className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-primary border-primary text-gray-800"
                                : "hover:bg-gray-100/90 border-white "
                            }`
                        }
                    >
                        <img src={item.icon} alt="" className="w-7 h-7" />
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
            <Outlet />
            </div>
        </>
    );
};
export default AdminLayout;