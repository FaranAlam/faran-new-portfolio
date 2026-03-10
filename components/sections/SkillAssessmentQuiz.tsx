'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is the time complexity of binary search?',
    category: 'Algorithms',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 1,
    explanation: 'Binary search divides the search space in half with each iteration, resulting in logarithmic time complexity.'
  },
  {
    id: 2,
    question: 'Which React hook is used for side effects?',
    category: 'React',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctAnswer: 1,
    explanation: 'useEffect hook is used to perform side effects in functional components.'
  },
  {
    id: 3,
    question: 'What does REST stand for?',
    category: 'Web APIs',
    options: ['Representational State Transfer', 'Rapid Execution State Transport', 'Remote Execution Smart Transfer', 'Reactive Event State Transfer'],
    correctAnswer: 0,
    explanation: 'REST stands for Representational State Transfer, an architectural style for APIs.'
  },
  {
    id: 4,
    question: 'Which of these is NOT a SOLID principle?',
    category: 'Software Design',
    options: ['Single Responsibility', 'Open/Closed', 'Liskov Substitution', 'Lazy Initialization'],
    correctAnswer: 3,
    explanation: 'The SOLID principles are Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.'
  },
  {
    id: 5,
    question: 'What does a primary key enforce in a database?',
    category: 'Databases',
    options: ['Uniqueness', 'Not Null', 'Both uniqueness and not null', 'Foreign key relationships'],
    correctAnswer: 2,
    explanation: 'A primary key enforces both uniqueness (no duplicates) and NOT NULL constraints.'
  },
  {
    id: 6,
    question: 'Which authentication method is most secure for modern web apps?',
    category: 'Security',
    options: ['Basic Auth', 'JWT Tokens', 'OAuth2.0', 'Session Cookies'],
    correctAnswer: 2,
    explanation: 'OAuth2.0 is considered the most secure modern authentication standard due to its delegation and token-based approach.'
  },
  {
    id: 7,
    question: 'What does Docker containerization achieve?',
    category: 'DevOps',
    options: ['Compression', 'Environment isolation', 'Code obfuscation', 'Memory optimization'],
    correctAnswer: 1,
    explanation: 'Docker creates isolated containers that package applications with their dependencies, ensuring consistency across environments.'
  },
  {
    id: 8,
    question: 'What is the main purpose of a CI/CD pipeline?',
    category: 'DevOps',
    options: ['Backup files', 'Automate testing and deployment', 'Encrypt code', 'Monitor user activity'],
    correctAnswer: 1,
    explanation: 'CI/CD pipelines automate the process of building, testing, and deploying code changes to production.'
  },
  {
    id: 9,
    question: 'Which HTTP status code indicates a resource not found?',
    category: 'Web APIs',
    options: ['400', '403', '404', '500'],
    correctAnswer: 2,
    explanation: '404 Not Found indicates the requested resource could not be found on the server.'
  },
  {
    id: 10,
    question: 'What is the purpose of indexing in databases?',
    category: 'Databases',
    options: ['Increase storage', 'Speed up queries', 'Encrypt data', 'Reduce memory'],
    correctAnswer: 1,
    explanation: 'Indexing creates data structures that speed up data retrieval by allowing faster lookups.'
  },
  {
    id: 11,
    question: 'How does TypeScript improve JavaScript?',
    category: 'Languages',
    options: ['Faster execution', 'Static type checking', 'Automatic compilation', 'Built-in testing'],
    correctAnswer: 1,
    explanation: 'TypeScript adds static type checking before runtime, catching errors during development.'
  },
  {
    id: 12,
    question: 'What is the Virtual DOM in React?',
    category: 'React',
    options: ['A real DOM copy in memory', 'An optimization technique', 'A browser API', 'A state management tool'],
    correctAnswer: 1,
    explanation: 'The Virtual DOM is an in-memory representation used for efficient UI updates by comparing differences.'
  },
];

interface Answer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

interface Category {
  name: string;
  correct: number;
  total: number;
}

