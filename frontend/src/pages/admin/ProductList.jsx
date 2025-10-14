import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { FiEdit3, FiTrash2, FiEye, FiPlus, FiSearch, FiFilter, FiDownload } from "react-icons/fi";
import toast from "react-hot-toast";

const ProductList = () => {
    const { booksData, setBooksData, axios, navigate } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [editingBook, setEditingBook] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const categories = ["Mathematics", "Science", "History", "English", "Programming", "Business"];

    const filteredBooks = booksData.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "" || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDelete = async (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                setLoading(true);
                const { data } = await axios.delete(`/book/delete/${bookId}`);
                if (data.success) {
                    setBooksData(booksData.filter(book => book._id !== bookId));
                    toast.success('Book deleted successfully');
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error('Failed to delete book');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEdit = (book) => {
        setEditingBook({ ...book });
        setShowEditModal(true);
    };

    const handleUpdateBook = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.put(`/book/update/${editingBook._id}`, editingBook);
            if (data.success) {
                setBooksData(booksData.map(book => 
                    book._id === editingBook._id ? data.book : book
                ));
                setShowEditModal(false);
                toast.success('Book updated successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to update book');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Management</h1>
                        <p className="text-gray-600">Manage your book inventory with full control</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/add-product')}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    >
                        <FiPlus className="w-5 h-5" />
                        <span>Add New Book</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search books by title or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="relative">
                        <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                        <FiDownload className="w-5 h-5" />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                </div>
            </div>

            {/* Books Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                                <th className="hidden sm:table-cell px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="hidden md:table-cell px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                <th className="hidden lg:table-cell px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBooks.map((book) => (
                                <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-4">
                                            <img 
                                                src={`https://jairozon.onrender.com/images/${book.image}`} 
                                                alt={book.title}
                                                className="w-16 h-20 object-cover rounded-lg shadow-md"
                                            />
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{book.title}</h3>
                                                <p className="text-sm text-gray-500">by {book.author}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {book.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <span className="font-semibold">${book.offerPrice}</span>
                                            {book.price > book.offerPrice && (
                                                <span className="ml-2 text-gray-400 line-through">${book.price}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-1">
                                            <span className="text-yellow-400">★</span>
                                            <span className="text-sm font-medium">{book.rating}</span>
                                            <span className="text-xs text-gray-500">({book.reviews})</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            book.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {book.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => navigate(`/book/${book._id}`)}
                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <FiEye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(book)}
                                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                                title="Edit Book"
                                            >
                                                <FiEdit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                title="Delete Book"
                                                disabled={loading}
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {filteredBooks.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No books found matching your criteria</p>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {showEditModal && editingBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800">Edit Book</h2>
                        </div>
                        
                        <form onSubmit={handleUpdateBook} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={editingBook.title}
                                        onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                                    <input
                                        type="text"
                                        value={editingBook.author}
                                        onChange={(e) => setEditingBook({...editingBook, author: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={editingBook.category}
                                        onChange={(e) => setEditingBook({...editingBook, category: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                                    <input
                                        type="number"
                                        value={editingBook.price}
                                        onChange={(e) => setEditingBook({...editingBook, price: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Offer Price</label>
                                    <input
                                        type="number"
                                        value={editingBook.offerPrice}
                                        onChange={(e) => setEditingBook({...editingBook, offerPrice: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={editingBook.rating}
                                        onChange={(e) => setEditingBook({...editingBook, rating: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={editingBook.description}
                                    onChange={(e) => setEditingBook({...editingBook, description: e.target.value})}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Updating...' : 'Update Book'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;