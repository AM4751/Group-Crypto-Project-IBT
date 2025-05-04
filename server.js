const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/crypto', async (req, res) => {
  try {
    const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5', {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': '39a3b9e0-0a5c-42dd-9f33-73ede8f32550',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
