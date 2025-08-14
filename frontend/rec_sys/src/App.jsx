import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Appy from './components/Appy';
import Row from "./components/Row";
import Admin from './admin';

const recommendedMovies = [
  { id: 1, title: "Movie 1" },
  { id: 2, title: "Movie 2" },
  { id: 7, title: "Movie 3" },
  { id: 8, title: "Movie 4" },
  { id: 9, title: "Movie 5" },
  { id: 10, title: "Movie 6" }
];

const alsoWatchedMovies = [
  { id: 3, title: "Movie 7" },
  { id: 4, title: "Movie 8" }
];

const watchedMovies = [
  { id: 5, title: "Movie 9" },
  { id: 6, title: "Movie 10" }
];

function App() {
  const [apiMessage, setApiMessage] = useState("");
  const [selectedPage, setSelectedPage] = useState('default');

  useEffect(() => {
    axios.get("https://8000-idx-reactapp-1733328043776.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev")
      .then((res) => {
        console.log("Backend says:", res.data);
        setApiMessage(res.data.message);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <Appy selectedPage={selectedPage} onPageChange={setSelectedPage} />
      <main className="app-main">
        {selectedPage === "admin" ? (
          <Admin />
        ) : (
          <>
            <Row title="Trending Now" items={recommendedMovies} />
            <Row title="Recommended For You" items={watchedMovies} />
            <Row title="Users who watched this also watched" items={alsoWatchedMovies} />
            <p style={{ color: "lightgreen", fontWeight: "bold" }}>
              FastAPI says: {apiMessage || "Loading..."}
            </p>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
