import { blogType } from "../hooks/useBlog";
import { Appbar } from "./Appbar";
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

    return (
        <div>
            <Appbar name={blog.author.firstName} />
            <div className="flex justify-center px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12 w-full max-w-screen-2xl pt-12">
                    <div className="lg:col-span-8">
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-600 text-sm sm:text-sm lg:text-base">
                            {formatDate(blog.createdAt)}
                        </div>
                        <div className="tiptap mt-6 font-nunito mb-10">
                            {parse(blog.content)}
                        </div>
                    </div>
                    <div className="lg:col-span-4">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 lg:p-6">
                            <div className="text-center font-bold text-xl sm:text-2xl lg:text-3xl text-slate-700">
                                About the Author
                            </div>
                            <div className="flex items-center mt-4">
                              
                                <div>
                                    <div className="text-lg sm:text-xl font-semibold text-gray-800">
                                        {blog.author.firstName} {blog.author.lastName}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2 text-slate-600 text-sm sm:text-base lg:text-lg font-nunito">
                                {blog.author.bio}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