export default function SkillAssessmentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    const newAnswer: Answer = {
      questionId: questions[currentQuestion].id,
      selectedAnswer: answerIndex,
      isCorrect,
    };

    setAnswers([...answers, newAnswer]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizComplete(false);
    setShowExplanation(false);
  };

  const score = useMemo(() => {
    return answers.filter((a) => a.isCorrect).length;
  }, [answers]);

  const percentage = useMemo(() => {
    return Math.round((score / questions.length) * 100);
  }, [score]);

  const categoryStats = useMemo(() => {
    const stats: { [key: string]: Category } = {};
    questions.forEach((q) => {
      if (!stats[q.category]) {
        stats[q.category] = { name: q.category, correct: 0, total: 0 };
      }
      stats[q.category].total++;
      const answer = answers.find((a) => a.questionId === q.id);
      if (answer?.isCorrect) {
        stats[q.category].correct++;
      }
    });
    return Object.values(stats);
  }, [answers]);

  const expertiseLevel = useMemo(() => {
    if (percentage >= 90) return { level: 'Expert', color: 'text-green-400', bg: 'bg-green-500/10' };
    if (percentage >= 75) return { level: 'Advanced', color: 'text-blue-400', bg: 'bg-blue-500/10' };
    if (percentage >= 60) return { level: 'Intermediate', color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
    return { level: 'Beginner', color: 'text-orange-400', bg: 'bg-orange-500/10' };
  }, [percentage]);

  return (
    <section id="skill-assessment-quiz" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Skill <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Assessment Quiz</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Test your knowledge and discover my expertise across various technologies
            </p>
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          {!quizComplete ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-black rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
              </div>

              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-500/50 rounded-full text-xs font-semibold text-green-700 dark:text-green-300">
                  {questions[currentQuestion].category}
                </span>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{questions[currentQuestion].question}</h3>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = answers.find(
                      (a) => a.questionId === questions[currentQuestion].id
                    )?.selectedAnswer === index;
                    const isCorrect = index === questions[currentQuestion].correctAnswer;
                    const answered = answers.some((a) => a.questionId === questions[currentQuestion].id);

                    return (
                      <motion.button
                        key={index}
                        onClick={() => !answered && handleAnswer(index)}
                        whileHover={{ scale: answered ? 1 : 1.02 }}
                        whileTap={{ scale: answered ? 1 : 0.98 }}
                        disabled={answered}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all font-medium ${
                          answered
                            ? isSelected
                              ? isCorrect
                                ? 'bg-green-100 dark:bg-green-500/20 border-green-500 text-green-700 dark:text-green-200'
                                : 'bg-red-100 dark:bg-red-500/20 border-red-500 text-red-700 dark:text-red-200'
                              : isCorrect
                              ? 'bg-green-100 dark:bg-green-500/20 border-green-500 text-green-700 dark:text-green-200'
                              : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              answered
                                ? isSelected
                                  ? isCorrect
                                    ? 'bg-green-500 border-green-500'
                                    : 'bg-red-500 border-red-500'
                                  : isCorrect
                                  ? 'bg-green-500 border-green-500'
                                  : 'bg-gray-600 border-gray-600'
                                : 'border-gray-500'
                            }`}
                          >
                            {answered && isSelected && (isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />)}
                          </div>
                          <span>{option}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 rounded-lg p-4 mb-6"
                  >
                    <p className="text-sm text-blue-700 dark:text-blue-200">
                      <span className="font-semibold">Explanation:</span> {questions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              <motion.button
                onClick={handleNext}
                disabled={!showExplanation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  showExplanation
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-pointer hover:shadow-lg hover:shadow-green-500/50'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'View Results' : 'Next Question'}
              </motion.button>
            </motion.div>
          ) : (
            /* Results Screen */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* Score Summary */}
              <motion.div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-black rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quiz Complete! 🎉</h3>

                {/* Score Circle */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="relative w-48 h-48"
                  >
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke="#374151"
                        strokeWidth="8"
                      />
                      <motion.circle
                        initial={{ strokeDashoffset: 553 }}
                        animate={{ strokeDashoffset: 553 - (553 * percentage) / 100 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke="url(#scoreGradient)"
                        strokeWidth="8"
                        strokeDasharray="553"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="scoreGradient">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-5xl font-bold text-gray-900 dark:text-white">{percentage}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                    </div>
                  </motion.div>
                </div>

                {/* Expertise Level */}
                <div
                  className={`inline-block px-6 py-3 rounded-lg border mb-6 ${expertiseLevel.bg} border-current`}
                >
                  <p className={`text-lg font-bold ${expertiseLevel.color}`}>{expertiseLevel.level}</p>
                </div>

                {/* Score Text */}
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {score} out of {questions.length} correct
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {percentage >= 90
                    ? "Outstanding! You have expert-level knowledge."
                    : percentage >= 75
                    ? "Great! You demonstrate advanced understanding."
                    : percentage >= 60
                    ? "Good! You have solid foundational knowledge."
                    : "Keep learning! There's room to grow your expertise."}
                </p>
              </motion.div>

              {/* Category Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-black rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
              >
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Category Breakdown</h4>
                <div className="space-y-4">
                  {categoryStats.map((cat, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + idx * 0.1 }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">{cat.name}</span>
                        <span className="text-green-600 dark:text-green-400 font-bold">
                          {cat.correct}/{cat.total}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(cat.correct / cat.total) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + idx * 0.1 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4 flex-col sm:flex-row"
              >
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors"
                >
                  <RotateCcw size={18} />
                  Retake Quiz
                </button>
                <a
                  href="#contact"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg text-white font-semibold transition-all transform hover:scale-105 text-center"
                >
                  Hire for Your Project
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
