import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Clipboard, Trash2 } from "lucide-react";

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fetchUrls = async () => {
    try {
      const res = await axios.get("/api/shorturls");
      setShortUrls(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/shorturls", JSON.stringify(originalUrl), {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Твій URL успішно скорочено!");
      setMessageType("success");
      setOriginalUrl("");
      fetchUrls();
      setTimeout(() => setMessage(""), 1500);
    } catch (err) {
      setMessage("Ой, сталася помилка при створенні шорт-ссилки.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 1500);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/shorturls/${id}`);
      setMessage("URL успішно видалено!");
      setMessageType("success");
      fetchUrls();
      setTimeout(() => setMessage(""), 1500);
    } catch (err) {
      setMessage("Помилка при видаленні URL.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 1500);
    }
  };

  const copyToClipboard = (shortCode) => {
    const url = `https://localhost:7172/${shortCode}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setMessage("URL успішно скопійовано!");
        setMessageType("success");
        setTimeout(() => setMessage(""), 1500);
      },
      (err) => {
        setMessage("Помилка при копіюванні.");
        setMessageType("error");
        setTimeout(() => setMessage(""), 1500);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">URL Shortener</h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            className="border rounded w-full p-3 mb-2 text-gray-800"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter full URL"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded w-full"
          >
            🚀 Shorten
          </button>
        </form>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-center font-semibold ${messageType === "success" ? "bg-green-500" : "bg-red-500"} text-white`}
          >
            {message}
          </div>
        )}

        {shortUrls.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="p-2 border">Original</th>
                  <th className="p-2 border">Shortened</th>
                  <th className="p-2 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shortUrls.map((url) => (
                  <tr key={url.id} className="hover:bg-gray-100">
                    <td className="p-2 border text-sm text-gray-800 break-all">{url.originalUrl}</td>
                    <td className="p-2 border text-blue-600 underline">
                      <a
                        href={`https://localhost:7172/${url.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url.shortCode}
                      </a>
                    </td>
                    <td className="p-2 border text-center space-x-2">
                      <button
                        onClick={() => copyToClipboard(url.shortCode)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        <Clipboard size={18} />
                        Copy
                      </button>
                      <button
                        onClick={() => handleDelete(url.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No shortened URLs yet 😌</p>
        )}
      </div>
    </div>
  );
}
