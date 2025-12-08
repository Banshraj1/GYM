// import { useState } from 'react'
import "./App.css";
import Header from "./components/header.jsx";
import { Outlet } from "react-router-dom";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/footer.jsx";
function App() {
  // const [count, setCount] = useState(0)
  return (
    <div className="root">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
