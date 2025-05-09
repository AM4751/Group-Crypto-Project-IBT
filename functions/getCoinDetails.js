const fetch = require('node-fetch');

exports.handler = async function(event) {
  const id = event.queryStringParameters.id;

  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${id}`;
  try {
    const response = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': '39a3b9e0-0a5c-42dd-9f33-73ede8f32550',
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to fetch coin info" })
    };
  }
};
