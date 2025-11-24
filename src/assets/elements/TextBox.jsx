//Displays List of chat messages inside a scrolling text area
export default function TextBox({ messages = ["SYSTEM: Welcome to the chatbot"] }) {
  return (
    <div className="text-area">
      {/*Loops through messages and Renders each one as a paragraph*/}
      {messages.map((msg, index) => (
        <p key={index} className="message">{msg}</p>
      ))}
    </div>
  );
}
