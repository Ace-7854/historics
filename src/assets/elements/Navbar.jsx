// Component for sidebar navigation - Manages chats, search, nav links
import { Plus, Search } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useState } from "react";


export default function Navbar() {
  // Controls when the navbar is open or collapsed
  const [collapsed, setCollapsed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [exampleChats, setExampleChats] = useState([]);    // Temporary chat list, to be replaced with real data   
 
  // Handles Clicking "New Chat" (only temporary use)
  function handleNewChat() {
    console.log("New Chat clicked");
    setExampleChats(prev => [...prev, `Chat ${prev.length + 1}`]);
  }   
  // Opens search bar 
  function handleSearchChats() {
    console.log("Search Chats clicked");
    setShowSearch(true);
  }
  return (
    <aside className={`navbar ${collapsed ? "collapsed" : ""}`}>
    {/*-----------Top Section-----------*/}
    <div className="navbar-top">
      {/* Button For New Chat */}
      <button
      className="navbar-btn"
      onClick={() => {
        // if (!userLoggedIn) {
        //   alert("You must be logged in to start a new chat.");
        //   return;
        // }
        handleNewChat();
      }}
      title="New Chat"
      // disabled={!userLoggedIn}
      >
      <Plus size={16} className="icon" />
      {!collapsed && <span className="btn-label">New Chat</span>}
      </button>
      {/* Search Chats Button */}
      <button
      className="navbar-btn"
      onClick={() => {
        setCollapsed(false); // expand when opening search
        handleSearchChats();
      }}
      title="Search Chats"
      >
      <Search size={16} className="icon" />
      {!collapsed && <span className="btn-label">Search Chats</span>}
      </button>
      {/* Expand and Collapse Button */}
      <button
      className="navbar-btn"
      onClick={() => setCollapsed((s) => !s)}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      title={collapsed ? "Expand" : "Collapse"}
      >
      {/* show a simple chevron */}
      <span className="icon">{collapsed ? "▶" : "◀"}</span>
      {!collapsed && <span className="sr-only">Collapse</span>}
      </button>
    </div>
          {/*-----------Search Pop Up-----------*/}
    {showSearch && (
      <div className="search-pop-up">
      {/* Search Input Area */}
      <input
        type="text"
        placeholder="Search chats..."
        className="search-input"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {/* Close Search Pop Up */}
      <button
        className="search-close-btn"
        onClick={() => setShowSearch(false)}
        title="Close search"
      >
        X
      </button>
          
      {/*Filter Chat Results Based on User Input*/}
      <div className="table-chats">
        {exampleChats
        .filter((chat) =>
          chat.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((chat, index) => (
          <button
          key={index}
          className="chat-item"
          onClick={() => console.log(`Selected chat: ${chat}`)}
          title={chat}
          >
          {/* show compact content when collapsed */}
          {collapsed ? (
            <span className="chat-initial">{chat.charAt(0)}</span>
          ) : (
            chat
          )}
          </button>
        ))}
      </div>
      </div>
    )}
    {/*-----------Chat List (Not Searching)-----------*/}
    {!showSearch && (
      <div className="navbar-chats">
      {exampleChats.map((chat, index) => (
        <button
        key={index}
        className="chat-item"
        onClick={() => console.log(`Selected chat: ${chat}`)}
        title={chat}
        >
        {collapsed ? (
          <span className="chat-initial">{chat.charAt(0)}</span>
        ) : (
          chat
        )}
        </button>
      ))}
      </div>
    )}
    {/*-----------Footer Navigation-----------*/}
    <footer className="navbar-footer">
      <ul>
      <li>
        <Link to="/" title="Chat">
        {!collapsed ? "Chat" : "💬"}
        </Link>
      </li>
      <li>
        <Link to="/login" title="Login">
        {!collapsed ? "Login" : "🔒"}
        </Link>
      </li>
      </ul>
    </footer>
    </aside>
  );
}
