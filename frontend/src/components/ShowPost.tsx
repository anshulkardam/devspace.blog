import parse from 'html-react-parser';
import '../App.css'
export const ShowPost = ({ content }: { content: any }) => {
    console.log(content)
    return <div className='tiptap'>
        {parse(content)}
    </div>
}