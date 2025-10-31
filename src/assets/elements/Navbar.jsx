import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li className = "navitem"><Link to="/">Home</Link></li>
                <li className = "navitem"><Link to="/chat">Chat</Link></li>
            </ul>
        </nav>
    );
}