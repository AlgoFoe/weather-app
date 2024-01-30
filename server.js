if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const axios = require('axios');
const express = require('express');
const API_KEY = process.env.API_KEY
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather',(req,res)=>{
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.place.name}&APPID=${API_KEY}`
  axios({
    url : url,
    responseType : 'json'
  }).then(data => res.json(data.data))
})
app.listen(8000,()=>{
  console.log("Server running")
})

