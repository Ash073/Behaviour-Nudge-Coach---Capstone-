import React, { useState } from 'react';
import { Brain, Target, Zap, MessageSquare, Plus, Trash2, AlertTriangle } from 'lucide-react';

// Using predefined responses instead of API calls
// const API_KEY = process.env.REACT_APP_API_KEY || '';
export default function BehaviorNudgeAgent() {
  const [userProfile, setUserProfile] = useState<{
    name: string;
    goals: string[];
    currentHabits: string[];
    challenges: string[];
  }>({
    name: '',
    goals: [],
    currentHabits: [],
    challenges: []
  });
  const [customGoal, setCustomGoal] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hardcoreMode, setHardcoreMode] = useState(false);

  const predefinedGoals = [
    { icon: '🏃', label: 'Exercise Regularly', category: 'Health' },
    { icon: '🥗', label: 'Eat Healthier', category: 'Health' },
    { icon: '💤', label: 'Better Sleep Schedule', category: 'Health' },
    { icon: '💧', label: 'Drink More Water', category: 'Health' },
    { icon: '🧘', label: 'Practice Meditation', category: 'Mental' },
    { icon: '📚', label: 'Read More Books', category: 'Learning' },
    { icon: '✍️', label: 'Start Journaling', category: 'Mental' },
    { icon: '⏰', label: 'Wake Up Earlier', category: 'Productivity' },
    { icon: '📱', label: 'Reduce Screen Time', category: 'Digital' },
    { icon: '🎯', label: 'Stop Procrastinating', category: 'Productivity' },
    { icon: '🧹', label: 'Keep Space Organized', category: 'Lifestyle' },
    { icon: '💰', label: 'Save Money', category: 'Finance' },
    { icon: '🗣️', label: 'Learn New Language', category: 'Learning' },
    { icon: '🎨', label: 'Develop Creative Habit', category: 'Creativity' },
    { icon: '👥', label: 'Connect with Friends', category: 'Social' },
    { icon: '🚭', label: 'Quit Bad Habit', category: 'Health' },
  ];

  const psychologyPrinciples = [
    "Implementation Intentions (If-Then Planning)",
    "Habit Stacking",
    "Environmental Design",
    "Social Accountability",
    "Identity-Based Habits",
    "Temptation Bundling",
    "The 2-Minute Rule",
    "Progress Tracking & Visualization"
  ];

  // System prompt kept for potential future use with API
  const systemPrompt = `You are an expert behavior change coach specialized in micro-habits and evidence-based psychology. Your role is to help users build sustainable habits through:

1. **Tiny Habits Method**: Break down goals into 2-minute starter habits
2. **Implementation Intentions**: Create specific "if-then" plans
3. **Habit Stacking**: Link new habits to existing routines
4. **Identity Shift**: Help users see themselves as the person who does these habits
5. **Environmental Design**: Suggest friction reduction for good habits, friction addition for bad habits
6. **Behavioral Psychology**: Use principles from BJ Fogg, James Clear, Charles Duhigg

USER PROFILE:
${userProfile.name ? `Name: ${userProfile.name}` : 'Not set'}
Goals: ${userProfile.goals.join(', ') || 'None set'}
Current Habits: ${userProfile.currentHabits.join(', ') || 'None listed'}
Challenges: ${userProfile.challenges.join(', ') || 'None listed'}

${hardcoreMode ? `
HARDCORE MODE ACTIVATED - Guidelines:
- Be direct, blunt, and brutally honest
- Cut through excuses and self-deception
- Focus on accountability and hard truths
- Provide tough love and no-nonsense advice
- Challenge weak thinking and half-efforts
- Give specific, actionable commands, not suggestions
- Call out BS when you see it
- Push users to confront their real obstacles
- No fluff, no feel-good platitudes
- Ruthlessly prioritize what matters most
- Use strong, directive language
- Eliminate hedging words like "maybe," "possibly," "try"
- Give clear deadlines and measurable outcomes
- Address avoidance behaviors directly
`.trim() : `
Guidelines:
- Always be encouraging and non-judgmental
- Focus on ONE micro-behavior at a time
- Make habits ridiculously easy to start
- Celebrate small wins
- Ask clarifying questions about context, triggers, and obstacles
- Suggest specific, actionable next steps
- Use psychology principles but explain them simply
- Personalize advice based on user's profile
`}

${hardcoreMode ? 'Respond in a direct, no-nonsense tone. Be the drill sergeant that users need, not the cheerleader they want. Use strong imperative verbs. Eliminate all softening language. Give specific numbers, deadlines, and measurable actions.' : 'Respond in a warm, supportive tone like a friend who\'s also a psychology expert.'}`;

  const addPredefinedGoal = (goalLabel: string) => {
    if (!userProfile.goals.includes(goalLabel)) {
      setUserProfile(prev => ({
        ...prev,
        goals: [...prev.goals, goalLabel]
      }));
    }
  };

  const addCustomGoal = () => {
    if (customGoal.trim()) {
      setUserProfile(prev => ({
        ...prev,
        goals: [...prev.goals, customGoal.trim()]
      }));
      setCustomGoal('');
      setShowCustomInput(false);
    }
  };

  const removeGoal = (index: number) => {
    setUserProfile(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }));
  };

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessage = { role: 'user', content: userMessage };
    setChatHistory(prev => [...prev, newMessage]);
    setUserMessage('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Predefined responses based on hardcore mode
    const predefinedResponses = [
      "Set a timer for 2 minutes and do the habit right now. No excuses.",
      "Track your progress daily. Consistency beats perfection.",
      "Remove temptations from your environment. Make good habits easy and bad habits hard.",
      "Start with just 2 minutes today. Build momentum gradually.",
      "Pair your new habit with an existing one. Habit stacking works.",
      "Write down your 'why'. Remind yourself daily.",
      "Measure your progress. What gets measured gets improved.",
      "Prepare your environment the night before. Remove friction."
    ];

    const hardcoreResponses = [
      "STOP MAKING EXCUSES. Do it NOW for 2 minutes, no matter what.",
      "Your future self is counting on you. Don't disappoint them.",
      "Eliminate distractions IMMEDIATELY. No phone, no TV, just action.",
      "If you can't do 10 minutes, do 2. But DO IT NOW.",
      "You're not busy, you're just not prioritizing. Make it a priority.",
      "No 'trying', no 'hoping'. Just DO. Get it done.",
      "Accountability partner? Tell someone what you're doing RIGHT NOW.",
      "FAILURE IS NOT AN OPTION. Success is mandatory."
    ];

    // Select response based on mode
    const responses = hardcoreMode ? hardcoreResponses : predefinedResponses;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const assistantMessage = { role: 'assistant', content: randomResponse };
    setChatHistory(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const quickPrompts = [
    "Help me build a morning routine",
    "I want to exercise more consistently",
    "How do I stop procrastinating?",
    "I want to read more books",
    "Help me reduce screen time"
  ];

  const sampleResponses = {
    normal: [
      "Start with just 2 minutes of stretching every morning. Consistency is key.",
      "Try the '2-minute rule' - if it takes less than 2 minutes, do it now.",
      "Create an implementation intention: 'After I brush my teeth, I will do 5 push-ups.'"
    ],
    hardcore: [
      "STOP WASTING TIME. Do 10 burpees RIGHT NOW. No excuses.",
      "FAILURE IS NOT AN OPTION. Exercise for 15 minutes daily, non-negotiable.",
      "ACCOUNTABILITY CHECK: Text your friend right now with your commitment."
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">Behavior Nudge Coach</h1>
              <p className="text-gray-600">Your AI-powered habit transformation companion</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Hardcore Mode</span>
              <button
                onClick={() => setHardcoreMode(!hardcoreMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${hardcoreMode ? 'bg-red-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${hardcoreMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              {hardcoreMode && (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-gray-800">Your Profile</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({...prev, name: e.target.value}))}
                    placeholder="Your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goals
                  </label>
                  
                  {/* Current Goals List */}
                  {userProfile.goals.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {userProfile.goals.map((goal, index) => (
                        <div key={index} className="flex items-center justify-between bg-purple-50 px-3 py-2 rounded-lg">
                          <span className="text-sm text-gray-700">{goal}</span>
                          <button
                            onClick={() => removeGoal(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Goal Button */}
                  {!showCustomInput ? (
                    <button
                      onClick={() => setShowCustomInput(true)}
                      className="w-full px-3 py-2 border-2 border-dashed border-purple-300 text-purple-600 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Select or Add Goal
                    </button>
                  ) : (
                    <div className="space-y-3">
                      {/* Predefined Goals Grid */}
                      <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-gray-500 mb-2">Popular Goals</p>
                        <div className="grid grid-cols-1 gap-2">
                          {predefinedGoals.map((goal, index) => (
                            <button
                              key={index}
                              onClick={() => addPredefinedGoal(goal.label)}
                              disabled={userProfile.goals.includes(goal.label)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition ${
                                userProfile.goals.includes(goal.label)
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300'
                              }`}
                            >
                              <span className="text-lg">{goal.icon}</span>
                              <span className="flex-1">{goal.label}</span>
                              <span className="text-xs text-gray-400">{goal.category}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Goal Input */}
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-2">Or Add Custom Goal</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={customGoal}
                            onChange={(e) => setCustomGoal(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addCustomGoal()}
                            placeholder="Type your own goal..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          />
                          <button
                            onClick={addCustomGoal}
                            className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Close Button */}
                      <button
                        onClick={() => setShowCustomInput(false)}
                        className="w-full px-3 py-2 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-600" />
                <h2 className="text-lg font-bold text-gray-800">Psychology Principles</h2>
              </div>
              <div className="space-y-2">
                {psychologyPrinciples.map((principle, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-gray-800">Hardcore Mode Samples</h2>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => setHardcoreMode(!hardcoreMode)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition ${hardcoreMode ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {hardcoreMode ? 'Hardcore Mode ON' : 'Hardcore Mode OFF'}
                </button>
                <div className="text-sm text-gray-600">
                  <p className="font-bold mb-2">Sample Responses:</p>
                  <div className="mb-3">
                    <p className="font-medium mb-1">Normal Mode:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>"{sampleResponses.normal[0]}"</li>
                      <li>"{sampleResponses.normal[1]}"</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Hardcore Mode:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>"{sampleResponses.hardcore[0]}"</li>
                      <li>"{sampleResponses.hardcore[1]}"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-bold text-gray-800">Coach Chat</h2>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Ready to Transform Your Habits?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start by sharing what you'd like to work on, or try a quick prompt below
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
                      {quickPrompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => setUserMessage(prompt)}
                          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Share what you're working on..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !userMessage.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

