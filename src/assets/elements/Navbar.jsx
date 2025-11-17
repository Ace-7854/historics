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
        {showSearch && (
          <div className="search-pop-up">
            <input
              type="text"
              placeholder="Search chats..."
              className="search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button className="search-close-btn" onClick={() => setShowSearch(false)}>X</button>
            <div className="table-chats">
              {exampleChats
                .filter((chat) => chat.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((chat, index) => (
                  <button key={index} className="chat-item" onClick={() => console.log(`Selected chat: ${chat}`)}>
                    {chat}
                  </button>
                ))}
            </div>
          </div>
        )}  
      {/*/// Chat List ///*/}
      {!showSearch && (
          <div className="navbar-chats">
              {exampleChats.map((chat, index) => (
                  <button key={index} className="chat-item" onClick={() => console.log(`Selected chat: ${chat}`)}>
                      {chat}
                  </button>
              ))}
          </div>
      )}
      {/*/// Footer ///*/}
        <footer className="navbar-footer">
          <ul>
            <li><Link to="/">Chat</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </footer>
      </aside>
    );
}