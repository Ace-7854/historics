export default function TextBox({ messages = ["SYSTEM: Welcome to the chatbot"] }) {
  return (
    <div className="text-area">
      {messages.map((msg, index) => (
        <p key={index} className="message">{msg}</p>
      ))}
    </div>
  );
}
