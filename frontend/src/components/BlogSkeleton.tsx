


export const BlogSkeleton = () => {
  return (
    <div className="animate-pulse w-full space-y-4">
      {/* Repeat this block for multiple skeleton cards */}
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-white p-4 shadow rounded-md border w-full border-gray-300"
        >
          <div className="flex items-center space-x-4">
            {/* User Icon */}
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              {/* Author Name */}
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              {/* Date */}
              <div className="h-3 bg-gray-200 rounded w-20 mt-1"></div>
            </div>
          </div>
          {/* Title */}
          <div className="mt-4 h-6 bg-gray-300 rounded w-3/4"></div>
          {/* Description */}
          <div className="mt-2 h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
};


