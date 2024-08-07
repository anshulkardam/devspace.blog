import TipTap from "./Tiptap"
import '../App.css'
import { useState } from "react"
import { ShowPost } from "./ShowPost"
const NewPost = () => {
    const [show,setShow] = useState("")
    const handleEditorContentSave = (json:any) => {
        
        setShow(json)
       
    }
    
    return <div>
        <TipTap sendData={handleEditorContentSave} />
        <ShowPost content ={ show } />
    </div>
}

export default NewPost