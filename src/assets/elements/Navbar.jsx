import { Plus, Search } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useState } from "react";
import { useChat } from "../../context/chatContext.jsx"; // NEW

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get chat data and functions from context
  const { chats, currentChatId, loadChat, createChat, username } = useChat();

  async function handleNewChat() {
    if (!username) {
      alert("Please log in to create a chat");
      return;
    }
    
    await createChat("New Chat");
  }

  function handleSearchChats() {
    setShowSearch(true);
  }

  function handleChatClick(chatId) {
    loadChat(chatId);
    console.log(`Loading chat: ${chatId}`);
  }

  return (
    <aside className={`navbar ${collapsed ? "collapsed" : ""}`}>
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
            setCollapsed(false);
            handleSearchChats();
          }}
          title="Search Chats"
        >
          <Search size={16} className="icon" />
          {!collapsed && <span className="btn-label">Search Chats</span>}
        </button>
        
        <button
          className="navbar-btn"
          onClick={() => setCollapsed((s) => !s)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
        >
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
          <button
            className="search-close-btn"
            onClick={() => setShowSearch(false)}
            title="Close search"
          >
            X
          </button>
          
          <div className="table-chats">
            {chats
              .filter((chat) =>
                chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((chat) => (
                <button
                  key={chat.chatId}
                  className={`chat-item ${chat.chatId === currentChatId ? 'active' : ''}`}
                  onClick={() => handleChatClick(chat.chatId)}
                  title={chat.chatName}
                >
                  {collapsed ? (
                    <span className="chat-initial">{chat.chatName.charAt(0)}</span>
                  ) : (
                    <span className="chat-name">
                      {chat.chatName}
                      {chat.messageCount > 0 && (
                        <span className="message-count"> ({chat.messageCount})</span>
                      )}
                    </span>
                  )}
                </button>
              ))}
          </div>
        </div>
      )}

      {!showSearch && (
        <div className="navbar-chats">
          {chats.length === 0 && !collapsed && (
            <p className="no-chats-message">No chats yet. Create one!</p>
          )}
          {chats.map((chat) => (
            <button
              key={chat.chatId}
              className={`chat-item ${chat.chatId === currentChatId ? 'active' : ''}`}
              onClick={() => handleChatClick(chat.chatId)}
              title={chat.chatName}
            >
              {collapsed ? (
                <span className="chat-initial">{chat.chatName.charAt(0)}</span>
              ) : (
                <span className="chat-name">
                  {chat.chatName}
                  {chat.messageCount > 0 && (
                    <span className="message-count"> ({chat.messageCount})</span>
                  )}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

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