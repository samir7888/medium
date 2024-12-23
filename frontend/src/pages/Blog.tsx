
import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';

import { Fullblog } from '../components/Fullblog';
import { BlogSkeleton } from '../components/BlogSkeleton';
import Appbar from '../components/Appbar';
export const Blog = () => {
  const { id }  = useParams()
  const {loading , blog } = useBlog({
     id : id  || ""
    });
  return (
    <div>
      <Appbar />
      {loading && <BlogSkeleton />}
      <div>
      
      <Fullblog blog={blog} />
      </div>
    </div>
  )
}
