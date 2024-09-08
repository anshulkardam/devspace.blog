import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import '../App.css'
import { SetStateAction, useState } from 'react'
import { InputTitle } from './InputTitle'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
const extensions = [
  StarterKit,
  Underline
]
const content = ``
const TipTap = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const editor = useEditor({
    extensions,
    content
  })
  if (!editor) {
    return null
  }
  const handleEditorContent = () => {

    const desc = editor.getHTML()
    axios.post(`${BACKEND_URL}/api/v1/blog`, {
      title,
      content: desc
    }, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      console.log('Data sent successfully:', response.data);
      const responseData = response.data;
      navigate(`/blog/${responseData.id}`)
    })


  }

  return (
    <div className="">
      <InputTitle onChange={(e: { target: { value: SetStateAction<string> } }) => {
        setTitle(e.target.value)
      }} />
      <div className='text-center font-medium text-xl block'>
        Content
      </div>
      <div className=' pt-2 pb-2 w-full sticky top-[60px] z-[999]'>
        <div className=''>
        <div className=" rounded-xl flex flex-wrap justify-center bg-gray-700 py-1 px-2 gap-4 text-white"> 
           <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .toggleBold()
                  .run()
              }
              className={`px-1 py-1 font-semibold rounded-md text-white transition duration-200 ease-in-out
              ${editor.isActive('bold') ? 'bg-black border-gray-400' : 'hover:bg-gray-600 hover:border-gray-400'}
              `}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .toggleItalic()
                  .run()
              }
              className={`px-1 italic py-1 rounded-md text-white transition duration-200 ease-in-out
              ${editor.isActive('italic') ? 'bg-black border-gray-400' : 'hover:bg-gray-600 hover:border-gray-400'}
              `}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`px-1 py-1 underline rounded-md text-white transition duration-200 ease-in-out
                ${editor.isActive('underline') ? 'bg-black border-gray-400' : 'hover:bg-gray-600 hover:border-gray-400'}
                `}
            >
              Underline
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .toggleStrike()
                  .run()
              }
              className={`px-1 py-1 rounded-md text-white transition duration-200 ease-in-out
                ${editor.isActive('strike') ? 'bg-black border-gray-400' : 'hover:bg-gray-600 hover:border-gray-400'}
                `}
              
            >
              Strike
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .toggleCode()
                  .run()
              }
              className={`px-1 py-1 rounded-md text-white transition duration-200 ease-in-out
                ${editor.isActive('code') ? 'bg-black border-gray-400' : 'hover:bg-gray-600 hover:border-gray-400'}
                `}
            
            >
              Code
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`px-1 py-1 rounded-md text-white transition duration-200 ease-in-out
                ${editor.isActive('heading', { level: 1 }) ? 'bg-black border-gray-400' : 'hover:bg-gray-600 hover:border-gray-400'}
                `}
             
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-1 py-1 rounded-md text-white transition duration-200 ease-in-out
                ${editor.isActive('heading', { level: 2 }) ? 'bg-black border-gray-400' : 'hover:bg-gray-600 hover:border-gray-400'}
                `}
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`px-1 py-1 rounded-md text-white transition duration-200 ease-in-out
                ${editor.isActive('heading', { level: 3 }) ? 'bg-black border-gray-400' : 'hover:bg-gray-600 hover:border-gray-400'}
                `}
            >
              H3
            </button>
           
            
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-1 py-1 rounded-md text-white transition duration-200 ease-in-out
                ${editor.isActive('bulletList') ? 'bg-black border-gray-400' : 'hover:bg-gray-600 hover:border-gray-400'}
                `}
            
            >
              Bullets
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-1 py-1 rounded-md text-white transition duration-200 ease-in-out
                ${editor.isActive('orderedList') ? 'bg-black border-gray-400' : 'hover:bg-gray-600 hover:border-gray-400'}
                `}
            
            >
              List
            </button>
           
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`px-1 py-1 rounded-md text-white transition duration-200 ease-in-out
                ${editor.isActive('blockquote') ? 'bg-black border-gray-400' : 'hover:bg-gray-600 hover:border-gray-400'}
                `}
           
            >
              Blockquote
            </button>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
              >
              Horizontal rule
            </button>
            <button onClick={() => editor.chain().focus().clearNodes().run()}>
              Clear/Reset
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .undo()
                  .run()
              }
            >
              Undo
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .redo()
                  .run()
              }
            >
              Redo
            </button>
          </div>
        </div>
      </div>

      <div className='min-w-6'>

        <div className='w-full border border-gray-400 min-h-svh'>
          <EditorContent editor={editor} className='p-2 font-nunito' />
        </div>

      </div>
      <button onClick={handleEditorContent} className="text-white w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-16 py-4 text-center me-2 mb-2 mt-4">Create Story</button>
    </div>
  )
}

export default TipTap