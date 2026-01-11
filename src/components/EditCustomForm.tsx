import { useEffect, useState, type FormEvent } from "react"
import { useTheme } from "../context/ThemeContext";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";

export type namesCollectionType = {
  _id: string,
  name: string,
  userId: string,
  title: string,
  content: string,
  collectionId: string,
  collectionName: string
}

type possibleErrors = {
  collection?: boolean,
  title?: boolean,
  content?: boolean,
  collectionId?: boolean,
  collectionName?: boolean
}

const EditCustomForm = () => {
  //Redux
  const collections = useSelector((state: RootState) => state.collections.value)
  
  //Theme
  const { theme } = useTheme();
  
  //Collections:
  const [err, setErr] = useState<possibleErrors>({collection: false, title: false, content: false, collectionId: false, collectionName: false});
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [choices, setChoices] = useState<namesCollectionType[] | []>([])

  const navigate = useNavigate();

  //Link params:
    const [searchParams] = useSearchParams();
    const selectedTopic = searchParams.get("topic");

  //Get dynamic parameter:
  const {id} = useParams();

  useEffect(() => {
    console.log("These ones: ", collections)

    async function getData(){
      try {
        const res = await fetch(import.meta.env.VITE_TEST_GET_TOPIC + `/${id}`)
        
        if(!res.ok){
          throw new Error(`${res.status}`)
        }
        
        const data = await res.json();

        console.log("These are the raw data: ", data)

        // const collectionNames: namesCollectionType[] = data.map((item: namesCollectionType) => ({collectionName: item.name, collectionId: item._id}))        
        setChoices([data.data]);
        
      } catch (error) {
        console.error((error as Error).message)
      }
    }

    getData();

  }, [collections])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string
    const body = formData.get("body") as string;
    const collectionId = formData.get("collectionId") as string
    const collectionName = formData.get("collectionName") as string

    const currentErrors: possibleErrors = {};

    if(!title || title.replace(/[ ]/g, "") == ""){
      currentErrors.title = true
      setErr((prev) => ({...prev, title: true}))
    }

    if(!body || body.replace(/[ ]/g, "") == ""){
      currentErrors.content = true
      setErr((prev) => ({...prev, content: true}))
    }


    //Scenarios:
    //1. User doesn't pick to choose or create collection;
    //2. User select;

    // if(!collectionId && (!collectionName || collectionName.replace(/[ ]/g, "") == "")){
    //   currentErrors.collectionId = true
    //   currentErrors.collectionName = true;     
    //   setErr((prev) => ({...prev, collectionId: true, collectionName: true}))
    // }

    if(createPlaylist && (!collectionName || collectionName.replace(/[ ]/g, "") == "")){
      currentErrors.collectionName = true;
      setErr((prev) => ({...prev, collectionName: true}));
    }else if(!createPlaylist && !collectionId){
      currentErrors.collectionId = true;
      setErr((prev) => ({...prev, collectionId: true}))
    }

    // Stop function if there's an error;
    if(Object.values(currentErrors).includes(true)){
      toast.error("Please fix the errors in the form before submitting.")
      return;
    }
    
    try {
      const res = await fetch(`${import.meta.env.VITE_TEST_UPDATE_TOPIC}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content: body
        }),
        credentials: 'include'
      })

      if(!res.ok){
        throw new Error(`${res.status}`)
      }

      const data = await res.json();

      console.log(data);
      navigate("/custom")

    } catch (error) {
      console.error((error as Error).message)
    }
  }

  return (
    <>
      {choices.length > 0 ? (
        <form onSubmit={(e) => handleSubmit(e)} className="customForm w-[80%] h-[80%] flex flex-col gap-2 justify-center">
            <h1 className={`${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"} text-center text-4xl select-none`}>
                Create Custom Text
            </h1>
            
            <div className="flex justify-start flex-col">
              <div>
                <p className={`${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"} font-bold`}>Collection<span className="text-red-500">*</span></p>
                <small className="text-gray-500">Add this content to a collection to organize your contents</small>
              </div>
              {createPlaylist ? (
                <div className="relative">
                  <input onChange={() => setErr(prev => ({...prev, collectionName: false}))} type="text" name="collectionName" className={`${theme == "light" ? "bg-white text-[rgb(23,23,23)]" : "bg-[rgb(23,23,23)] text-white"} w-full rounded-xl p-5 border ${err.collectionName ? "border-red-500" : "border-gray-500"} placeholder-gray-500`} placeholder="What should be the title of this new collection?"/>
                  <X onClick={() => {
                    setCreatePlaylist(false)
                    setErr(prev => ({...prev, collectionId: false, collectionName: false}))
                  }} className={`${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white"} absolute top-5 right-5 cursor-pointer -translate-y-0.25 hover:translate-none duration-500`}/>
                </div>
              ):(
                <div className="w-full flex gap-2">
                  <div className={`relative w-full border ${err.collectionId ? "border-red-500" : "border-gray-500"} rounded`}>
                    <select 
                      className={`appearance-none ${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white"} py-2 rounded px-5 text-center font-bold w-full`}
                      defaultValue={`${id}`}
                      name="collectionId"
                      id="collectionId" 
                      onChange={()=>{
                        setErr((prev) => ({...prev, collectionId: false}))
                      }}
                    >
                      <option className={`${theme == "light" ? "text-[rgb(23,23,23)] bg-[rgb(200,200,200)]" : "text-white bg-[rgb(23,23,23)]"}`} value={selectedTopic ? selectedTopic : "default"} disabled>Select a collection</option>
                      {choices.length > 0 && (
                        <>
                          {choices.map(item => (
                            <option key={item.collectionId} className={`${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white bg-[rgb(23,23,23)]"} hover:cursor-pointer`} value={`${item.collectionId}`}>{item.collectionName}</option>
                          ))}
                        </>
                      )}
                    </select>
                    <span className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white"}`}>
                      ▼
                    </span>
                  </div>
                </div>
              )}
              
            </div>

            <div>
              <p className={`${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"} font-bold`}>Title<span className="text-red-500">*</span></p>
              <input onChange={()=>setErr(prev => ({...prev, title: false}))} type="text" name="title" className={`${theme == "light" ? "bg-white text-[rgb(23,23,23)]" : "bg-[rgb(23,23,23)] text-white"} w-full rounded-xl p-5 border ${err.title ? "border-red-500" : "border-gray-500"} placeholder-gray-500 `} placeholder="Add a title that best describe this content" defaultValue={choices[0].title}/>
            </div>

            <div>
              <p className={`${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"} font-bold`}>Content<span className="text-red-500">*</span></p>
              <textarea onChange={() => setErr(prev => ({...prev, content: false}))} name="body" className={`${theme == "light" ? "bg-white text-[rgb(23,23,23)]" : "bg-[rgb(23,23,23)] text-white"} w-[100%] h-[100%] p-5 border ${err.content ? "border-red-500" : "border-gray-500"} rounded-xl placeholder-gray-500`} placeholder='Body text' defaultValue={choices[0].content}/>
            </div>
            
            <div className="flex w-full justify-end mt-7">
                <button className="text-white font-bold w-auto bg-blue-500 py-2 px-5 rounded-full cursor-pointer -translate-y-0.5 hover:translate-none duration-200">Update</button>
            </div>
          <ToastContainer theme={theme == "dark" ? "dark" : "light"}/>
        </form>
      ): (
        <div className="h-[100vh] grid place-items-center pt-20 ">
          <div>
                    <div className="flex justify-center items-center">
                        <ClipLoader color={theme === "dark" ? "#ffffff" : "#000000"} size={50} />
                    </div>
                </div>
        </div>
      )}
    </>
  )
}

export default EditCustomForm
