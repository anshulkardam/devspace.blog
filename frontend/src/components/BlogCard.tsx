import { Link } from "react-router-dom"

interface BlogCardProps {
    id: string
    authorName: string
    title: string
    content: string
    PublishedDate: string
}
export const BlogCard = ({id, authorName, title, content, PublishedDate }: BlogCardProps) => {

    return <div >
        <div className="flex w-screen max-w-screen-lg ">
            <div className="flex flex-col justify-center">
                <Avatar name={authorName} />
            </div>
            <div className="font-semibold pl-2">
                {authorName}
            </div>
            <div className="flex flex-col justify-center">
                <div className=" pl-2">
                    &#8226;
                </div>
            </div>
            <div className="pl-2 text-slate-500">
                {PublishedDate}
            </div>
        </div>
        <div className="font-bold pt-1 text-2xl cursor-pointer">
            <Link to={`/blog/${id}`}>
            {title}
            </Link>
        </div>
        <div className="text-base">
            {content.slice(0, 100) + "..."}
        </div>
        <div className="text-sm font-light pt-2">
            {`${Math.ceil(content.length / 100)} minutes read`}
        </div>
        <div className="border bottom-1 mt-2 mb-2"></div>
    </div>
}

 export function Avatar({ name }: { name: string }) {
    return <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>

}