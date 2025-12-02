//Displays List of chat messages inside a scrolling text area
// export default function TextBox({ messages = ["SYSTEM: Welcome to the chatbot"] }) {
//   return (
//     <div className="text-area">
//       {/*Loops through messages and Renders each one as a paragraph*/}
//       {messages.map((msg, index) => (
//         <p key={index} className="message">{msg}</p>
//       ))}
//     </div>
//   );
// }

export default function TextBox({ messages, loading }) {
    return (
        <div className="text-area">
            {messages.map((msg, index) => (
                <div key={index} className={`message`}>
                    {msg.text}
                </div>
            ))}

            {loading && (
                <div className="message">
                    Typing...
                </div>
            )}
        </div>
    );
}
