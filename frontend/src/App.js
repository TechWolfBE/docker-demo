import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(() => {
    setLoading(true);
    fetch("http://localhost:5678/api/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
        setLoading(false);
      });
  }, []);

  const submitMessage = useCallback(
    (message) => {
      if (!message.trim()) return;

      fetch("http://localhost:5678/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      })
        .then(() => {
          fetchMessages();
          setNewMessage("");
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    },
    [fetchMessages]
  );

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMessage(newMessage);
  };

  return (
    <div className="app-container">
      <div className="message-app">
        <header className="app-header">
          <h1>Message Board</h1>
        </header>

        <div className="messages-container">
          {loading && (
            <div className="loading-indicator">Loading messages...</div>
          )}

          {!loading && data.length === 0 && (
            <div className="empty-state">
              No messages yet. Start the conversation!
            </div>
          )}

          {data.map(([id, message]) => (
            <div key={id} className="message-bubble">
              <p>{message}</p>
            </div>
          ))}
        </div>

        <form className="message-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
