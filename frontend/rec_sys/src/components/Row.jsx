export default function Row({ title, items }) {
  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="row-items">
        {items.map((item) => (
          <div key={item.id} className="movie-box">
            <p className="movie-title">{item.title}</p>
            <p className="movie-genre">{item.genre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
