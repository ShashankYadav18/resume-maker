import { BrowserRouter, Routes, Route } from "react-router-dom";
import Builder from "./pages/form";
import Preview from "./pages/preview";
import Home from "./pages/home";
import Search from "./pages/search";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/search" element={<Search />} />
        <Route path="/preview/:id" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}
