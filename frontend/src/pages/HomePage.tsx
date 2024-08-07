import { useNavigate } from "react-router-dom"

export const HomePage = ()=> {
    const navigate = useNavigate()
    return <div> 
    <div>HELLO FROM HOMEPAGE</div>
    <button onClick={() =>{
        navigate("/signup")
    }}>Go to Signup</button>
    </div>
}