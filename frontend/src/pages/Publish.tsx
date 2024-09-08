
import '../App.css'
import { Appbar } from "../components/Appbar"
import TipTap from "../components/Tiptap"
export const Publish = () => {
  return <div>
            <Appbar name="A" />
            <div className="flex justify-center pt-5 ">
            <TipTap />
            </div>
    </div>
}