import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import {getToken} from "./auth.js";


dotenv.config();
const app = express();
app.use(cors({origin: '*'}));
app.use(getToken)

app.get('/instruments', async (req, res) => {
  const accessToken = res.locals.token;
  const response = await fetch(`https://platform.fintacharts.com/api/instruments/v1/instruments?provider=oanda&kind=forex`, {
    method: 'get',
    headers: {'Authorization': `Bearer ${accessToken}`}
  });
  try {
    const instruments = await response.text();
    res.send(instruments)
  } catch (e) {
    res.status(500).send({message: 'Something went wrong.'})
  }
})

app.get('/token',(req,res) => {
  const accessToken = res.locals.token;
  res.json(accessToken)
})


app.listen(3000, () => console.log('Server started on port 3000'));
