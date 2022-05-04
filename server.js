const express = require('express')
require('dotenv').config()
const app = express()
const port = 3000
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// This POST API recieves connect account configuration variables and creates an account.
// This returns newly created account's id.
app.post('/createConnectedAccount', async (req, res) => {
  const params = req.body
  let statusCode, response 
  console.log(params)
  try {
    const account = await stripe.accounts.create(params)
    statusCode = 200
    response = {accountId: account.id}
  } catch(e) { 
    console.log(e)
    statusCode = e.statusCode
    response = {error: e.raw.message}
  }
  res.status(statusCode).send(response)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})