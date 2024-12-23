import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface Blog {
  id: string;
  title: string;
  content: string;
}

export const UpdateBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Blog ID from route
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  console.log(title);
  useEffect(() => {
    // Fetch current blog details
    const fetchBlog = async () => {
      try {
        const response = await axios.get<Blog>(
          `${BACKEND_URL}/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token") || "", // JWT token
            },
          }
        );
        console.log(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        setError("Failed to load blog details" + err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e: FormEvent) => {
    console.log(id);
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log({
        id,
        title,
        content,
      });

      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog/${id}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "", // JWT token
          },
        }
      );

      alert(response.data.msg); // Show success message
      navigate(`/blog/${id}`); // Redirect back to the blog details page
    } catch (err) {
      setError("you cannot update other blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Update Blog
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 font-bold text-white rounded-lg shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};
