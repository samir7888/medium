import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import { BlogSkeleton } from "./BlogSkeleton";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const Fullblog = ({ blog }: { blog: Blog | null }) => {
  const [data, setData] = useState<string>("");
  async function getSummorize(content: string): Promise<string> {
    if (!import.meta.env.VITE_API_KEY) {
      throw new Error("VITE_API_KEY is not defined");
    }
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Summarize the following text: ${content}`;

    const result = await model.generateContent(prompt);
    const data = await result.response.text();
    console.log(data);
    return data;
  }
  if (!blog) {
    return (
      <div>
        <div className="flex justify-center pt-12">
          <BlogSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex justify-center ">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl ">
          <div className="col-span-8 font-extrabold">
            <div>{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 2nd dec 2034</div>
            <div className="pt-4 "> {blog.content}</div>
          </div>
          <div className=" col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name} />
              </div>
              <div>
                <div className="text-xl font-bold">{blog.author.name}</div>
                <div className="pt-2 text-slate-500">
                  Lorem ipsum dolor sit amet consectetur ad!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to={`/blog/update/${blog.id}`}>
        <button className="bg-blue-800 text-white ml-5 rounded-xl px-3 py-2">
          update
        </button>
      </Link>
      <button
        onClick={async () => {
          const blogData = await getSummorize(blog.content);
          setData(blogData);
        }}
        className="bg-green-800 text-white ml-5 rounded-xl px-3 py-2"
      >
        summarize
      </button>
      <div
        className="container mx-auto p-5 bg-gray-100 mt-5 rounded-xl w-3/4
      "
      >
        {data}
      </div>
    </div>
  );
};
