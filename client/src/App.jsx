import { BrowserRouter, Routes, Route } from "react-router-dom";
import Builder from "./pages/builder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
}
