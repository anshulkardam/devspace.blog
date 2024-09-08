import { Link } from "react-router-dom"
import { SignUp } from "../components/SignUp"
import { Signin } from "../components/SignIn"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {

    return (
        <div className="h-screen flex justify-center items-center"> 
            <div className="bg-white shadow-md border rounded-lg p-6 max-w-md w-full">  
                <div className="font-bold text-4xl text-center"> 
                    {type === "signup" ? "Create an account" : "Welcome Back."}
                </div>
                <div className="text-slate-500 text-center pt-1">
                    {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                    <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
                        {type === "signup" ? "Login" : "Signup"}
                    </Link>
                </div>
                <div className="pt-8 pb-2">
                    {type === "signup" ? <SignUp /> : <Signin />}
                </div>
            </div>
        </div>
    )
}
