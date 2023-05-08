import React, { useContext } from 'react'

type ContextType = {
  address: string
  setAddress: (c: string) => void
  balances: number[]
  setBalances: (c: number[]) => void
}

export const ethContext = React.createContext<ContextType>({
  address: '',
  setAddress: () => {},
  balances: [],
  setBalances: () => {},
})

export const useEthContext = () => useContext(ethContext)
