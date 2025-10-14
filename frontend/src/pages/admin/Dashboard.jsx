import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { FiUsers, FiBook, FiShoppingCart, FiDollarSign, FiTrendingUp, FiPackage } from 'react-icons/fi';

const Dashboard = () => {
  const { axios } = useContext(AppContext);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get('/admin/analytics');
      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Failed to load analytics data</p>
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Users',
      value: analytics.totalUsers,
      icon: FiUsers,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Books',
      value: analytics.totalBooks,
      icon: FiBook,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: analytics.totalOrders,
      icon: FiShoppingCart,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Revenue',
      value: `$${analytics.totalRevenue.toFixed(2)}`,
      icon: FiDollarSign,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-2xl shadow-lg">
            <FiTrendingUp className="w-4 md:w-5 h-4 md:h-5" />
            <span className="font-semibold text-sm md:text-base">Analytics Overview</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 card-modern">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">{stat.title}</p>
                <p className={`text-xl md:text-3xl font-black ${stat.textColor} mt-2`}>{stat.value}</p>
              </div>
              <div className={`p-3 md:p-4 rounded-2xl ${stat.color} shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 md:w-8 h-6 md:h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100 card-modern">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-800">Monthly Sales</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id.month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="totalSales" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Books Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100 card-modern">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-800">Top Selling Books</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.topBooks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bookDetails.title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalSold" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100 card-modern">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
          </div>
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
            <FiPackage className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Customer
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Payment
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {order.userId?.name || 'N/A'}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;