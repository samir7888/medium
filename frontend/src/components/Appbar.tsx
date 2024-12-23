import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
const Appbar = () => {
  const token = localStorage.getItem("token");
  return (
    <div className=" border-b w-full h-12 flex items-center justify-between px-10">
      <Link to={"/"}>
        <div className="font-bold text-xl cursor-pointer">Medium</div>
      </Link>

      <div className="flex justify-between items-center w-72">
        {token ? (
          <Link to={'/signup'}>
          <button
            className="text-white bg-gray-700 hover:bg-green-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2 text-center me-2 "
            onClick={() => {
              localStorage.clear();
            }}
            >
            Logout
          </button>
            </Link>
        ) :  (<Link to={'/signup'}>
          <button className="text-white bg-black hover:bg-green-800 focus:outline-none   font-medium rounded-full text-sm px-5 py-2 text-center me-2 ">
            signup
          </button></Link>
        )}
        <div className="flex justify-center">
          <Link to={"/publish"}>
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 "
            >
              Publish
            </button>
          </Link>
          <Avatar name="Sameer" size="big" />
        </div>
      </div>
    </div>
  );
};

export default Appbar;
