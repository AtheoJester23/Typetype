import { Dialog, DialogPanel } from "@headlessui/react"
import { Heart } from "lucide-react"
import { useState } from "react"
import { siPaypal } from 'simple-icons/icons'

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <footer className='bg-[rgb(23,23,23)] text-white py-20 text-center flex flex-col gap-5 justify-center items-center'>
      <a className="text-white font-bold text-3xl select-none">Typetype</a>
      
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
      <div>
          <button onClick={() => setIsOpen(true)} className="group cursor-pointer text-gray-500 flex gap-2" >
              <Heart/>
              <span className="max-w-0
                overflow-hidden
                whitespace-nowrap
                opacity-0
                transition-all
                duration-300
                group-hover:max-w-[80px]
                group-hover:opacity-100">
                  Donate
              </span>
          </button>
      </div>
      <Dialog open={isOpen} onClose={() => {setIsOpen(false)}}>
        <div className="fixed inset-0 flex justify-center items-center">
          <DialogPanel className={`mx-auto flex justify-center items-center`}>
            <div className="bg-white w-full p-5 rounded shadow-lg flex">
              <div className="p-5 border-r-1 border-gray-500 flex flex-col gap-5 justify-center items-center">
                <div className="flex gap-3 items-center justify-center">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    fill="#00457C"
                    dangerouslySetInnerHTML={{ __html: siPaypal.svg }}
                  />
                  <h1 className="font-bold text-4xl">Paypal</h1>
                </div>
                <a href="http://paypal.me/AtheoJester" className="bg-blue-500 text-white font-bold rounded-full py-3 px-5 flex justify-center items-center" target="_blank"><span>Donate</span></a>
              </div>

              <div className="p-5">
                <div>
                  <h1 className="font-bold text-4xl text-center">GCash</h1>
                  <img
                    src="/gcash-qr.jpg"
                    alt="Scan to donate via GCash"
                    className="mx-auto w-56"
                  />
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </footer>
  )
}

export default Footer
