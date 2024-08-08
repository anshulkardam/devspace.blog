import { useParams } from "react-router-dom";
import { ShowBlog } from "../components/ShowBlog";
import { useBlog } from "../hooks/useBlog"


export const Blog = () => {
    const { id } = useParams()
    const {loading,blog} = useBlog({id : id || ""});
    console.log(blog)
    if (!loading){
        return <div>loading...</div>
    }
    return <div>
        <ShowBlog blog={blog} />
    </div>
}