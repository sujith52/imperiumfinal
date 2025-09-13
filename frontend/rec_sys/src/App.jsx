import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Row from "./Row";
import Admin from "./admin";

const trendingMovies = [
  { 
    id: 1, 
    title: "Quantum Horizons", 
    genre: "Sci-Fi", 
    rating: 8.7, 
    year: 2024,
    duration: "2h 18m",
    progress: 0,
    description: "A mind-bending journey through parallel dimensions"
  },
  { 
    id: 2, 
    title: "The Last Symphony", 
    genre: "Drama", 
    rating: 9.1, 
    year: 2024,
    duration: "1h 56m",
    progress: 0,
    description: "A maestro's final performance changes everything"
  },
  { 
    id: 3, 
    title: "Neon Nights", 
    genre: "Action", 
    rating: 8.4, 
    year: 2024,
    duration: "2h 5m",
    progress: 0,
    description: "Cyberpunk thriller in a dystopian future"
  },
  { 
    id: 4, 
    title: "Ocean's Mystery", 
    genre: "Thriller", 
    rating: 8.9, 
    year: 2024,
    duration: "1h 47m",
    progress: 0,
    description: "Deep sea secrets threaten humanity"
  },
  { 
    id: 5, 
    title: "Stellar Journey", 
    genre: "Adventure", 
    rating: 8.6, 
    year: 2024,
    duration: "2h 12m",
    progress: 0,
    description: "Epic space exploration saga"
  },
  { 
    id: 6, 
    title: "Digital Dreams", 
    genre: "Sci-Fi", 
    rating: 8.2, 
    year: 2024,
    duration: "1h 54m",
    progress: 0,
    description: "Virtual reality becomes dangerously real"
  },
  { 
    id: 7, 
    title: "Shadow Protocol", 
    genre: "Espionage", 
    rating: 8.8, 
    year: 2024,
    duration: "2h 1m",
    progress: 0,
    description: "International conspiracy thriller"
  }
];

const recommendedMovies = [
  { 
    id: 8, 
    title: "Hidden Realms", 
    genre: "Fantasy", 
    rating: 8.8, 
    year: 2023,
    duration: "2h 3m",
    progress: 65,
    description: "Magical worlds collide in epic adventure"
  },
  { 
    id: 9, 
    title: "City Lights", 
    genre: "Romance", 
    rating: 8.5, 
    year: 2023,
    duration: "1h 42m",
    progress: 30,
    description: "Love story in the heart of metropolis"
  },
  { 
    id: 10, 
    title: "The Heist", 
    genre: "Crime", 
    rating: 9.0, 
    year: 2023,
    duration: "2h 8m",
    progress: 85,
    description: "Perfect crime with imperfect consequences"
  },
  { 
    id: 11, 
    title: "Mountain Peak", 
    genre: "Adventure", 
    rating: 8.3, 
    year: 2023,
    duration: "1h 58m",
    progress: 15,
    description: "Survival against impossible odds"
  },
  { 
    id: 12, 
    title: "Code Red", 
    genre: "Action", 
    rating: 8.7, 
    year: 2023,
    duration: "1h 51m",
    progress: 45,
    description: "Military operation goes wrong"
  },
  { 
    id: 13, 
    title: "Silent Waters", 
    genre: "Drama", 
    rating: 8.9, 
    year: 2023,
    duration: "2h 1m",
    progress: 20,
    description: "Family secrets surface after decades"
  }
];

