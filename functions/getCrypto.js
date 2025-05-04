const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5';

  try {
    const response = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': 'YOUR_API_KEY',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};
