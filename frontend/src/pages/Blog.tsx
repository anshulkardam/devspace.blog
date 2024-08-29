import { useParams } from "react-router-dom";
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
    return <div>
    
    {blog ? <ShowBlog blog={blog} /> : <div>No blog data available.</div>}
    
    </div>
}