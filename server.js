const express = require('express')
require('dotenv').config()
const app = express()
const port = 3000
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post('/createConnectedAccount', async (req, res) => {
  const params = req.body
  console.log(params)
  const account = await stripe.accounts.create({
    type: params.type,
    country: params.country,
    email: params.email,
    // capabilities: {
    //   card_payments: {requested: true},
    //   transfers: {requested: true},
    // },
  });
  res.send(account.id)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})