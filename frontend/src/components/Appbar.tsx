import { Link } from "react-router-dom"

export const Appbar = ({name} : {name: string}) => {
    return <div className="flex justify-between items-center border-b px-10 py-3  ">
        <Link to={"/blogs"}>
        <div className="text-3xl font-serif cursor-pointer items-center gap-2 font-extrabold flex">
            StorySphere
            <img src="/globe.png" className="w-11 h-11" />
        </div>
        </Link>
        <div className="flex">
        <div className="pr-10">
            <Link to={"/publish"}>
            <PostButton />
            </Link>
        </div>
        <div className="pt-1">
            <UserButton name={name} />
        </div>
        </div>
    </div>
}

function UserButton({ name }: { name: string }) {
    return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
}

function PostButton() {
    return <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-xl text-sm px-4 py-2.5 text-center me-4">Create New</button>
}