const alsoWatchedMovies = [
  { 
    id: 14, 
    title: "Space Odyssey 2099", 
    genre: "Sci-Fi", 
    rating: 8.6, 
    year: 2022,
    duration: "2h 15m",
    progress: 100,
    description: "Humanity's next evolutionary leap"
  },
  { 
    id: 15, 
    title: "Midnight Train", 
    genre: "Mystery", 
    rating: 8.4, 
    year: 2022,
    duration: "1h 49m",
    progress: 100,
    description: "Murder mystery on luxury express"
  },
  { 
    id: 16, 
    title: "Golden Age", 
    genre: "Period", 
    rating: 8.8, 
    year: 2022,
    duration: "2h 7m",
    progress: 100,
    description: "Rise and fall of Hollywood legends"
  },
  { 
    id: 17, 
    title: "Electric Storm", 
    genre: "Thriller", 
    rating: 8.5, 
    year: 2022,
    duration: "1h 53m",
    progress: 100,
    description: "Technology thriller with shocking twists"
  },
  { 
    id: 18, 
    title: "Forest Path", 
    genre: "Adventure", 
    rating: 8.2, 
    year: 2022,
    duration: "1h 45m",
    progress: 100,
    description: "Nature documentary meets survival story"
  }
];

const watchedMovies = [
  { 
    id: 19, 
    title: "Cyber Wars", 
    genre: "Action", 
    rating: 8.9, 
    year: 2021,
    duration: "2h 4m",
    progress: 100,
    description: "Digital battlefield of the future"
  },
  { 
    id: 20, 
    title: "Love Letters", 
    genre: "Romance", 
    rating: 8.3, 
    year: 2021,
    duration: "1h 38m",
    progress: 100,
    description: "Timeless love story across generations"
  },
  { 
    id: 21, 
    title: "Dark Corners", 
    genre: "Horror", 
    rating: 8.1, 
    year: 2021,
    duration: "1h 56m",
    progress: 100,
    description: "Psychological horror that haunts"
  },
  { 
    id: 22, 
    title: "Royal Crown", 
    genre: "Historical", 
    rating: 8.7, 
    year: 2021,
    duration: "2h 11m",
    progress: 100,
    description: "Power struggles in medieval court"
  },
  { 
    id: 23, 
    title: "Velocity", 
    genre: "Racing", 
    rating: 8.4, 
    year: 2021,
    duration: "1h 49m",
    progress: 100,
    description: "High-speed thrills and racing drama"
  }
];

function App() {
  const [apiMessage, setApiMessage] = useState("");
  const [selectedPage, setSelectedPage] = useState("default");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000")
      .then((res) => {
        console.log("Backend says:", res.data);
        setApiMessage(res.data.message);
      })
      .catch((err) => {
        console.error("API error:", err);
        setApiMessage("Connected to demo mode");
      });
  }, []);

  return (
    <div className="main-app">
      {/* Premium Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">Rec-Sys</div>
          <div className="nav-buttons">
            <button 
              className={`nav-btn ${selectedPage === "default" ? "active" : ""}`}
              onClick={() => setSelectedPage("default")}
            >
              Home
            </button>
            <button 
              className={`nav-btn ${selectedPage === "movies" ? "active" : ""}`}
              onClick={() => setSelectedPage("movies")}
            >
              Movies
            </button>
            
            <button 
              className={`nav-btn ${selectedPage === "admin" ? "active" : ""}`}
              onClick={() => setSelectedPage("admin")}
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {selectedPage === "default" && (
        <section className="hero-section">
          <div className="hero-content">
            <h1>Premium Streaming</h1>
            <p>Discover thousands of movies and series. Watch anywhere, anytime, on any device.</p>
          </div>
        </section>
      )}

      <main className="app-main">
        {selectedPage === "admin" ? (
          <Admin />
        ) : (
          <div className="fade-in">
            <Row 
              title="🔥 Trending Now" 
              items={trendingMovies} 
              type="trending"
            />
            <Row 
              title="🎯 Recommended For You" 
              items={recommendedMovies}
              type="recommended" 
            />
            <Row
              title="👥 Because You Watched..."
              items={alsoWatchedMovies}
              type="also-watched"
            />
            <Row 
              title="🔄 Watch Again" 
              items={watchedMovies}
              type="watched" 
            />
            
            <div className="api-status">
              <strong>System Status:</strong> {apiMessage || <span className="loading">Initializing...</span>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;