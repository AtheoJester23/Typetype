const FormCustom = () => {
  return (
    <form action="" className="customForm w-[80%] h-[80%] flex justify-center items-center flex-col gap-2">
        <input type="text" className="bg-[rgb(23,23,23)] w-full rounded-xl p-5 border border-gray-500 placeholder-gray-500 text-white" placeholder="title"/>

        <textarea className="bg-[rgb(23,23,23)] w-[100%] h-[100%] p-5 text-white border border-gray-500 rounded-xl" placeholder='Body text'/>
        <div className="flex w-full justify-end">
            <button className="text-white font-bold w-auto bg-green-500 py-2 px-5 rounded-full cursor-pointer -translate-y-0.5 hover:translate-none duration-200">Submit</button>
        </div>
    </form>
  )
}

export default FormCustom
