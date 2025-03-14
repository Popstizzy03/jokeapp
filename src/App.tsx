import { useState } from "react";
import jokesData from "./JokesData";

const categories = ["All", "Science", "Tech", "Math", "Random"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentJoke, setCurrentJoke] = useState(
    jokesData[Math.floor(Math.random() * jokesData.length)]
  );

  const filterJokes = () => {
    if (selectedCategory === "All") return jokesData;
    if (selectedCategory === "Random") return jokesData;
    return jokesData.filter((joke) => joke.category === selectedCategory);
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

    setCurrentJoke(filteredJokes[randomIndex]);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Science":
        return "bg-green-500 text-white";
      case "Tech":
        return "bg-blue-500 text-white";
      case "Math":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">🤣 React Comedy Club™</h1>
      
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
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

      <div key={currentJoke.id} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center animate-fade-in">
        <div className={`text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block ${getCategoryColor(currentJoke.category)}`}>
          {currentJoke.category}
        </div>
        {currentJoke.question && (
          <h3 className="text-xl font-semibold mb-2">{currentJoke.question}</h3>
        )}
        <p className="text-lg">{currentJoke.punchline}</p>
      </div>

      <button
        onClick={getNextJoke}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Next Joke
      </button>
    </div>
  );
}
