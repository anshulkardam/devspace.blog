import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks/useBlogs"

export const Blogs = () => {
    const { loading, blogs } = useBlogs()
    console.log("HIIIIIII", blogs)
    if (!loading) {
        return <div>
            <Appbar name='A' />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    }
    const formatDate = (isoDateString: string): string => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
      };
    return <div>
        <Appbar name="F" />
        <div className="flex justify-center pt-4">
            <div>
                {blogs.map(c =>
                    <BlogCard id={c.id}
                        authorName={c.author.firstName}
                        title={c.title}
                        content={c.content}
                        PublishedDate={formatDate(c.createdAt)} />
                )}

            </div>
        </div>
    </div>
}
