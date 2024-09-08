import { Link } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Avatar, BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks/useBlogs"
import { Button } from "flowbite-react"
import { Clock, Shuffle } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Blogs = () => {
    const { loading, blogs } = useBlogs()
    if (!loading) {
        return <div>
            <Appbar name='A' />
            <BlogSkeleton />

        </div>
    }
   
        const notify = () => toast.info("Subscribed!");
        const notifysoon = () => toast.info("coming soon!");

    const formatDate = (isoDateString: string): string => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };


    return (
        <div className="bg-sky-50 min-h-screen">
            <Appbar name="A" />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-2">
                        {blogs.map(c =>
                            <BlogCard id={c.id}
                                key={c.id}
                                authorName={c.author.firstName}
                                title={c.title}
                                content={c.content}
                                PublishedDate={formatDate(c.createdAt)} />
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-4 shadow">
                            <div className="flex items-center space-x-4">
                                <Avatar name="A" />
                                <div>
                                    <h3 className="font-semibold">Welcome, User!</h3>
                                    <p className="text-sm text-gray-600">You have written 0 stories</p>
                                </div>
                            </div>
                            <Link to={'/publish'} >
                                <Button color="dark" className="w-full mt-4 py-1.5">Write a New Story</Button>
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow">
                            <h3 className="font-semibold mb-2">Popular Tags</h3>
                            <div onClick={notifysoon} className="cursor-pointer flex flex-wrap gap-2">
                                {["Technology", "Travel", "Food", "Lifestyle", "Health"].map((tag) => (
                                    <span key={tag} className="bg-blue-100 cursor-pointer text-blue-800 px-2 py-1 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <ToastContainer />
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow">
                            <h3 className="font-semibold mb-2">Featured Stories</h3>
                            <ul className="space-y-2">

                                <li className="text-sm hover:underline cursor-pointer text-blue-600">
                                    <Link to={'/blog/aa1ebdb1-a01a-4030-bb9f-7ea6ca471f8d'} >
                                        The Power of Positive Thinking
                                    </Link>
                                </li>
                                <li className="text-sm hover:underline cursor-pointer text-blue-600">
                                    <Link to={'/blog/3278c0ac-9dc0-4f64-8f2e-57a8888eadf7'} >
                                    Understanding JavaScript Promises: A Deep Dive
                                    </Link>
                                </li>
                                <li className="text-sm hover:underline cursor-pointer text-blue-600">
                                    <Link to={'/blog/5e881091-7ed3-49ed-b185-a40445b4cf67'} >
                                        Exploring Tokyo: A 5-Day Adventure Through Japan's Vibrant Capital
                                    </Link>
                                </li>

                            </ul>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow">
                            <h3 className="font-semibold mb-2">Reading Time Estimator</h3>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-600" />
                                <input type="text" placeholder="Word count" className="text-black w-1/2 border-2 border-black rounded-md p-1 font-nunito" />
                                <span className="text-sm">≈ <span className="font-semibold">0</span> min read</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow">
                            <h3 className="font-semibold mb-2 text-center">Discover a Random Story</h3>
                            <Link to={'/blog/3278c0ac-9dc0-4f64-8f2e-57a8888eadf7'} >
                            <Button color="dark" className="w-full py-1">
                                <Shuffle className="w-4 h-4 mr-2" />
                                Random Story
                            </Button>
                            </Link>
                        </div>

                        <div className="  rounded-lg p-4 shadow">
                            <h3 className="font-semibold mb-2">Subscribe to our Newsletter</h3>
                            <form className="space-y-2">
                                <input type="email" placeholder="Enter your email" className="text-black w-full border-2 border-black rounded-md p-1 font-nunito" />
                                <Button onClick={notify} color="dark" className="w-full py-1.5">Subscribe</Button>
                                <ToastContainer />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
    )
}