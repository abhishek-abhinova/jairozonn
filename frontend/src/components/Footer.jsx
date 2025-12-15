const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-16">
            {/* Back to Top */}
            <div className="bg-gray-800 hover:bg-gray-700 transition-colors">
                <div className="max-w-7xl mx-auto px-4">
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-full py-4 text-center text-sm font-medium text-gray-300 hover:text-white"
                    >
                        Back to top
                    </button>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Get to Know Us */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Get to Know Us</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">About Jairozon</a></li>
                            <li><a href="/careers" className="text-gray-300 hover:text-white transition-colors text-sm">Careers</a></li>
                            <li><a href="/press" className="text-gray-300 hover:text-white transition-colors text-sm">Press Releases</a></li>
                            <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">Jairozon Blog</a></li>
                        </ul>
                    </div>

                    {/* Make Money with Us */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Make Money with Us</h3>
                        <ul className="space-y-2">
                            <li><a href="/sell" className="text-gray-300 hover:text-white transition-colors text-sm">Sell books on Jairozon</a></li>
                            <li><a href="/affiliate" className="text-gray-300 hover:text-white transition-colors text-sm">Become an Affiliate</a></li>
                            <li><a href="/advertise" className="text-gray-300 hover:text-white transition-colors text-sm">Advertise Your Products</a></li>
                            <li><a href="/publish" className="text-gray-300 hover:text-white transition-colors text-sm">Self-Publish with Us</a></li>
                        </ul>
                    </div>

                    {/* Jairozon Payment Products */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Payment Products</h3>
                        <ul className="space-y-2">
                            <li><a href="/business" className="text-gray-300 hover:text-white transition-colors text-sm">Jairozon Business Card</a></li>
                            <li><a href="/rewards" className="text-gray-300 hover:text-white transition-colors text-sm">Shop with Points</a></li>
                            <li><a href="/reload" className="text-gray-300 hover:text-white transition-colors text-sm">Reload Your Balance</a></li>
                            <li><a href="/currency" className="text-gray-300 hover:text-white transition-colors text-sm">Currency Converter</a></li>
                        </ul>
                    </div>

                    {/* Let Us Help You */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Let Us Help You</h3>
                        <ul className="space-y-2">
                            <li><a href="/account" className="text-gray-300 hover:text-white transition-colors text-sm">Your Account</a></li>
                            <li><a href="/orders" className="text-gray-300 hover:text-white transition-colors text-sm">Your Orders</a></li>
                            <li><a href="/shipping" className="text-gray-300 hover:text-white transition-colors text-sm">Shipping Rates & Policies</a></li>
                            <li><a href="/returns" className="text-gray-300 hover:text-white transition-colors text-sm">Returns & Replacements</a></li>
                            <li><a href="/help" className="text-gray-300 hover:text-white transition-colors text-sm">Help</a></li>
                        </ul>
                    </div>
                </div>

                {/* Logo and Language */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                                <span className="text-white font-bold text-lg">J</span>
                            </div>
                            <span className="text-2xl font-bold text-white">jairozon</span>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-2 border border-gray-600 rounded px-3 py-2 hover:bg-gray-800 transition-colors">
                                <span className="text-sm">🌐 English</span>
                            </button>
                            <button className="flex items-center space-x-2 border border-gray-600 rounded px-3 py-2 hover:bg-gray-800 transition-colors">
                                <span className="text-sm">$ USD - U.S. Dollar</span>
                            </button>
                            <button className="flex items-center space-x-2 border border-gray-600 rounded px-3 py-2 hover:bg-gray-800 transition-colors">
                                <span className="text-sm">🇺🇸 United States</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-wrap justify-center space-x-6 text-xs text-gray-400 mb-4">
                        <a href="/conditions" className="hover:text-white transition-colors">Conditions of Use</a>
                        <a href="/privacy" className="hover:text-white transition-colors">Privacy Notice</a>
                        <a href="/interest-ads" className="hover:text-white transition-colors">Interest-Based Ads</a>
                    </div>
                    <p className="text-center text-xs text-gray-400">
                        © {new Date().getFullYear()}, Jairozon.com, Inc. or its affiliates
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;