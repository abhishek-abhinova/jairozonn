import { Link, Outlet, Navigate } from "react-router-dom";  
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { FiHome, FiBook, FiPlus, FiShoppingCart, FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiBell, FiSearch } from "react-icons/fi";
import Logo from "../../components/Logo";

const AdminLayout = () => {
    const { setIsAdmin, navigate, axios, isAdmin } = useContext(AppContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    useEffect(() => {
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
        { name: "Dashboard", path: "/admin", icon: FiHome, color: "text-blue-600" },
        { name: "All Books", path: "/admin/products", icon: FiBook, color: "text-green-600" },
        { name: "Add Book", path: "/admin/add-product", icon: FiPlus, color: "text-purple-600" },
        { name: "Orders", path: "/admin/orders", icon: FiShoppingCart, color: "text-orange-600" },
        { name: "Users", path: "/admin/users", icon: FiUsers, color: "text-pink-600" },
        { name: "Settings", path: "/admin/settings", icon: FiSettings, color: "text-gray-600" },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get("/admin/logout");
            if(data.success){
                toast.success(data.message);
                setIsAdmin(false);
                navigate("/");
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left side */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                                {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                            </button>
                            <Link to="/admin" className="flex items-center space-x-2">
                                <Logo size="small" variant="default" />
                                <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Admin Panel</span>
                            </Link>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors relative">
                                <FiBell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            </button>
                            
                            <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold">J</span>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-semibold">Jairo Moreno</p>
                                    <p className="text-xs opacity-90">Administrator</p>
                                </div>
                            </div>
                            
                            <button
                                onClick={logout}
                                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <FiLogOut className="w-4 h-4" />
                                <span className="hidden sm:block">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
                    <div className="flex flex-col h-full pt-6">
                        <nav className="flex-1 px-4 space-y-2">
                            {sidebarLinks.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    end={item.path === "/admin"}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) => 
                                        `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                            isActive 
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : item.color}`} />
                                            {item.name}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                        
                        {/* Sidebar Footer */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                                <h4 className="text-sm font-semibold text-gray-800 mb-2">Need Help?</h4>
                                <p className="text-xs text-gray-600 mb-3">Check our documentation for guidance</p>
                                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs py-2 px-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors">
                                    View Docs
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div 
                        className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50" 
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 min-h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
export default AdminLayout;