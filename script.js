const apiKey = 'YOUR_COINMARKETCAP_API_KEY';
const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5';

fetch(url, {
  method: 'GET',
  headers: {
    'X-CMC_PRO_API_KEY': apiKey,
    'Accept': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  const container = document.getElementById('crypto-container');
  data.data.forEach(coin => {
    const div = document.createElement('div');
    div.className = 'crypto';
    div.innerHTML = `
      <h2>${coin.name} (${coin.symbol})</h2>
      <p><strong>Rank:</strong> ${coin.cmc_rank}</p>
      <p><strong>Price:</strong> $${coin.quote.USD.price.toFixed(2)}</p>
      <p><strong>Market Cap:</strong> $${(coin.quote.USD.market_cap / 1e9).toFixed(2)} B</p>
      <p><strong>24h Change:</strong> ${coin.quote.USD.percent_change_24h.toFixed(2)}%</p>
    `;
    container.appendChild(div);
  });
})
.catch(error => {
  console.error('Error fetching CoinMarketCap data:', error);
});
