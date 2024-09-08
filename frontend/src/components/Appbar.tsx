import { Link, useNavigate } from "react-router-dom"
import { Pen } from "lucide-react"
import { useState } from "react";

export const Appbar = ({ name }: { name: string }) => {
    return (
        <div className="flex justify-between items-center border-b px-4 sm:px-6 lg:px-10 py-3 sticky z-50 top-0 bg-white">
          
            
            <Link to={"/blogs"}>
                <div className="text-xl sm:text-2xl lg:text-3xl font-serif cursor-pointer items-center gap-2 font-extrabold flex">
                   
                    StorySphere
                    <img src="/globe.png" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11" />
                   
                </div>
            </Link>
            
            <div className="flex items-center space-x-4">
            
                
                <div className="flex items-center  ">
                  
                    <Link to={"/publish"} className="rounded-md items-center flex">
                        <Pen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 mt-1" />
                    </Link>
                </div>
                
                <div className="pt-1">
                    <UserButton name={name} />
                </div>
            </div>
        </div>
    )
}
function UserButton({ name }: { name: string }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
    const handleLogout = () => {
      setDropdownOpen(false);
        navigate('/')
      // Add logout functionality here
    };
  
    return (
      <div className="relative">
        <div
          className="inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
        
          <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
            {name[0]}
          </span>
        </div>
  
        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600 z-50">
            <ul className="py-1">
              <li
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }