import { useState } from "react";
import Appbar from "../components/Appbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="p-8 w-full ">
        <div className="mb-4">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Title"
            className="w-full text-4xl font-serif text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex items-start space-x-3 border">
          <textarea
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="Tell your story..."
            className="outline-none w-full text-lg font-serif text-gray-700 placeholder-gray-400 resize-none focus:outline-none"
            rows={10}
          ></textarea>
        </div>
        <button
          onClick={async () => {
            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                { title, content },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );

              const id = response.data.id;

              navigate(`/blog/${id}`); // Redirect to the new blog page
              toast.success("Blog Published");
            } catch (error) {
              console.error("Error creating blog:", error);
              alert("Failed to create the blog. Please try again.");
            }
          }}
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2"
        >
          Add
        </button>
      </div>
    </div>
  );
};
