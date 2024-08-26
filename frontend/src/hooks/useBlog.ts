import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"

export interface blogType {
    "content": string
    "title": string
    "createdAt" : any
    "author": {
        "firstName": string
        "lastName": string
        "bio": string
    }

}

export const useBlog = ({id} : {id: string}) => {

    const [loading, setLoading] = useState(false)
    const [blog, setBlog] = useState<blogType[]>([])
    useEffect(() => {
        async function get(){
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            setBlog(response.data.find)
            setLoading(true)
        }
        get();
    },[])
return { loading, blog }

}