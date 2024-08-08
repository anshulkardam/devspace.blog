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
    const [title,setTitle] = useState("")
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
    },{
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
      }}/>
      <div className='font-medium text-xl block'>
        Content
      </div>
      <div className='w-3/4 pt-2 pb-2'>
        <div>
          <div className="rounded-xl flex flex-wrap bg-gray-700 py-1 px-2 gap-2 text-white">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active' : ''}
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
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
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
            className={editor.isActive('strike') ? 'is-active' : ''}
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
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            Code
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
          >
            H4
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
          >
            H5
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
          >
            H6
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            Ordered list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            Code block
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            Blockquote
          </button>
          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
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

      <div>
        
        <div className=' border border-gray-400 w-3/4 min-h-96'>
          <EditorContent editor={editor} className='' />
        </div>
            
      </div>
      <button onClick={handleEditorContent} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-16 py-4 text-center me-2 mb-2 mt-4">Create Story</button>
    </div>
  )
}

export default TipTap