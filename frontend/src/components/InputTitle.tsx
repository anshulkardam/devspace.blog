export const InputTitle = ({onChange}:{onChange: any}) => {
    return <div>
    <label className="block mb-2 text-xl font-medium ">Title</label>
    <input onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 " placeholder="Your Story Title"></input>
   </div>
    
}