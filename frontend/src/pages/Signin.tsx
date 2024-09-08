import { Quotes } from "../components/Quotes"
import { Auth } from "./Auth"


export const Signin = () => {
    return <div >
        <div className="grid grid-cols-10">
            <div className="col-span-10 lg:col-span-6 bg-sky-50 min-h-screen"> 
                <Auth type="signin" />
            </div>
            <div className="invisible lg:visible col-span-10 lg:col-span-4">
                <Quotes />
            </div>
        </div>
    </div>
}