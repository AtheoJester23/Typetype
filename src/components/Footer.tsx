const Footer = () => {
  return (
    <footer className='bg-[rgb(23,23,23)] text-white py-20 text-center flex flex-col gap-5 justify-center items-center'>
      <a className="text-white font-bold text-3xl">Typetype</a>
      
      <p className="text-center text-gray-500 w-[50%]">
        This website is designed not only to improve typing speed, but also to emphasize the importance of repetition in memorizing sentences and paragraphs.
      </p>
      
      <div className="flex justify-center items-center gap-3 mt-3">
        <a href="https://www.linkedin.com/in/atheojester23/" target="blank">
          <i className="devicon-linkedin-plain text-xl border rounded-full p-2 hover:bg-white hover:border-white hover:text-gray-500 duration-300"></i>
        </a>
        <a href="https://github.com/AtheoJester23" target="blank">
          <i className="devicon-github-plain text-xl border rounded-full p-2 hover:bg-white hover:border-white hover:text-gray-500 duration-300"></i>
        </a>
      </div>

      <hr className="text-gray-500 w-[50%]"/>

      <div className="text-gray-500 flex gap-1.5">
        <p>
          Created by: 
        </p>
        <a href="https://atheo.site" target="_blank" className="hover:-translate-y-1 hover:text-white duration-500">
          Atheo
        </a>
      </div>
    </footer>
  )
}

export default Footer
