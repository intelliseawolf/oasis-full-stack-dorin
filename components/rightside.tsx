import React, { useState } from 'react'
import { ethers } from 'ethers'
import * as service from '../servicies/balances.service'
import useInput from '../hooks/useInput'
import { useEthContext } from '../contexts/ethContext'

const checkBalances = (balances: number[]) => {
  const tmp = balances
  tmp.sort((a: number, b: number) => {
    if (a < b) return 1
    if (a > b) return -1
    return 0
  })
  if (tmp[0] > 0) return true
  return false
}

const RightSide = () => {
  const { setAddress, balances } = useEthContext()
  const address = useInput('')
  const [isValid, setIsValid] = useState<boolean>(false)

  const postBalances = () => {
    if (checkBalances(balances) === false) return
    service.post(address.value, balances)
  }

  const ValidNotify = () => {
    if (!isValid && address.value)
      return <span className="self-end text-red-500">Please Provide a vaild address.</span>
    return <span className="self-end text-red-500"></span>
  }

  return (
    <div className="flex flex-col justify-start md:w-3/5 w-full gap-y-8">
      <h2 className="text-2xl">Save account balances</h2>
      <section>
        Provide an Ethereum address to find out balances of DAI, USDC and Maker. Submit them to
        snapshot for future reference. At least one balance must be greater than zero.
      </section>
      <div className="flex flex-col gap-y-5">
        <span>Address</span>
        <textarea
          placeholder="0x2655..0aa9"
          className="rounded-md resize-none h-15 lining-nums bg-[#202124] border-none outline-none"
          spellCheck="false"
          value={address.value}
          onChange={(e) => {
            address.onChange(e)
            setAddress(e.target.value)
            setIsValid(ethers.utils.isAddress(e.target.value))
          }}
        ></textarea>
        <ValidNotify />
      </div>

      <button
        disabled={!address.value || !isValid || !balances.length || !checkBalances(balances)}
        className="ease-in-out bg-[#3e4046] h-12 rounded-xl hover:ease-in hover:duration-100 hover:bg-[#57585d] active:bg-[#2c2d30] active:ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed ..."
        onClick={() => {
          postBalances()
        }}
      >
        Submit
      </button>
    </div>
  )
}

export default RightSide
