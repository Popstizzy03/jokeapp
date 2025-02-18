import { useState } from "react";
import jokesData from "./JokesData"; // Import the jokes array

const categories = ["All", "Science", "Tech", "Math", "Random"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentJoke, setCurrentJoke] = useState(
    jokesData[Math.floor(Math.random() * jokesData.length)]
  );

  const filterJokes = () => {
    return selectedCategory === "All"
      ? jokesData
      : jokesData.filter((joke: { category: string; }) => joke.category === selectedCategory);
  };

  const getNextJoke = () => {
    let filteredJokes = filterJokes();
  
    // If no jokes match the category, fall back to all jokes
    if (filteredJokes.length === 0) {
      filteredJokes = jokesData;
    }
  
    const randomIndex = Math.floor(Math.random() * filteredJokes.length);
    setCurrentJoke(filteredJokes[randomIndex]);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">🤣 React Comedy Club™</h1>
      
      {/* Category Filter */}
      <div className="flex gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === category
                ? "bg-blue-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Joke Display */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
        {currentJoke.question && (
          <h3 className="text-xl font-semibold mb-2">{currentJoke.question}</h3>
        )}
        <p className="text-lg">{currentJoke.punchline}</p>
      </div>

      {/* Next Joke Button */}
      <button
        onClick={getNextJoke}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Next Joke
      </button>
    </div>
  );
}
