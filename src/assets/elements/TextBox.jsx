export default function TextBox({ messages = ["SYSTEM: Welcome to the chatbot"] }) {
  return (
    <div className="text-area">
      {messages.map((msg, index) => (
        <div key={index} className="message">{msg}</div>
      ))}
    </div>
  );
}
