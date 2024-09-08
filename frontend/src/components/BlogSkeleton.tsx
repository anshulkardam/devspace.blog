export const BlogSkeleton = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
           <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow animate-pulse">
                <div className="flex flex-col space-y-3">
                  <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-5/6"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-4/6"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-3/6"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {/* User Profile Skeleton */}
            <div className="bg-white rounded-lg p-4 shadow animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-full w-24"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-32"></div>
                </div>
              </div>
              <div className="mt-4 h-10 bg-gray-200 rounded"></div>
            </div>

            {/* Popular Tags Skeleton */}
            <div className="bg-white rounded-lg p-4 shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded-full w-32 mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="h-6 bg-gray-200 rounded-full w-16"></div>
                ))}
              </div>
            </div>

            {/* Featured Stories Skeleton */}
            <div className="bg-white rounded-lg p-4 shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded-full w-40 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded-full w-4/6"></div>
                <div className="h-3 bg-gray-200 rounded-full w-3/6"></div>
              </div>
            </div>

            {/* Reading Time Estimator Skeleton */}
            <div className="bg-white rounded-lg p-4 shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded-full w-16"></div>
              </div>
            </div>

            {/* Random Story Skeleton */}
            <div className="bg-white rounded-lg p-4 shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded-full w-40 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            {/* Newsletter Subscription Skeleton */}
            <div className="bg-white rounded-lg p-4 shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}