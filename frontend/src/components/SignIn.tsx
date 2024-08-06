import { useState } from "react"
import { InputBox } from "./InputBox"
import { SigninInput } from "@anshulkardam/medium-common"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
export const Signin = () => {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: ""
    })

    async function SendRequest() {
        try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
        const jwt = response.data;
        localStorage.setItem("token", jwt)
        navigate("/blogs")
        } catch(e){
            alert("something went wrong")
        }
    }

    return <div>
        <InputBox label="Email" placeholder="AnshulKardam@example.com" onChange={(e) => {
            setPostInputs(c => ({
                ...c,
                email: e.target.value
            }))
        }} />
        <InputBox label="Password" placeholder="******" type="password" onChange={(e) => {
            setPostInputs(c => ({
                ...c,
                password: e.target.value
            }))
        }} />
        <button onClick={SendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-6">Enter Story Sphere</button>
    </div>

}
