import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Blog } from "./pages/Blog";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import { UpdateBlog } from "./components/UpdateBlog";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>

          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="blog/:id" element={<Blog />} />
          <Route path="/" element={<Blogs />} />
          <Route path="publish" element={<Publish />} />
          <Route path="/blog/update/:id" element={<UpdateBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
