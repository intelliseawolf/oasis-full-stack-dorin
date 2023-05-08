import React from 'react'
import Image from 'next/image'

import OasisLogo from '../public/oasis-icon-152x152.png'

const Header = () => {
  return (
    <div className="ps-20 flex justify-center">
      <div className="flex flex-start relative">
        <div className="absolute aspect-square left-[-5rem] h-full">
          <Image src={OasisLogo.src} alt="OasisLogo" className="w-full" layout="fill" />
        </div>
        <div className="flex flex-col py-6 bg-[rgb(32,33,36)] px-40 rounded-2xl">
          <h1 className="text-4xl truncate ...">Dorin Manea</h1>
          <span>Oazo Apps full stack candidate</span>
          <div className="flex flex-row pt-5 text-sm">
            <a target="_blank" href="https://github.com/intelliseawolf">
              intelliseawolf103@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
