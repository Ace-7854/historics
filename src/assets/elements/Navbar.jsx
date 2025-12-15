import { Plus, Search, MoreVertical, Edit2 } from "lucide-react"; // ADD Edit2
import { Link } from "react-router-dom";
import { useState } from "react";
import { useChat } from "../../context/chatContext.jsx";
import RenameModal from "./RenameModal.jsx"; // ADD THIS

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(null); // Track which chat's menu is open
  const [renameModalOpen, setRenameModalOpen] = useState(false); // ADD THIS
  const [chatToRename, setChatToRename] = useState(null); // ADD THIS
  
  const { chats, currentChatId, loadChat, createChat, username, renameChat } = useChat();

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
    setShowMenu(null); // Close menu when switching chats
  }

  // ADD THIS FUNCTION
  function handleRenameClick(chat, e) {
    e.stopPropagation(); // Prevent chat selection
    setChatToRename(chat);
    setRenameModalOpen(true);
    setShowMenu(null); // Close menu
  }

  // ADD THIS FUNCTION
  async function handleRename(newName) {
    if (chatToRename) {
      const success = await renameChat(chatToRename.chatId, newName);
      if (success) {
        console.log(`Renamed chat to: ${newName}`);
      } else {
        alert("Failed to rename chat");
      }
    }
  }

  // ADD THIS FUNCTION
  function toggleMenu(chatId, e) {
    e.stopPropagation(); // Prevent chat selection
    setShowMenu(showMenu === chatId ? null : chatId);
  }

  // Render a single chat item
  function renderChatItem(chat, index) {
    const isActive = chat.chatId === currentChatId;
    const menuOpen = showMenu === chat.chatId;

    return (
      <div key={chat.chatId} className="chat-item-wrapper">
        <button
          className={`chat-item ${isActive ? 'active' : ''}`}
          onClick={() => handleChatClick(chat.chatId)}
          title={chat.chatName}
        >
          {collapsed ? (
            <span className="chat-initial">{chat.chatName.charAt(0)}</span>
          ) : (
            <>
              <span className="chat-name">
                {chat.chatName}
                {chat.messageCount > 0 && (
                  <span className="message-count"> ({chat.messageCount})</span>
                )}
              </span>
              <button
                className="chat-menu-btn"
                onClick={(e) => toggleMenu(chat.chatId, e)}
                title="Options"
              >
                <MoreVertical size={16} />
              </button>
            </>
          )}
        </button>

        {menuOpen && !collapsed && (
          <div className="chat-menu">
            <button
              className="chat-menu-item"
              onClick={(e) => handleRenameClick(chat, e)}
            >
              <Edit2 size={14} />
              <span>Rename</span>
            </button>
            {/* Add more menu items here later (delete, share, etc.) */}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
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
                .map((chat, index) => renderChatItem(chat, index))}
            </div>
          </div>
        )}

        {!showSearch && (
          <div className="navbar-chats">
            {chats.length === 0 && !collapsed && (
              <p className="no-chats-message">No chats yet. Create one!</p>
            )}
            {chats.map((chat, index) => renderChatItem(chat, index))}
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

      {/* ADD RENAME MODAL */}
      <RenameModal
        isOpen={renameModalOpen}
        currentName={chatToRename?.chatName || ""}
        onRename={handleRename}
        onClose={() => {
          setRenameModalOpen(false);
          setChatToRename(null);
        }}
      />
    </>
  );
}