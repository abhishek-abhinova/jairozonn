import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FiPackage, FiTruck, FiCheck, FiClock, FiX, FiEye, FiDownload } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import toast from 'react-hot-toast';

const MyOrders = () => {
    const { axios, user } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/order/user-orders');
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            toast.error('Failed to fetch orders');
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <FiClock className="w-5 h-5 text-yellow-600" />;
            case 'Processing': return <FiPackage className="w-5 h-5 text-blue-600" />;
            case 'Shipped': return <FiTruck className="w-5 h-5 text-purple-600" />;
            case 'Delivered': return <FiCheck className="w-5 h-5 text-green-600" />;
            case 'Cancelled': return <FiX className="w-5 h-5 text-red-600" />;
            default: return <BsBoxSeam className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'Processing': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Shipped': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'Delivered': return 'bg-green-50 text-green-700 border-green-200';
            case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
                <p className="text-gray-600">Track and manage your orders</p>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                    <button
                        onClick={() => window.location.href = '/books'}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                            {/* Order Header */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-100">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(order.status)}
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Order ID</p>
                                            <p className="font-semibold text-gray-800">#{order._id.slice(-8)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Order Date</p>
                                            <p className="font-semibold text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Total Amount</p>
                                            <p className="font-bold text-xl text-green-600">${order.amount?.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Content */}
                            <div className="p-6">
                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* Items */}
                                    <div className="md:col-span-2">
                                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                                            <BsBoxSeam className="w-4 h-4 mr-2" />
                                            Items ({order.items?.length || 0})
                                        </h3>
                                        <div className="space-y-3">
                                            {order.items?.slice(0, 2).map((item, index) => (
                                                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                                    <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                        {item.product?.image ? (
                                                            <img 
                                                                src={`https://jairozon.onrender.com/images/${item.product.image}`}
                                                                alt={item.product.title}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <span className="text-2xl">📚</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800">{item.product?.title || 'Book Title'}</p>
                                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                        <p className="text-sm font-semibold text-blue-600">${item.product?.offerPrice || '0.00'}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {order.items?.length > 2 && (
                                                <p className="text-sm text-gray-600 text-center py-2">
                                                    +{order.items.length - 2} more items
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Delivery Info */}
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                                            <FiTruck className="w-4 h-4 mr-2" />
                                            Delivery Address
                                        </h3>
                                        {order.address ? (
                                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                                <p className="font-medium text-gray-800">
                                                    {order.address.firstName} {order.address.lastName}
                                                </p>
                                                <p className="text-sm text-gray-600">{order.address.street}</p>
                                                <p className="text-sm text-gray-600">
                                                    {order.address.city}, {order.address.state} {order.address.zipcode}
                                                </p>
                                                <p className="text-sm text-gray-600">{order.address.country}</p>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500">Address not available</p>
                                        )}

                                        <div className="mt-4 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Payment Method:</span>
                                                <span className="font-medium">{order.paymentType || 'COD'}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Payment Status:</span>
                                                <span className={`font-medium ${
                                                    order.isPaid ? 'text-green-600' : 'text-orange-600'
                                                }`}>
                                                    {order.isPaid ? 'Paid' : 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setShowOrderModal(true);
                                        }}
                                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <FiEye className="w-4 h-4" />
                                        <span>View Details</span>
                                    </button>
                                    {order.status === 'Delivered' && (
                                        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                            <FiDownload className="w-4 h-4" />
                                            <span>Download Invoice</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Order Details Modal */}
            {showOrderModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                                <button
                                    onClick={() => setShowOrderModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Order ID</h3>
                                    <p className="text-gray-900">#{selectedOrder._id}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Order Date</h3>
                                    <p className="text-gray-900">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Status</h3>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                                        {getStatusIcon(selectedOrder.status)}
                                        <span className="ml-2">{selectedOrder.status || 'Pending'}</span>
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Total Amount</h3>
                                    <p className="text-2xl font-bold text-green-600">${selectedOrder.amount?.toFixed(2)}</p>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">Items Ordered</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items?.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                {item.product?.image ? (
                                                    <img 
                                                        src={`https://jairozon.onrender.com/images/${item.product.image}`}
                                                        alt={item.product.title}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <span className="text-2xl">📚</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">{item.product?.title || 'Book Title'}</p>
                                                <p className="text-sm text-gray-600">Author: {item.product?.author || 'Unknown'}</p>
                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                <p className="text-sm font-semibold text-blue-600">${item.product?.offerPrice || '0.00'} each</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-800">
                                                    ${((item.product?.offerPrice || 0) * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {selectedOrder.address && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Delivery Address</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-900 font-medium">{selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                                        <p className="text-gray-600">{selectedOrder.address.street}</p>
                                        <p className="text-gray-600">{selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.zipcode}</p>
                                        <p className="text-gray-600">{selectedOrder.address.country}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrders;