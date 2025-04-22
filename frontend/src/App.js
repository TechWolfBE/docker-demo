import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5678/api/data')
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
    </div>
  );
}

export default App;
