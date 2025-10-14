import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FiSave, FiUpload, FiGlobe, FiMail, FiShield, FiDatabase } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Settings = () => {
    const { axios } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        siteName: 'Jairozon',
        siteDescription: 'Your Educational Bookstore',
        contactEmail: 'jairosoft@gmail.com',
        supportEmail: 'support@jairozon.com',
        freeShippingThreshold: 50,
        taxRate: 8.5,
        currency: 'USD',
        allowRegistration: true,
        requireEmailVerification: false,
        maintenanceMode: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Here you would typically save to backend
            // const { data } = await axios.put('/admin/settings', settings);
            toast.success('Settings saved successfully!');
        } catch (error) {
            toast.error('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    const settingSections = [
        {
            title: 'General Settings',
            icon: FiGlobe,
            color: 'text-blue-600',
            fields: [
                { name: 'siteName', label: 'Site Name', type: 'text' },
                { name: 'siteDescription', label: 'Site Description', type: 'textarea' },
                { name: 'currency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP'] }
            ]
        },
        {
            title: 'Contact Information',
            icon: FiMail,
            color: 'text-green-600',
            fields: [
                { name: 'contactEmail', label: 'Contact Email', type: 'email' },
                { name: 'supportEmail', label: 'Support Email', type: 'email' }
            ]
        },
        {
            title: 'Commerce Settings',
            icon: FiDatabase,
            color: 'text-purple-600',
            fields: [
                { name: 'freeShippingThreshold', label: 'Free Shipping Threshold ($)', type: 'number' },
                { name: 'taxRate', label: 'Tax Rate (%)', type: 'number', step: '0.1' }
            ]
        },
        {
            title: 'Security & Access',
            icon: FiShield,
            color: 'text-red-600',
            fields: [
                { name: 'allowRegistration', label: 'Allow User Registration', type: 'checkbox' },
                { name: 'requireEmailVerification', label: 'Require Email Verification', type: 'checkbox' },
                { name: 'maintenanceMode', label: 'Maintenance Mode', type: 'checkbox' }
            ]
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Website Settings</h1>
                        <p className="text-gray-600">Manage your website configuration and preferences</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl">
                        <FiGlobe className="w-5 h-5" />
                        <span className="font-semibold">Global Config</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {settingSections.map((section, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className={`p-2 rounded-lg bg-gray-100`}>
                                <section.icon className={`w-5 h-5 ${section.color}`} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {section.fields.map((field, fieldIndex) => (
                                <div key={fieldIndex} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {field.label}
                                    </label>
                                    
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            name={field.name}
                                            value={settings[field.name]}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            name={field.name}
                                            value={settings[field.name]}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        >
                                            {field.options.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : field.type === 'checkbox' ? (
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                name={field.name}
                                                checked={settings[field.name]}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-600">
                                                {field.name === 'maintenanceMode' && 'Enable to put site in maintenance mode'}
                                                {field.name === 'allowRegistration' && 'Allow new users to register'}
                                                {field.name === 'requireEmailVerification' && 'Require email verification for new accounts'}
                                            </span>
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={settings[field.name]}
                                            onChange={handleChange}
                                            step={field.step}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Save Button */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg font-medium disabled:opacity-50"
                        >
                            <FiSave className="w-4 h-4" />
                            <span>{loading ? 'Saving...' : 'Save Settings'}</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Settings;