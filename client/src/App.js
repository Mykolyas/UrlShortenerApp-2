import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // Тип повідомлення

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
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage("Твій URL успішно скорочено!"); // Оновлене повідомлення
      setMessageType("success");
      setOriginalUrl("");
      fetchUrls();
      setTimeout(() => setMessage(""), 1000); // Повідомлення зникає через 1 секунду
    } catch (err) {
      setMessage("Ой, сталася помилка при створенні шорт-ссилки.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 1000); // Повідомлення зникає через 1 секунду
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/shorturls/${id}`);
      setMessage("URL успішно видалено!");
      setMessageType("success");
      fetchUrls();
      setTimeout(() => setMessage(""), 1000); // Повідомлення зникає через 1 секунду
    } catch (err) {
      setMessage("Помилка при видаленні URL.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 1000); // Повідомлення зникає через 1 секунду
    }
  };

  // Функція для копіювання URL в буфер
  const copyToClipboard = (shortCode) => {
    const url = `https://localhost:7172/${shortCode}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setMessage("URL успішно скопійовано!");
        setMessageType("success");
        setTimeout(() => setMessage(""), 1000); // Повідомлення зникає через 1 секунду
      },
      (err) => {
        setMessage("Помилка при копіюванні.");
        setMessageType("error");
        console.error("Помилка при копіюванні:", err);
        setTimeout(() => setMessage(""), 1000); // Повідомлення зникає через 1 секунду
      }
    );
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          className="border rounded w-full p-2 mb-2"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Введи повну URL-адресу"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Скоротити
        </button>
      </form>

      {/* Повідомлення */}
      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            messageType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {message}
        </div>
      )}

      <ul>
        {shortUrls.map((url) => (
          <li key={url.id} className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <a
                  href={`https://localhost:7172/${url.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {url.shortCode}
                </a>
                <p className="text-sm text-gray-500">{url.originalUrl}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(url.shortCode)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Копіювати
                </button>
                <button
                  onClick={() => handleDelete(url.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Видалити
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
