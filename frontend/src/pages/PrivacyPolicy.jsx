const PrivacyPolicy = () => {
  return (
    <div className="mt-20 px-6 md:px-16 lg:px-36 py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At Jairozon, accessible from <a href="https://jairozon.com" className="text-blue-500">https://jairozon.com</a>, 
        your privacy is one of our top priorities. This Privacy Policy document outlines the types of personal 
        information that is collected and recorded by Jairozon and how we use it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information such as your name, email address, shipping details, 
        and payment information when you purchase books from our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        The information we collect is used to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Process and ship your orders</li>
        <li>Communicate with you regarding purchases or support</li>
        <li>Improve our website and services</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies</h2>
      <p className="mb-4">
        Our website uses cookies to enhance user experience, track analytics, and 
        improve services. You can disable cookies through your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services such as payment gateways (e.g., PayPal) 
        to complete your transactions securely.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact Us</h2>
      <p className="mb-4">
        If you have questions about this Privacy Policy, please contact us at:  
        <br /> 📧 support@jairozon.com
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default PrivacyPolicy;
