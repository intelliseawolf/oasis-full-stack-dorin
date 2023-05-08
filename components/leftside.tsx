import React, { useEffect, useState, useRef } from 'react'
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client'
import { ethers } from 'ethers'
import Image from 'next/image'

import { useEthContext } from '../contexts/ethContext'

const infuraProjectId = 'd9034025e9b94714bd497b25c64078ed'
const mainnetProvider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${infuraProjectId}`,
)
const defaultSigner = ethers.Wallet.createRandom().connect(mainnetProvider)
const { dai, USDC, MKR } = getMainnetSdk(defaultSigner)
const items = [
  { name: 'DAI', src: '/dai_circle_color.svg', token: dai },
  { name: 'USDC', src: '/usdc_circle_color.svg', token: USDC },
  { name: 'MKR', src: '/maker_circle_color.svg', token: MKR },
]

const getTokenBalance = async (token: any, address: string): Promise<number> => {
  try {
    const balance = await token.balanceOf(address)
    return parseInt(ethers.utils.formatUnits(balance.toString(), 18))
  } catch (err) {
    console.log(err)
    return 0
  }
}

type ItemProps = {
  id: number
}

const Item = (props: ItemProps) => {
  const { id } = props
  const { address, balances } = useEthContext()
  const [balance, setBalance] = useState<string>('')

  useEffect(() => {
    if (address && ethers.utils.isAddress(address) && balances.length > 0) {
      setBalance(balances[id].toString())
    } else {
      setBalance('')
    }
  }, [balances])

  return (
    <div className="flex flex-row justify-between gap-x-5">
      <div className="flex gap-x-3">
        <Image src={items[id].src} width="50" height="50" />
        <span>{items[id].name}</span>
      </div>
      <div className="flex gap-x-3 w-full">
        <input
          className="bg-transparent text-right w-full"
          type="text"
          value={balance}
          placeholder="---"
          readOnly
        />
        <p>{items[id].name}</p>
      </div>
    </div>
  )
}

const LeftSide = () => {
  const { address, setBalances: setTokens } = useEthContext()
  const [balances, setBalances] = useState<string[]>(['', '', ''])

  const cachedBalances = useRef<{ [key: string]: { dai: number; usdc: number; mkr: number } }>({})

  useEffect(() => {
    if (address && ethers.utils.isAddress(address)) {
      const fetchBalances = async () => {
        try {
          let cachedAddressBalances = cachedBalances.current[address]

          if (!cachedAddressBalances) {
            cachedAddressBalances = {
              dai: 0,
              usdc: 0,
              mkr: 0,
            }
            cachedBalances.current[address] = cachedAddressBalances
          }

          const [daiBalance, usdcBalance, makerBalance] = await Promise.all([
            getTokenBalance(dai, address),
            getTokenBalance(USDC, address),
            getTokenBalance(MKR, address),
          ])

          cachedAddressBalances.dai = daiBalance
          cachedAddressBalances.usdc = usdcBalance
          cachedAddressBalances.mkr = makerBalance

          setBalances([
            cachedAddressBalances.dai.toString(),
            cachedAddressBalances.usdc.toString(),
            cachedAddressBalances.mkr.toString(),
          ])
          setTokens([
            cachedAddressBalances.dai,
            cachedAddressBalances.usdc,
            cachedAddressBalances.mkr,
          ])
        } catch (err) {
          console.log(err)
        }
      }

      const cachedAddressBalances = cachedBalances.current[address]
      if (cachedAddressBalances) {
        setBalances([
          cachedAddressBalances.dai.toString(),
          cachedAddressBalances.usdc.toString(),
          cachedAddressBalances.mkr.toString(),
        ])
        setTokens([
          cachedAddressBalances.dai,
          cachedAddressBalances.usdc,
          cachedAddressBalances.mkr,
        ])
      } else {
        fetchBalances()
      }
    } else {
      setBalances(['', '', ''])
      setTokens([])
    }
  }, [address])

  return (
    <div className="flex flex-col md:w-2/5 w-full gap-y-5">
      <h2 className="text-2xl">Token balances</h2>
      {[0, 1, 2].map((item) => {
        return <Item id={item} key={item} />
      })}
    </div>
  )
}

export default LeftSide
