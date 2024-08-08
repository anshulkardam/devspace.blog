export const BlogSkeleton = () => {
    return (
      <div className="flex pl-96 w-full pt-6">
        <div className="w-full max-w-screen-lg">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-center">
              <div role="status" className="w-full animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full w-52 max-w-4xl mb-1"></div>
              </div>
            </div>
            <div className="font-bold pt-1 text-2xl cursor-pointer">
              <div role="status" className="w-full animate-pulse">
                <div className="h-4 bg-gray-200 rounded-full w-[50%] max-w-4xl"></div>
              </div>
            </div>
            <div className="text-base">
              <div role="status" className="w-full animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full w-[70%] max-w-4xl"></div>
              </div>
            </div>
            <div className="text-sm font-light pt-3">
              <div role="status" className="w-full animate-pulse">
                <div className="h-2 bg-gray-200 rounded-full w-36 max-w-4xl mb-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  