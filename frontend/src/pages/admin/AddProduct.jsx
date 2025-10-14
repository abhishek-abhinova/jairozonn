import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import { FiUpload, FiBook, FiSave, FiArrowLeft } from 'react-icons/fi';

const AddProduct = () => {
    const { navigate, axios, setBooksData, booksData } = useContext(AppContext);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        price: '',
        offerPrice: '',
        rating: '4.5',
        reviews: '0',
        description: '',
        category: '',
        inStock: true
    });

    const categories = ["Mathematics", "Science", "History", "English", "Programming", "Business"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBookData({ 
            ...bookData, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('Please select a book image');
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            Object.keys(bookData).forEach(key => {
                formData.append(key, bookData[key]);
            });
            formData.append('image', file);

            const { data } = await axios.post("/book/add", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.success) {
                setBooksData([...booksData, data.book]);
                toast.success('Book added successfully!');
                navigate("/admin/products");
            } else {
                toast.error(data.message || 'Failed to add book');
            }
        } catch (error) {
            toast.error('Failed to add book. Please try again.');
            console.error('Error adding book:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/admin/products')}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                                <FiBook className="w-8 h-8 text-blue-600" />
                                <span>Add New Book</span>
                            </h1>
                            <p className="text-gray-600 mt-1">Fill in the details to add a new book to your inventory</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Image Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                        <div className="space-y-4">
                            {file ? (
                                <div className="relative inline-block">
                                    <img 
                                        src={URL.createObjectURL(file)} 
                                        alt="Book preview" 
                                        className="w-32 h-40 object-cover rounded-lg shadow-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFile(null)}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <FiUpload className="w-16 h-16 text-gray-400 mx-auto" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700">Upload Book Cover</h3>
                                        <p className="text-gray-500">Drag and drop or click to select an image</p>
                                    </div>
                                </div>
                            )}
                            <label htmlFor="image" className="inline-block">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => setFile(e.target.files[0])} 
                                    id="image" 
                                    className="hidden" 
                                />
                                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg inline-flex items-center space-x-2">
                                    <FiUpload className="w-4 h-4" />
                                    <span>{file ? 'Change Image' : 'Select Image'}</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Book Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Book Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={bookData.title}
                                    onChange={handleChange}
                                    placeholder="Enter book title"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Author *</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={bookData.author}
                                    onChange={handleChange}
                                    placeholder="Enter author name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                                <select
                                    name="category"
                                    value={bookData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={bookData.price}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Offer Price *</label>
                                    <input
                                        type="number"
                                        name="offerPrice"
                                        value={bookData.offerPrice}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                                <textarea
                                    name="description"
                                    value={bookData.description}
                                    onChange={handleChange}
                                    placeholder="Enter book description"
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={bookData.rating}
                                        onChange={handleChange}
                                        placeholder="4.5"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Reviews Count</label>
                                    <input
                                        type="number"
                                        name="reviews"
                                        value={bookData.reviews}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    name="inStock"
                                    checked={bookData.inStock}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label className="text-sm font-semibold text-gray-700">In Stock</label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/products')}
                            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            <FiSave className="w-4 h-4" />
                            <span>{loading ? 'Adding Book...' : 'Add Book'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
