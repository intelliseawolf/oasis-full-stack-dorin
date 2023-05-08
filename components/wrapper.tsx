import React from 'react'

type Props = {
  children: React.ReactNode
}

const Wrapper = (props: Props) => {
  return (
    <div className="flex flex-col justify-center md:gap-y-20 gap-y-10 w-3/5 font-mono text-[#e2e8f0] py-10">
      {props.children}
    </div>
  )
}

export default Wrapper
