export default function TypeBox({placeholder = "Type your message..."}) {
  return (
    <div className="type-box">
      <input
        className="input-area"
        type="text"
        placeholder={placeholder}
        maxLength={150}
      />
      <button className="send-button">Send</button>
    </div>
  );
}
