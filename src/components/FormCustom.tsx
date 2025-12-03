import { useEffect, useState, type FormEvent } from "react"
import { useTheme } from "../context/ThemeContext";
import { X } from "lucide-react";

const FormCustom = () => {
  const { theme } = useTheme();
  const [createPlaylist, setCreatePlaylist] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")
    const body = formData.get("body");
    const collection = formData.get("collectionName")

    console.log(title)
    console.log(body);
    console.log(collection)

    console.log(localStorage.getItem("userId"))
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="customForm w-[80%] h-[80%] flex flex-col gap-2">
        <div className="flex justify-start flex-col">
          <div>
            <p className="text-white font-bold">Playlists</p>
            <small className="text-gray-500">Add this content to a collection to organize your contents</small>
          </div>
          {createPlaylist ? (
            <div className="relative">
              <input type="text" name="collectionName" className={`${theme == "light" ? "bg-white" : "bg-[rgb(23,23,23)]"} w-full rounded-xl p-5 border border-gray-500 placeholder-gray-500 text-white`} placeholder="What should be the title of this new collection?"/>
              <X onClick={() => setCreatePlaylist(false)} className={`text-white absolute top-5 right-5 cursor-pointer -translate-y-0.25 hover:translate-none duration-500`}/>
            </div>
          ):(
            <div className="relative w-full">
              <select 
                className="appearance-none bg-[rgb(18,18,18)] text-white py-2 rounded px-5 text-center font-bold w-full"
                defaultValue="default" 
                onChange={(e) => {
                  if(e.target.value == "New"){
                    setCreatePlaylist(true);
                  }
                }}
              >
                <option className="text-gray-500 bg-[rgb(23,23,23)]" value="default" disabled>Select a collection</option>
                <option className="text-white hover:cursor-pointer" value={`Quotes`}>Quotes</option>
                <option className="text-white hover:cursor-pointer rounded-b" value={`New`} >+ Create New</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
                ▼
              </span>
            </div>
          )}
        </div>

        <div>
          <p className="text-white font-bold">Title</p>
          <input type="text" name="title" className={`${theme == "light" ? "bg-white" : "bg-[rgb(23,23,23)]"} w-full rounded-xl p-5 border border-gray-500 placeholder-gray-500 text-white`} placeholder="Add a title that best describe this content"/>
        </div>

        <div>
          <p className="text-white font-bold">Content</p>
          <textarea name="body" className={`${theme == "light" ? "bg-white" : "bg-[rgb(23,23,23)]"} w-[100%] h-[100%] p-5 text-white border border-gray-500 rounded-xl placeholder-gray-500`} placeholder='Body text'/>
        </div>
        
        <div className="flex w-full justify-end mt-7">
            <button className="text-white font-bold w-auto bg-green-500 py-2 px-5 rounded-full cursor-pointer -translate-y-0.5 hover:translate-none duration-200">Submit</button>
        </div>
    </form>
  )
}

export default FormCustom
