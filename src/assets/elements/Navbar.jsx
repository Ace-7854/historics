
import { Plus, Search } from "lucide-react"; 
import { Link } from "react-router-dom";


export default function Navbar() {

  function handleNewChat() {
    console.log("New Chat initiated");
  }

  function handleSearchChats() {
    console.log("Search Chats clicked");
  }

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
        <button className="navbar-btn" onClick={handleNewChat}>
          <Plus size={16} className="icon" />
          New Chat
        </button>
        <button className="navbar-btn" onClick={handleSearchChats}>
          <Search size={16} className="icon" />
          Search Chats
        </button>
      </div>

      {/*/// Chat List ///*/}
      <div className="navbar-chats">
        {exampleChats.map((chat, index) => (
          <button key={index} className="chat-item" onClick={() => console.log(`Selected chat: ${chat}`)}>
            {chat}
          </button>
        ))}
      </div>

      {/*/// Footer ///*/}
      <footer className="navbar-footer">
        <ul>
          <li><Link to="/">Chat</Link></li>
        </ul>
      </footer>
    </aside>
  );
}
