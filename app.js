process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const express = require('express');
const https = require('https');
const app = express();

// Configurar middleware
app.use(express.json());

app.use(async (req, res) => {
  console.log('req.originalUrl: -> ', req.originalUrl)
  try {
    delete req.headers['content-length'];

    const requestOptions = {
      method: req.method,
      headers: req.headers,
      body: JSON.stringify(req.body),
      agent: new https.Agent({ rejectUnauthorized: false }) // Set rejectUnauthorized to false
    };

    const url = 'https://gw-mdm-qa.apps.ambientesbc.lab' + req.originalUrl

    const resp = await fetch(url, requestOptions)
    const json = await resp.json()
  
      res.status(resp.status).send(json);
  } catch (error) {
    console.log('error: -> ', error)
    res.send(error)
  }
})

app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
})