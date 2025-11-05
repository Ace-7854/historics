import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <button className="navbar-btn">New Chat</button>
      <button className="navbar-btn">Search</button>
      {/* <Link to="/" className="navbar-link">Home</Link> */}
    </div>
  );
}
