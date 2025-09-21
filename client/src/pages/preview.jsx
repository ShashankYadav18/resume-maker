import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Preview() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    async function fetchResume() {
      try {
        const res = await api.get(`/resumes/${id}`);
        setResume(res.data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    }
    if (id) fetchResume();
  }, [id]);

  if (!resume) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">{resume.title}</h1>
      <div className="bg-white border rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{resume.data?.name}</h2>
        <p className="text-gray-600">Resume preview content goes here...</p>
      </div>
      <button 
        onClick={() => window.print()} 
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
}