'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface QuickReply {
  prompt: string;
}

interface ApiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ApiResult {
  reply: string | null;
  code: string | null;
  modelUsed?: string | null;
}

const quickReplies: QuickReply[] = [
  { prompt: 'What services do you offer?' },
  { prompt: 'How much will my project cost?' },
  { prompt: 'Which tech stack should I use for my idea?' },
  { prompt: 'How soon can we start?' },
];

const AI_FALLBACK_MESSAGE =
  "I couldn't reach the AI service right now. Please try again in a moment, or use the Contact section and Faran will reply directly.";

function getErrorMessageFromCode(code: string | null): string {
  switch (code) {
    case 'AI_NOT_CONFIGURED':
      return 'AI chat is not configured yet. Add OPENROUTER_API_KEY in deployment environment variables to enable real AI responses.';
    case 'TIMEOUT':
      return 'AI response timed out. Please try a shorter message or send again in a few seconds.';
    case 'PROVIDER_ERROR':
      return 'AI provider returned an error. Check AI_MODEL, OpenRouter credits, and API key permissions.';
    case 'INVALID_MESSAGES':
      return 'Message format was invalid. Please try sending your question again.';
    default:
      return AI_FALLBACK_MESSAGE;
  }
}

export default function AIChat() {
  const isDev = process.env.NODE_ENV !== 'production';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Faran's AI assistant. Ask me anything about services, pricing, timeline, tech stack, or project planning.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastModelUsed, setLastModelUsed] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const buildConversationForApi = (nextUserMessage: Message): ApiChatMessage[] => {
    const history: ApiChatMessage[] = messages
      .slice(-10)
      .map((message) => ({
        role: message.sender === 'user' ? 'user' : 'assistant',
        content: message.text,
      }));

    history.push({ role: 'user', content: nextUserMessage.text });
    return history;
  };

  const getAiResponse = async (nextUserMessage: Message): Promise<ApiResult> => {
    const apiMessages = buildConversationForApi(nextUserMessage);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { reply: null, code: data?.code || 'API_ERROR' };
      }

      const reply = data?.reply;
      if (!reply || typeof reply !== 'string') {
        return { reply: null, code: 'INVALID_REPLY' };
      }

      return { reply, code: null, modelUsed: data?.modelUsed || null };
    } catch {
      return { reply: null, code: 'NETWORK_ERROR' };
    }
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || userInput.trim();
    if (!messageText || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    const aiResult = await getAiResponse(userMessage);
    setLastModelUsed(aiResult.modelUsed || null);

    let botText = aiResult.reply;
    if (!botText) {
      botText = getErrorMessageFromCode(aiResult.code);
    }

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: botText,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.prompt);
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
              {isDev && (
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wide text-blue-100/80">DEV</p>
                  <p className="text-[11px] text-white/90 max-w-[120px] truncate" title={lastModelUsed || 'No model yet'}>
                    {lastModelUsed || 'No model yet'}
                  </p>
                </div>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 p-3">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length < 3 && !isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-2 border-t border-gray-700 max-h-24 overflow-y-auto"
              >
                <p className="text-xs text-gray-400 mb-2">Quick prompts:</p>
                <div className="space-y-2">
                  {quickReplies.map((reply, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickReply(reply)}
                      className="w-full text-left text-xs text-blue-300 hover:text-blue-200 px-2 py-1 rounded hover:bg-blue-600/20 transition-all"
                    >
                      {reply.prompt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="border-t border-gray-700 p-4 bg-gray-900/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!userInput.trim() || isTyping}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-lg transition-all"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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