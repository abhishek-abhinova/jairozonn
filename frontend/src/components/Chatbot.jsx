import { useState, useRef, useEffect, useContext } from 'react';
import { FiMessageCircle, FiX, FiSend, FiUser, FiHelpCircle } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Jairo, your virtual assistant at Jairozon Educational Bookstore. How can I help you find the perfect book today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { booksData, navigate } = useContext(AppContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const bookRecommendations = {
    'math': ['Mathematics', 'Calculus', 'Algebra', 'Statistics'],
    'science': ['Physics', 'Chemistry', 'Biology', 'Science'],
    'history': ['History', 'Historical', 'Ancient', 'Modern History'],
    'english': ['English', 'Literature', 'Grammar', 'Writing'],
    'programming': ['Programming', 'JavaScript', 'Python', 'Computer Science'],
    'business': ['Business', 'Management', 'Economics', 'Finance']
  };

  const getBookRecommendations = (query) => {
    const lowerQuery = query.toLowerCase();
    for (const [category, keywords] of Object.entries(bookRecommendations)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()))) {
        return booksData.filter(book => 
          keywords.some(keyword => 
            book.title.toLowerCase().includes(keyword.toLowerCase()) ||
            book.category.toLowerCase().includes(keyword.toLowerCase())
          )
        ).slice(0, 3);
      }
    }
    return [];
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to Jairozon Educational Bookstore. I'm here to help you find the perfect educational books. What subject are you interested in?";
    }
    
    // Book search
    if (lowerMessage.includes('book') || lowerMessage.includes('find') || lowerMessage.includes('search')) {
      const recommendations = getBookRecommendations(userMessage);
      if (recommendations.length > 0) {
        let response = "I found some great books for you:\n\n";
        recommendations.forEach((book, index) => {
          response += `${index + 1}. ${book.title} by ${book.author} - $${book.offerPrice}\n`;
        });
        response += "\nWould you like me to show you more details about any of these books?";
        return response;
      } else {
        return "I'd be happy to help you find books! Could you tell me what subject or topic you're interested in? We have books on Math, Science, History, English, Programming, Business, and more!";
      }
    }
    
    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('cheap')) {
      return "Our books are competitively priced with special educational discounts! Most of our textbooks range from $15-$80. We also offer free shipping on orders over $50. Would you like to see our current deals?";
    }
    
    // Shipping
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return "We offer multiple shipping options:\n• Standard Shipping (5-7 days) - FREE on orders $50+\n• Express Shipping (2-3 days) - $9.99\n• Overnight Delivery - $19.99\n\nAll orders are processed within 24 hours!";
    }
    
    // Payment
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return "We accept multiple payment methods:\n• Credit/Debit Cards (Visa, MasterCard, American Express)\n• PayPal\n• Cash on Delivery (COD)\n\nAll payments are secure and encrypted for your safety!";
    }
    
    // Categories
    if (lowerMessage.includes('category') || lowerMessage.includes('subject')) {
      return "We have books in these categories:\n• Mathematics & Statistics\n• Science & Engineering\n• History & Social Studies\n• English & Literature\n• Computer Science & Programming\n• Business & Economics\n• Art & Design\n\nWhich category interests you?";
    }
    
    // Help
    if (lowerMessage.includes('help')) {
      return "I can help you with:\n• Finding books by subject or author\n• Checking prices and availability\n• Information about shipping and delivery\n• Payment options\n• Account and order questions\n\nWhat would you like to know more about?";
    }
    
    // Default response
    return "I'm here to help you find the perfect educational books! You can ask me about:\n• Book recommendations\n• Prices and deals\n• Shipping information\n• Payment methods\n• Our book categories\n\nWhat would you like to know?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Show me Math books", action: () => setInputMessage("Show me Math books") },
    { text: "What are your prices?", action: () => setInputMessage("What are your prices?") },
    { text: "Shipping information", action: () => setInputMessage("Shipping information") },
    { text: "Browse all books", action: () => navigate('/books') }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FiHelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Jairo Assistant</h3>
                <p className="text-xs opacity-90">Educational Book Expert</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {message.sender === 'user' ? <FiUser className="w-4 h-4" /> : <FiHelpCircle className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <FiHelpCircle className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about books..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;