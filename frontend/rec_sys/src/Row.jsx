import React from 'react';

const Row = ({ title, items, type = "default" }) => {
  const handlePlay = (movie) => {
    console.log(`▶️ Playing: ${movie.title}`);
    // Add your play logic here
  };

  const handleAddToList = (movie) => {
    console.log(`➕ Added to watchlist: ${movie.title}`);
    // Add your watchlist logic here
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const formatProgress = (progress) => {
    if (progress === 100) return "Completed";
    if (progress > 0) return `${progress}% watched`;
    return "New";
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-items">
        {items.map((item) => (
          <div key={item.id} className="movie-card">
            {/* Movie Poster */}
            <div className={`movie-poster ${type}`}>
              {/* Beautiful gradient background with themed colors */}
            </div>
            
            {/* Movie Information */}
            <div className="movie-info">
              <h3 className="movie-title">{item.title}</h3>
              
              <div className="movie-meta">
                {item.year && <span>{item.year}</span>}
                {item.duration && <span> • {item.duration}</span>}
                {item.genre && <span> • {item.genre}</span>}
              </div>
              
              {item.rating && (
                <div className="movie-rating">
                  <span>{renderStars(item.rating)}</span>
                  <span className="rating-number">{item.rating}</span>
                </div>
              )}
              
              {item.genre && (
                <div>
                  <span className="genre-tag">{item.genre}</span>
                </div>
              )}
              
              {item.progress !== undefined && item.progress > 0 && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              )}
              
              <div className="movie-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handlePlay(item)}
                  aria-label={`Play ${item.title}`}
                >
                  {item.progress > 0 && item.progress < 100 ? "▶️ Continue" : "▶️ Play"}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleAddToList(item)}
                  aria-label={`Add ${item.title} to watchlist`}
                >
                  ➕ List
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;