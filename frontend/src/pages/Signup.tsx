import { Quotes } from "../components/Quotes"
import { Auth } from "./Auth"


export const Signup = () => {
    return <div >
        <div className="grid grid-cols-10">
            <div className="col-span-12 lg:col-span-6"> 
                <Auth type="signup" />
            </div>
            <div className="invisible lg:visible col-span-12 lg:col-span-4">
                <Quotes />
            </div>
        </div>
    </div>
}