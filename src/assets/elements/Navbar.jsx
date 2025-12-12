import { Plus, Search } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserChats, createNewChat } from "../../api/base.js";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState(null);

  // Load chats when component mounts
  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUsername(loggedInUser);
      loadChats(loggedInUser);
    }
  }, []);

  async function loadChats(user) {
    const result = await getUserChats(user);
    if (result.success) {
      setChats(result.chats);
    }
  }

  async function handleNewChat() {
    if (!username) {
      alert("Please log in to create a chat");
      return;
    }
    
    const result = await createNewChat(username);
    if (result.success) {
      setChats(prev => [...prev, {
        chatId: result.chatId,
        chatName: result.chat.chatName,
        messageCount: 0
      }]);
    }
  }

  function handleSearchChats() {
    setShowSearch(true);
  }

  return (
    <aside className={`navbar ${collapsed ? "collapsed" : ""}`}>
      <div className="navbar-top">
        <button className="navbar-btn" onClick={handleNewChat} title="New Chat">
          <Plus size={16} className="icon" />
          {!collapsed && <span className="btn-label">New Chat</span>}
        </button>
        
        <button className="navbar-btn" onClick={() => {
          setCollapsed(false);
          handleSearchChats();
        }} title="Search Chats">
          <Search size={16} className="icon" />
          {!collapsed && <span className="btn-label">Search Chats</span>}
        </button>
        
        <button className="navbar-btn" onClick={() => setCollapsed((s) => !s)} title={collapsed ? "Expand" : "Collapse"}>
          <span className="icon">{collapsed ? "▶" : "◀"}</span>
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
          <button className="search-close-btn" onClick={() => setShowSearch(false)} title="Close search">
            X
          </button>
          
          <div className="table-chats">
            {chats
              .filter((chat) => chat.chatName.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((chat) => (
                <button
                  key={chat.chatId}
                  className="chat-item"
                  onClick={() => console.log(`Selected chat: ${chat.chatId}`)}
                  title={chat.chatName}
                >
                  {collapsed ? <span className="chat-initial">{chat.chatName.charAt(0)}</span> : chat.chatName}
                </button>
              ))}
          </div>
        </div>
      )}

      {!showSearch && (
        <div className="navbar-chats">
          {chats.map((chat) => (
            <button
              key={chat.chatId}
              className="chat-item"
              onClick={() => console.log(`Selected chat: ${chat.chatId}`)}
              title={chat.chatName}
            >
              {collapsed ? <span className="chat-initial">{chat.chatName.charAt(0)}</span> : chat.chatName}
            </button>
          ))}
        </div>
      )}

      <footer className="navbar-footer">
        <ul>
          <li><Link to="/" title="Chat">{!collapsed ? "Chat" : "💬"}</Link></li>
          <li><Link to="/login" title="Login">{!collapsed ? "Login" : "🔒"}</Link></li>
        </ul>
      </footer>
    </aside>
  );
}