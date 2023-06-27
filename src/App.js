import "./App.css";
import Nav from "./Nav";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Product Listing Component</h1>} />
          <Route path="/add" element={<h1>Add Product Component</h1>} />
          <Route path="/update" element={<h1>Update Listing Component</h1>} />
          <Route path="/logout" element={<h1>Logout Component</h1>} />
          <Route path="/profile" element={<h1>Profile Component</h1>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
export default App;
