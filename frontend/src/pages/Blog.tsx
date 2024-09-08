import { Link, useParams } from "react-router-dom";
import { ShowBlog } from "../components/ShowBlog";
import { useBlog } from "../hooks/useBlog"
import { Spinner } from "../components/Spinner";


export const Blog = () => {
    const { id } = useParams()
    const { loading, blog } = useBlog({ id: id || "" });
    console.log(blog)
    if (!loading) {
        return <div>

            <div className="flex flex-col h-screen justify-center">
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return <div className="bg-sky-50 min-h-screen">

        {blog ? <ShowBlog blog={blog} /> : <div>No blog data available.</div>}

        
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Story Sphere. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link to={'/'} className="text-xs hover:underline underline-offset-4" >
                    Terms of Service
                </Link>
                <Link to={'/'} className="text-xs hover:underline underline-offset-4" >
                    Privacy
                </Link>
            </nav>
        </footer>
    </div>
}