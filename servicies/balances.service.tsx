const server_url = process.env.SERVER_URL || 'http://localhost:5000/balances'

export const post = async (address: string, balances: number[]) => {
  const payload = {
    address: address,
    balances: [
      {
        token: 'DAI',
        balance: balances[0],
      },
      {
        token: 'USDC',
        balance: balances[1],
      },
      {
        token: 'MKR',
        balance: balances[1],
      },
    ],
  }
  try {
    await fetch(server_url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  } catch (err) {
    console.log(err)
  }
}
