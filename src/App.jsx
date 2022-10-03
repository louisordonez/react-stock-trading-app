import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Books from './components/Books';
import { axiosGet } from './services/utils/axios';

function App() {
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosGet().then((items) => {
      setBooks(items.data);
    });
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h1>Hello</h1>
      <Books books={books}></Books>
    </div>
  );
}

export default App;
