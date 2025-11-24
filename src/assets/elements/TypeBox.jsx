// This is a component for text input and Send button
export default function TypeBox({placeholder = "Type your message...", onSend}) {

  // Executed when the send button is clicked
  function handleSend() {
    console.log("Send button clicked");
    
    // "USER" will have to be changed to variable username eventually
    onSend("USER: " + document.getElementById("inputArea").value);
    
    //Resetting the message box to have no value after sending
    document.getElementById("inputArea").value = "";
  }

  // Pressing Enter key is equivalent to pressing Send button (HandleSend() is executed) 
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className="type-box">  
      {/* Text Area for the user's input message*/}
      <input
        id="inputArea"
        className="input-area"
        type="text"
        placeholder={placeholder} 
        maxLength={150} // Input Area only allows 150 characters (Changed in future to allow bigger messages)
        onKeyDown={handleKeyDown} // Allows Enter to send
      />
      <button className="send-button" onClick={handleSend}>Send</button>
    </div>
  );
}
