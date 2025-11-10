export default function TypeBox({placeholder = "Type your message...", onSend}) {
  
  function handleSend() {
    console.log("Send button clicked");
    onSend("USER: " + document.getElementById("inputArea").value);
    document.getElementById("inputArea").value = "";
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className="type-box">  
      <input
        id="inputArea"
        className="input-area"
        type="text"
        placeholder={placeholder}
        maxLength={150}
        onKeyDown={handleKeyDown}
      />
      <button className="send-button" onClick={handleSend}>Send</button>
    </div>
  );
}
