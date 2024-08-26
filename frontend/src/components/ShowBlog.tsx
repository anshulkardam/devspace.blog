import { blogType } from "../hooks/useBlog"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import parse from 'html-react-parser';

export const ShowBlog = ({ blog }: { blog: blogType }) => {
    const formatDate = (isoDateString: string): string => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
      };
    console.log("anshul",blog)
    return <div>
        <Appbar name={blog.author.firstName}/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 w-full max-w-screen-2xl pt-12 px-10">
                <div className=" col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-600 pt-3">
                    {formatDate(blog.createdAt)}
                    </div>
                    <div className="tiptap">
                        {parse(blog.content)}
                    </div>
                </div>
                <div className=" col-span-4">
                    <div className="font-semibold text-lg text-slate-700">
                        Author
                    </div>
                    <div className="flex items-center pt-3">
                        <div className="flex-col ">
                            <Avatar name={blog.author.firstName} />
                        </div>
                        <div className="text-2xl font-bold pl-2">
                            {blog.author.firstName} {blog.author.lastName}
                        </div>
                    </div>
                    <div className="pt-1 text-slate-600">
                        {blog.author.bio}
                    </div>
                </div>

            </div>
        </div>
    </div>
}