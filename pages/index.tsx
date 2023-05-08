import type { NextPage } from 'next'
import { useState } from 'react'
import Header from '../components/header'
import Body from '../components/body'
import Wrapper from '../components/wrapper'
import { ethContext } from '../contexts/ethContext'

const Home: NextPage = () => {
  const [address, setAddress] = useState<string>('')
  const [balances, setBalances] = useState<number[]>([])

  return (
    <ethContext.Provider value={{ address, setAddress, balances, setBalances }}>
      <div className="flex justify-center min-h-screen bg-[rgb(17,18,22)] min-w-min">
        <Wrapper>
          <Header />
          <Body />
        </Wrapper>
      </div>
    </ethContext.Provider>
  )
}

export default Home
