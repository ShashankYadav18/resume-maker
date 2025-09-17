import { useState } from "react";
import api from "../services/api";

export default function Builder() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  const handleSave = async () => {
    const res = await api.post("/resumes", {
      title,
      data: { name }
    });
    alert("Resume saved! ID: " + res.data._id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl">Resume Builder</h1>
      <input
        className="border p-2 m-2"
        placeholder="Resume Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 m-2"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Resume
      </button>
    </div>
  );
}
