import Admin from "../admin";
import App from "../App";
function Appy({ selectedPage, onPageChange }) {
  const handlePageChange = (e) => {
    onPageChange(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-title-box">
        <img src="/cat.png" alt="Logo" className="header-icon" />
        <span className="header-title">Recommendation-System</span>
      </div>
      <div className="user-box">
        <select value={selectedPage} onChange={handlePageChange}>
          <option value="default">User-Amy</option>
          <option value="admin">Admin Page</option>
        </select>
      </div>
    </header>
  );
}

export default Appy;
