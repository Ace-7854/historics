export default function TypeBox() {
  return (
    <div className="type-box">
      <input
        className="input-area"
        type="text"
        placeholder="Type your message..."
        maxLength={150}
      />
      <button className="send-button">Send</button>
    </div>
  );
}
