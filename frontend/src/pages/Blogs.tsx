import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const navigate = useNavigate();
  const { loading, blogs } = useBlogs();
  if (!localStorage.getItem("token")) {
    navigate('/signin')
  }
  return (
    <div className="flex justify-center flex-col items-center">
      <Appbar />

      {loading && <BlogSkeleton />}
      <div className="flex flex-col justify-center w-full md:px-10">
        {blogs.map((blog) => {
          return (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd dec 2025"}
            />
          );
        })}
      </div>
    </div>
  );
};
