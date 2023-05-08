import React from 'react'

import LeftSide from './leftside'
import RightSide from './rightside'

const Body = () => {
  return (
    <div className="flex md:flex-row flex-col gap-x-10 gap-y-10">
      <LeftSide />
      <RightSide />
    </div>
  )
}

export default Body
