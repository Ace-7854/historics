
import { Plus, Search } from "lucide-react"; 
import { Link } from "react-router-dom";


export default function Navbar() {
  const exampleChats = [
    "To Be or Not To Be",
    "Macbeth’s Dilemma",
    "A Midsummer Night’s Query",
    "The Tempest of Thought",
    "Romeo & Juliet",
  ];

  return (
    <aside className="navbar">
      {/*/// Top Section ///*/}
      <div className="navbar-top">
        <button className="navbar-btn">
          <Plus size={16} className="icon" />
          New Chat
        </button>
        <button className="navbar-btn">
          <Search size={16} className="icon" />
          Search Chats
        </button>
      </div>

      {/*/// Chat List ///*/}
      <div className="navbar-chats">
        {exampleChats.map((chat, index) => (
          <div key={index} className="chat-item">
            {chat}
          </div>
        ))}
      </div>

      {/*/// Footer ///*/}
      <footer className="navbar-footer">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/chat">Chat</Link></li>
        </ul>
      </footer>
    </aside>
  );
}
