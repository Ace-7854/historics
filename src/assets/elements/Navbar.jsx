import { Plus, Search } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useState } from "react";


export default function Navbar() {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [exampleChats] = useState([]);   
     
    function handleNewChat() {
      console.log("New Chat clicked");
      exampleChats.push(`Chat ${exampleChats.length + 1}`);
    }   
    function handleSearchChats() {
      console.log("Search Chats clicked");
      setShowSearch(true);
    }   
    const [collapsed, setCollapsed] = useState(false);

    return (
      <aside className={`navbar ${collapsed ? "collapsed" : ""}`}>
      {/*/// Top Section ///*/}
      <div className="navbar-top">
        <button
        className="navbar-btn"
        onClick={handleNewChat}
        title="New Chat"
        >
        <Plus size={16} className="icon" />
        {!collapsed && <span className="btn-label">New Chat</span>}
        </button>

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

        <button
        className="navbar-toggle"
        onClick={() => setCollapsed((s) => !s)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand" : "Collapse"}
        >
        {/* show a simple chevron */}
        <span className="toggle-icon">{collapsed ? "▶" : "◀"}</span>
        {!collapsed && <span className="sr-only">Collapse</span>}
        </button>
      </div>

      {showSearch && (
        <div className="search-pop-up">
        <input
          type="text"
          placeholder="Search chats..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button
          className="search-close-btn"
          onClick={() => setShowSearch(false)}
          title="Close search"
        >
          X
        </button>
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

      {/*/// Chat List ///*/}
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

      {/*/// Footer ///*/}
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