# Oazo Apps Full Stack task

## About Oazo Apps

In this repo, U will be able to check token balances for a given blockchain address and save them.
Tracked tokens are Dai, USD Coin and Maker.

To interact with the Ethereum network we recommend to use the eth-sdk package, it greatly simplifies
interactions with the blockchain. Token Addresses to use:

```
DAI: 	0x6b175474e89094c44da98b954eedeac495271d0f
USDC: 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
MKR:	0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2
```

Sample addresses:

```
address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7'
address: '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643'
address: '0x028171bca77440897b824ca71d1c56cac55b68a3'
```

## Functions

- The ability to get token balances from Ethereum Network
- The ability to snapshot and save it.

## Environment Setup

1. Install Node: https://nodejs.org/en/download/
2. Install deps by running `yarn install`
3. Install Ethereum SDKs by running `yarn eth-sdk`
4. Start the app with `yarn dev`

If all went well, you should be able to access the app at
[http://localhost:3000/](http://localhost:3000/).
