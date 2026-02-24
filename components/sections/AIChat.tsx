'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'options' | 'form';
  options?: { label: string; value: string }[];
}

interface QuickReply {
  question: string;
  answer: string;
  keywords: string[];
}

const quickReplies: QuickReply[] = [
  {
    question: "What's your hourly rate?",
    answer: "My hourly rate is ₹2,500/hour. However, I recommend project-based pricing which offers better value. Small projects start from ₹50,000, medium projects from ₹75,000. Would you like to use the Rate Calculator to estimate your project?",
    keywords: ['rate', 'price', 'cost', 'hourly', 'how much']
  },
  {
    question: "How long does a project take?",
    answer: "Timeline depends on project complexity:\n• Small projects: 2-3 weeks\n• Medium projects: 4-6 weeks\n• Large projects: 8-12 weeks\n• Enterprise solutions: 3+ months\n\nWould you like to discuss your specific project?",
    keywords: ['how long', 'timeline', 'duration', 'when', 'time']
  },
  {
    question: 'Can you build a mobile app?',
    answer: 'Yes! I build high-quality mobile applications using React Native for iOS/Android. Mobile app development is available as an add-on (₹35,000) to most project packages. I can also integrate it with your existing backend systems.',
    keywords: ['mobile', 'app', 'ios', 'android', 'react native']
  },
  {
    question: 'What technologies do you use?',
    answer: 'I specialize in: Frontend (React, Next.js, TypeScript), Backend (Node.js, Express, Python), Databases (PostgreSQL, MongoDB), DevOps (Docker, Kubernetes, AWS), and modern tools. I use the best technology stack for each project.',
    keywords: ['technology', 'tech stack', 'tools', 'languages', 'frameworks']
  },
  {
    question: 'Do you offer maintenance and support?',
    answer: 'Absolutely! Maintenance and support packages range from 3-12 months depending on your plan. I provide ongoing bug fixes, performance optimization, new feature development, and 24/7 priority support.',
    keywords: ['maintenance', 'support', 'after', 'ongoing', 'bug fix']
  },
  {
    question: 'How do we get started?',
    answer: 'Great question! Here\'s how we can proceed:\n1. Share your project details and goals\n2. I\'ll provide a detailed quote and timeline\n3. We sign an agreement\n4. I start development immediately\n\nLet\'s schedule a consultation to discuss your project!',
    keywords: ['get started', 'start', 'begin', 'process', 'how to', 'next']
  },
  {
    question: 'Can you work on an existing project?',
    answer: 'Yes! I can take over, maintain, or enhance existing projects. This includes debugging, refactoring, adding new features, and migrating to new technologies. The approach depends on your current codebase.',
    keywords: ['existing', 'take over', 'ongoing', 'add to', 'modify']
  },
  {
    question: 'What\'s your availability?',
    answer: 'I\'m currently accepting new projects and can start immediately for urgent work. I maintain a flexible schedule to accommodate different timezones and project deadlines. Let\'s discuss your timeline!',
    keywords: ['available', 'availability', 'when', 'start', 'begin']
  },
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm Faran's AI assistant. How can I help you today?\n\nI can answer questions about:\n• Pricing & rates\n• Project timeline\n• Available services\n• Technologies used\n• How to get started\n\nFeel free to ask anything!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    for (const reply of quickReplies) {
      if (reply.keywords.some(keyword => lowerText.includes(keyword))) {
        return reply.answer;
      }
    }

    // Default response
    return "That's a great question! 🤔 For detailed information about this topic, I recommend scheduling a consultation. Could you share your contact details so I can reach out to you?";
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || userInput.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');

    // Simulate typing
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 800));

    // Add bot response
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: findBotResponse(messageText),
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.question);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-80 h-[500px] flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-gray-700 shadow-2xl mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Faran&apos;s AI</p>
                  <p className="text-xs text-blue-100">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-700 text-gray-100 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 p-3"
                >
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && !isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-2 border-t border-gray-700 max-h-24 overflow-y-auto"
              >
                <p className="text-xs text-gray-400 mb-2">Quick replies:</p>
                <div className="space-y-2">
                  {quickReplies.slice(0, 3).map((reply, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickReply(reply)}
                      className="w-full text-left text-xs text-blue-300 hover:text-blue-200 px-2 py-1 rounded hover:bg-blue-600/20 transition-all"
                    >
                      {reply.question}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input */}
            <div className="border-t border-gray-700 p-4 bg-gray-900/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!userInput.trim()}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-lg transition-all"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg flex items-center justify-center hover:shadow-xl hover:shadow-blue-600/50 transition-all relative group"
      >
        <MessageSquare size={24} />
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
          />
        )}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Need help?
        </span>
      </motion.button>

    </div>
  );
}
