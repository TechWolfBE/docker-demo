import { useCallback, useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const submitMessage = useCallback((message) => {
    console.log("message", message);
    fetch("http://localhost:5678/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    }).then(() => {
      // Refetch the data after submitting a message
      fetch("http://localhost:5678/api/data")
        .then((res) => res.json())
        .then(setData);
    });
  });

  useEffect(() => {
    fetch("http://localhost:5678/api/data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {data.map(([id, message]) => (
          <li key={id}>{message}</li>
        ))}
      </ul>
      <form>
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitMessage(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            const input = document.querySelector("input[type='text']");
            submitMessage(input.value);
            input.value = "";
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
