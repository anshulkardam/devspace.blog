import { Link } from "react-router-dom"
import parse from 'html-react-parser';
interface BlogCardProps {
    id: string
    authorName: string
    title: string
    content: string
    PublishedDate: string
}
export const BlogCard = ({id, authorName, title, content, PublishedDate }: BlogCardProps) => {

    const truncatedContent = content.length > 50 ? content.slice(0, 50) + "..." : content;
   
    return <div className=" border-b p-6 mb-2">
        <div className="flex font-serif">
            <div className="flex flex-col justify-center">
                <Avatar name={authorName} />
            </div>
            <div className="font-bold text-base pl-2">
                {authorName}
            </div>
            <div className="flex flex-col justify-center">
                <div className=" pl-2">
                    &#8226;
                </div>
            </div>
            <div className="pl-2 text-slate-500 font-medium">
                {PublishedDate}
            </div>
        </div>
        <div className="font-bold pt-1 text-2xl cursor-pointer">
            <Link to={`/blog/${id}`}>
            {title}
            </Link>
        </div>
        <div className="text-base font-nunito">
        {parse(truncatedContent)}
        </div>
        <span className="text-sm font-light mt-3  bg-slate-100">
            {`${Math.ceil(content.split(' ').length / 200)} minutes read`}
        </span>
      
    </div>
}

 export function Avatar({ name }: { name: string }) {
    return <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>

}