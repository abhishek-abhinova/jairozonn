import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Cart = () => {
    const [showAddressDropdown, setShowAddressDropdown] = useState(false);
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOptions, setPaymentOptions] = useState("COD");
    const [loading, setLoading] = useState(false);
    const [showOrderSuccess, setShowOrderSuccess] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const {
        cart,
        navigate,
        cartCount,
        totalCartPrice,
        updateCart,
        removeFromCart,
        axios,
        setCart,
        user,
    } = useContext(AppContext);

    // Fetch addresses
    const getAddress = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/address/get");
            if (data.success) {
                setAddress(data.addresses || []);
                if (data.addresses && data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) getAddress();
    }, [user]);

    // Calculate tax (2%)
    const tax = Math.round(totalCartPrice * 0.02);

    // Place order handler
    const placeOrder = async () => {
        try {
            if (!selectedAddress) {
                toast.error("Please select an address");
                return;
            }
            if (paymentOptions === "COD") {
                const { data } = await axios.post("/order/create", {
                    items: cart.map((item) => ({
                        product: item._id,
                        quantity: item.quantity,
                    })),
                    address: selectedAddress._id,
                });
                if (data.success) {
                    setOrderDetails({
                        orderId: data.orderId,
                        amount: totalCartPrice + tax,
                        items: cart.length
                    });
                    setShowOrderSuccess(true);
                    setCart([]);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Empty cart state
    if (!cart || cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <img src="/empty-cart.svg" alt="Empty Cart" className="w-40 mb-6" />
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <button
                    onClick={() => navigate("/books")}
                    className="px-6 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
                >
                    Shop Now
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-8">
            {/* Cart Items */}
            <div className="flex-1 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                    <span>Shopping Cart</span>
                    <span className="text-base text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
                        {cartCount} Items
                    </span>
                </h1>

                <div className="space-y-6">
                    {cart.map((product, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-sm border border-gray-200 p-4 gap-6"
                        >
                            <div className="w-28 h-28 flex-shrink-0 flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                                <img
                                    className="max-w-full h-full object-cover"
                                    src={`https://jairozon.onrender.com/images/${product.image}`}
                                    alt={product.title}
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <p className="font-semibold text-lg mb-1">{product.title}</p>
                                <div className="text-gray-500 text-sm mb-2">
                                    <span>Size: {product.size || "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>Qty:</span>
                                    <select
                                        className="border rounded px-2 py-1 outline-none"
                                        value={product.quantity}
                                        onChange={(e) =>
                                            updateCart(product._id, parseInt(e.target.value))
                                        }
                                    >
                                        {Array(10)
                                            .fill("")
                                            .map((_, idx) => (
                                                <option key={idx} value={idx + 1}>
                                                    {idx + 1}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-semibold text-indigo-600 text-lg">
                                    ${product.offerPrice * product.quantity}
                                </span>
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className="text-red-500 hover:bg-red-50 rounded-full p-2 transition"
                                    title="Remove"
                                >
                                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                        <path
                                            d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                                            stroke="#FF532E"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => {
                        navigate("/books");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group flex items-center mt-10 gap-2 text-indigo-600 font-medium hover:underline"
                >
                    <svg
                        width="15"
                        height="11"
                        viewBox="0 0 15 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                            stroke="#615fff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Continue Shopping
                </button>
            </div>

            {/* Order Summary */}
            <div className="max-w-[360px] w-full bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <hr className="border-gray-200 mb-4" />

                {/* Address */}
                <div className="mb-6">
                    <p className="text-sm font-medium uppercase mb-1">Delivery Address</p>
                    <div className="relative">
                        <button
                            onClick={() => setShowAddressDropdown((v) => !v)}
                            className="w-full text-left bg-gray-50 border border-gray-200 rounded px-3 py-2 mb-1 hover:border-indigo-400 transition"
                        >
                            {selectedAddress
                                ? selectedAddress.address
                                : "Select delivery address"}
                        </button>
                        {showAddressDropdown && (
                            <div className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded shadow mt-1">
                                {(!address || address.length === 0) && (
                                    <div className="p-3 text-gray-500">No addresses found.</div>
                                )}
                                {address && address.map((addr, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            setSelectedAddress(addr);
                                            setShowAddressDropdown(false);
                                        }}
                                        className={`p-3 cursor-pointer hover:bg-indigo-50 ${selectedAddress && selectedAddress._id && selectedAddress._id === addr._id
                                                ? "bg-indigo-50 font-semibold"
                                                : ""
                                            }`}
                                    >
                                        {`${addr.firstName} ${addr.lastName}, ${addr.street}, ${addr.city}`}
                                    </div>
                                ))}
                                <div
                                    onClick={() => {
                                        setShowAddressDropdown(false);
                                        navigate("/add-address");
                                    }}
                                    className="p-3 text-indigo-600 hover:bg-indigo-50 cursor-pointer text-center border-t"
                                >
                                    + Add New Address
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Payment */}
                <div className="mb-6">
                    <p className="text-sm font-medium uppercase mb-1">Payment Method</p>
                    <select
                        className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-50 outline-none"
                        onChange={(e) => setPaymentOptions(e.target.value)}
                        value={paymentOptions}
                    >
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-200 mb-4" />

                {/* Price Summary */}
                <div className="text-gray-700 space-y-2 mb-6">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${totalCartPrice}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping Fee</span>
                        <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax (2%)</span>
                        <span>${tax}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-3">
                        <span>Total Amount</span>
                        <span>${totalCartPrice + tax}</span>
                    </div>
                </div>

                <button
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded shadow hover:bg-indigo-700 transition"
                    onClick={() => {
                        if (paymentOptions === "COD") {
                            placeOrder();
                        } else {
                            navigate('/checkout');
                        }
                    }}
                    disabled={loading}
                >
                    {paymentOptions === "COD"
                        ? "Place Order (Cash On Delivery)"
                        : "Proceed to Checkout"}
                </button>
            </div>

            {/* Order Success Popup */}
            {showOrderSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h3>
                        <p className="text-gray-600 mb-4">Thank you for your order. You will receive an email confirmation shortly.</p>
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-600">Order ID: <span className="font-semibold">#{orderDetails?.orderId?.slice(-8)}</span></p>
                            <p className="text-sm text-gray-600">Items: <span className="font-semibold">{orderDetails?.items}</span></p>
                            <p className="text-sm text-gray-600">Total: <span className="font-semibold">${orderDetails?.amount}</span></p>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => {
                                    setShowOrderSuccess(false);
                                    navigate('/my-orders');
                                }}
                                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                View Orders
                            </button>
                            <button
                                onClick={() => {
                                    setShowOrderSuccess(false);
                                    navigate('/books');
                                }}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
