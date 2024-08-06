import { ChangeEvent } from "react";

interface InputType {
    label: string;
    placeholder: string;
    onChange : (e: ChangeEvent<HTMLInputElement> ) => void;
    type? : string
}

export const InputBox = ({label, placeholder, type, onChange}: InputType) => {

    return <div>
    <label  className="block mb-2 text-sm font-medium text-black pt-2">{label}</label>
    <input onChange={onChange} type={ type || "text" } id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}