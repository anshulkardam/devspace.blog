import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

interface blogsType {
    "content": string
    "title": string
    "id": string
    "author": {
        "firstName": string
        "lastName": string
    }

}

export const useBlogs = () => {

    const [loading, setLoading] = useState(false)
    const [blogs, setBlogs] = useState<blogsType[]>([])
    useEffect(() => {
        async function get(){
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            setBlogs(response.data)
        }
        get();
    },[])
return { loading, blogs }

}