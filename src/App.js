import { Routes, Route } from "react-router-dom";
import CryptoConverter from "./components/CryptoConverter";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/converter" element={<CryptoConverter />} />
      </Routes>
    </div>
  );
}

export default App;
