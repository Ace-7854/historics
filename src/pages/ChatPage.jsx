import TypeBox from "../assets/elements/TypeBox.jsx"; 
import Navbar from "../assets/elements/Navbar.jsx"; // ✅ corrected path

export default function ChatPage() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Left sidebar */}
            <Navbar />

            {/* Main chat area */}
            <div style={{ flex: 1, backgroundColor: "#343541", color: "white" }}>
                <TypeBox />
            </div>
        </div>
    );
}
