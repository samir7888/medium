import { Link } from "react-router-dom";

interface BlogCard {
  id:string,
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-400"></div>;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCard) => {
  return <Link to={`/blog/${id}`}>
   
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-lg">
      <div className="flex">
        <Avatar name={authorName} />

        <div className="font-medium capitalize pl-2 text-sm flex justify-center flex-col">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
          <Circle />
        </div>

        <div className="font-extralight pl-2 flex justify-center flex-col">
          {publishedDate}
        </div>
      </div>

      <div className="text-2xl  font-bold pt-2">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className="text-slate-500 text-sm font-thin">{`${Math.ceil(
        content.length / 100
      )} minute(s) read`}</div>
      {/* <div className="bg-slate-300  h-1 w-full"></div> */}
    </div>
  
  </Link>
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "big" | "small";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-6 h-6" : "w-8 h-8"
      } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span
        className={`font-medium  ${
          size === "small" ? "text-xs" : "text-md"
        }  text-gray-600 dark:text-gray-300`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
