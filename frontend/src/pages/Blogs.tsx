import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs"

export const Blogs = () => {
    const { loading, blogs } = useBlogs()
    if (!loading) {
        return <div>loading....</div>
    }
    return <div>
        <Appbar name="F" />
        <div className="flex justify-center pt-4">
            <div>
                {blogs.map(c =>
                    <BlogCard id = {c.id}
                              authorName={c.author.firstName}
                              title= {c.title}
                              content= {c.content}
                              PublishedDate="6th AUG"/>
                )}

            </div>
        </div>
    </div>
}
