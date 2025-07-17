import { useState, useEffect, useRef } from "react";
import jokesData, { Joke } from "./JokesData";

const categories = ["All", "Science", "Tech", "Math", "Random", "MBTI", "Engineering", "AI", "IQ"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentJoke, setCurrentJoke] = useState<Joke>(
    jokesData[Math.floor(Math.random() * jokesData.length)]
  );
  const [favorites, setFavorites] = useState<number[]>([]);
  const [ratings, setRatings] = useState<{[key: number]: number}>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [jokeHistory, setJokeHistory] = useState<Joke[]>([]);
  const [showHandoff, setShowHandoff] = useState(false);
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [showContinuity, setShowContinuity] = useState(false);
  const [showAirDrop, setShowAirDrop] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [focusTimer, setFocusTimer] = useState(0);
  const jokeCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('joke-favorites');
    const savedRatings = localStorage.getItem('joke-ratings');
    const savedTheme = localStorage.getItem('joke-theme');
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedRatings) setRatings(JSON.parse(savedRatings));
    if (savedTheme) setIsDarkMode(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('joke-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('joke-ratings', JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem('joke-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const filterJokes = () => {
    let filtered = jokesData;
    
    if (showFavorites) {
      filtered = filtered.filter(joke => favorites.includes(joke.id));
    }
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(joke => joke.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(joke => 
        joke.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        joke.punchline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        joke.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const getNextJoke = () => {
    let filteredJokes = filterJokes();
    if (filteredJokes.length === 0) filteredJokes = jokesData;

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * filteredJokes.length);
    } while (
      filteredJokes[randomIndex]?.id === currentJoke?.id &&
      filteredJokes.length > 1
    );

    const nextJoke = filteredJokes[randomIndex];
    setCurrentJoke(nextJoke);
    setJokeHistory(prev => [nextJoke, ...prev.slice(0, 9)]);
  };

  const toggleFavorite = (jokeId: number) => {
    setFavorites(prev => 
      prev.includes(jokeId) 
        ? prev.filter(id => id !== jokeId)
        : [...prev, jokeId]
    );
  };

  const rateJoke = (jokeId: number, rating: number) => {
    setRatings(prev => ({...prev, [jokeId]: rating}));
  };

  const shareJoke = async (joke: Joke) => {
    const text = joke.question 
      ? `${joke.question}\n\n${joke.punchline}`
      : joke.punchline;
    
    if (navigator.share) {
      await navigator.share({
        title: 'Check out this joke!',
        text: text
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Joke copied to clipboard!');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Science":
        return "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg";
      case "Tech":
        return "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg";
      case "Math":
        return "bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg";
      case "Random":
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg";
      case "MBTI":
        return "bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg";
      case "Engineering":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg";
      case "AI":
        return "bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-lg";
      case "IQ":
        return "bg-gradient-to-r from-indigo-400 to-indigo-600 text-white shadow-lg";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-lg";
    }
  };

  const startVoiceControl = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      getNextJoke();
    }, 2000);
  };

  const startFocusMode = () => {
    setShowFocusMode(true);
    setFocusTimer(25 * 60);
    const interval = setInterval(() => {
      setFocusTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowFocusMode(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleHandoff = () => {
    setShowHandoff(true);
    setTimeout(() => setShowHandoff(false), 3000);
  };

  const handleAirDrop = () => {
    setShowAirDrop(true);
    shareJoke(currentJoke);
    setTimeout(() => setShowAirDrop(false), 2000);
  };

  const handleContinuity = () => {
    setShowContinuity(true);
    localStorage.setItem('continuity-joke', JSON.stringify(currentJoke));
    setTimeout(() => setShowContinuity(false), 2000);
  };

  const getTopRatedJokes = () => {
    return jokesData
      .filter(joke => ratings[joke.id])
      .sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0))
      .slice(0, 5);
  };

  const themeClasses = isDarkMode 
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white" 
    : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900";
  
  const cardClasses = isDarkMode 
    ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black border-gray-600 shadow-2xl" 
    : "bg-gradient-to-br from-white via-gray-50 to-gray-100 border-gray-200 shadow-2xl";

  return (
    <div className={`min-h-screen ${themeClasses} transition-all duration-500 relative overflow-hidden`}>
      {/* Apple Dynamic Island Navigation */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className={`${isDarkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 hover:scale-105`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
            </div>
            <div className="text-sm font-medium">🎭 Comedy Central</div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                ⚙️
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-20">
        {/* Enhanced Header */}
        <div className="w-full max-w-6xl mb-8">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              🎭 Comedy Central
            </h1>
            <p className="text-lg opacity-70">Where humor meets intelligence</p>
          </div>

          {/* Glassmorphism Search Bar */}
          <div className="relative mb-6">
            <div className={`${isDarkMode ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-xl rounded-2xl p-1 border ${isDarkMode ? 'border-white/20' : 'border-black/20'} shadow-2xl`}>
              <input
                type="text"
                placeholder="Search jokes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-6 py-4 rounded-xl bg-transparent text-lg placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300`}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl opacity-60">🔍</div>
            </div>
          </div>

          {/* Skeuomorphic Category Pills */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 transform ${
                  selectedCategory === category
                    ? `${getCategoryColor(category)} shadow-inner`
                    : `${isDarkMode ? 'bg-gray-800/80 text-white hover:bg-gray-700/80' : 'bg-white/80 text-gray-800 hover:bg-gray-100/80'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} shadow-lg hover:shadow-xl`
                }`}
                style={selectedCategory === category ? {
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)'
                } : {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Apple-style Control Center */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                showFavorites
                  ? "bg-red-500/90 text-white shadow-inner"
                  : `${isDarkMode ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-white/80 hover:bg-gray-100/80'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`
              }`}
              style={{
                boxShadow: showFavorites ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div className="text-2xl mb-1">{showFavorites ? '💔' : '❤️'}</div>
              <div className="text-xs opacity-70">Favorites ({favorites.length})</div>
            </button>

            <button
              onClick={startVoiceControl}
              className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                isListening
                  ? "bg-blue-500/90 text-white shadow-inner"
                  : `${isDarkMode ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-white/80 hover:bg-gray-100/80'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`
              }`}
              style={{
                boxShadow: isListening ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div className="text-2xl mb-1">{isListening ? '🔴' : '🎤'}</div>
              <div className="text-xs opacity-70">Voice Control</div>
            </button>

            <button
              onClick={startFocusMode}
              className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                showFocusMode
                  ? "bg-purple-500/90 text-white shadow-inner"
                  : `${isDarkMode ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-white/80 hover:bg-gray-100/80'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`
              }`}
              style={{
                boxShadow: showFocusMode ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-xs opacity-70">
                {showFocusMode ? formatTime(focusTimer) : 'Focus Mode'}
              </div>
            </button>

            <button
              onClick={handleAirDrop}
              className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                showAirDrop
                  ? "bg-green-500/90 text-white shadow-inner"
                  : `${isDarkMode ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-white/80 hover:bg-gray-100/80'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`
              }`}
              style={{
                boxShadow: showAirDrop ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div className="text-2xl mb-1">📤</div>
              <div className="text-xs opacity-70">AirDrop</div>
            </button>
          </div>
        </div>

        {/* Skeuomorphic Main Joke Display */}
        <div 
          ref={jokeCardRef}
          key={currentJoke.id} 
          className={`${cardClasses} p-10 rounded-3xl w-full max-w-3xl text-center border-2 transition-all duration-500 transform hover:scale-[1.02] relative overflow-hidden`}
          style={{
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.25),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `,
            background: isDarkMode 
              ? 'linear-gradient(135deg, rgba(55, 65, 81, 0.8), rgba(17, 24, 39, 0.9))'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(249, 250, 251, 0.9))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className={`text-sm font-bold px-4 py-2 rounded-full ${getCategoryColor(currentJoke.category)}`}
                style={{
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
                }}
              >
                {currentJoke.category}
              </div>
              <button
                onClick={() => toggleFavorite(currentJoke.id)}
                className={`text-3xl transition-all duration-300 hover:scale-125 ${
                  favorites.includes(currentJoke.id) ? 'text-red-500' : 'text-gray-400'
                }`}
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              >
                {favorites.includes(currentJoke.id) ? '❤️' : '🤍'}
              </button>
            </div>
            
            {currentJoke.question && (
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {currentJoke.question}
              </h3>
            )}
            <p className="text-2xl mb-8 leading-relaxed font-medium"
              style={{
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              {currentJoke.punchline}
            </p>

            {/* Skeuomorphic Rating */}
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => rateJoke(currentJoke.id, star)}
                  className={`text-3xl transition-all duration-300 hover:scale-125 ${
                    (ratings[currentJoke.id] || 0) >= star ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    textShadow: (ratings[currentJoke.id] || 0) >= star ? '0 0 10px rgba(255, 193, 7, 0.5)' : 'none'
                  }}
                >
                  ⭐
                </button>
              ))}
            </div>

            {/* Apple-style Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={getNextJoke}
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{
                  boxShadow: '0 8px 16px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                🎲 Next Joke
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => shareJoke(currentJoke)}
                  className={`px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-700/80 hover:bg-gray-600/80' : 'bg-white/80 hover:bg-gray-100/80'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
                  style={{
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  🔗
                </button>
                
                <button
                  onClick={handleHandoff}
                  className={`px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 ${showHandoff ? 'bg-blue-500/90 text-white' : `${isDarkMode ? 'bg-gray-700/80 hover:bg-gray-600/80' : 'bg-white/80 hover:bg-gray-100/80'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}`}
                  style={{
                    boxShadow: showHandoff ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  📱
                </button>
                
                <button
                  onClick={handleContinuity}
                  className={`px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 ${showContinuity ? 'bg-green-500/90 text-white' : `${isDarkMode ? 'bg-gray-700/80 hover:bg-gray-600/80' : 'bg-white/80 hover:bg-gray-100/80'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}`}
                  style={{
                    boxShadow: showContinuity ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  🔄
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apple-style Settings Panel */}
      {showSettings && (
        <div className="mt-8 w-full max-w-6xl">
          <div 
            className={`${cardClasses} p-8 rounded-3xl border-2 relative overflow-hidden`}
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `,
              background: isDarkMode 
                ? 'linear-gradient(135deg, rgba(55, 65, 81, 0.8), rgba(17, 24, 39, 0.9))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(249, 250, 251, 0.9))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                📊 Control Center
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Stats Card */}
                <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} p-6 rounded-2xl backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
                  style={{
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <h3 className="text-xl font-bold mb-4 text-center">📈 Analytics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="opacity-70">Total Jokes:</span>
                      <span className="font-semibold">{jokesData.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Favorites:</span>
                      <span className="font-semibold text-red-400">{favorites.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Rated:</span>
                      <span className="font-semibold text-yellow-400">{Object.keys(ratings).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Avg Rating:</span>
                      <span className="font-semibold text-blue-400">
                        {Object.values(ratings).length > 0 
                          ? (Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length).toFixed(1)
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top Rated */}
                <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} p-6 rounded-2xl backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
                  style={{
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <h3 className="text-xl font-bold mb-4 text-center">🏆 Top Rated</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {getTopRatedJokes().map(joke => (
                      <div key={joke.id} className="text-sm p-2 rounded-lg bg-black/10">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">{'⭐'.repeat(ratings[joke.id])}</span>
                          <span className="text-xs truncate">{joke.question || joke.punchline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apple Features */}
                <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} p-6 rounded-2xl backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
                  style={{
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <h3 className="text-xl font-bold mb-4 text-center">🍎 Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>🎤</span>
                        <span className="text-sm">Voice Control</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>🎯</span>
                        <span className="text-sm">Focus Mode</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${showFocusMode ? 'bg-purple-400' : 'bg-gray-400'}`}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>📱</span>
                        <span className="text-sm">Handoff</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${showHandoff ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>🔄</span>
                        <span className="text-sm">Continuity</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${showContinuity ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent History */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-center">📚 Recent History</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                  {jokeHistory.map((joke, index) => (
                    <button
                      key={`${joke.id}-${index}`}
                      onClick={() => setCurrentJoke(joke)}
                      className={`p-3 rounded-xl text-sm text-left transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/50 hover:bg-gray-100/50'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
                      style={{
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div className="truncate font-medium">{joke.question || joke.punchline}</div>
                      <div className="text-xs opacity-60 mt-1">{joke.category}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apple-style Footer */}
      <div className="mt-12 text-center">
        <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-sm rounded-full px-6 py-3 inline-block border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <p className="text-sm opacity-60">
            Made with ❤️ to spread joy • {jokesData.length} jokes and counting!
          </p>
        </div>
      </div>
    </div>
  );
}
