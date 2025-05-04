fetch('/.netlify/functions/getCrypto')
  .then(res => res.json())
  .then(data => {
    if (!data || !data.data) {
      console.error('API returned unexpected response:', data);
      document.getElementById('crypto-container').innerText = "Error: Failed to load crypto data.";
      return;
    }

    const container = document.getElementById('crypto-container');
    data.data.slice(0,25).forEach(coin => {
      const logoUrl = `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`;

      const div = document.createElement('div');
      div.className = 'crypto';
      div.innerHTML = `
        <img src="${logoUrl}" alt="${coin.name} logo" style="width: 48px; height: 48px; border-radius: 50%; margin-bottom: 10px;">
        <h2>${coin.name} (${coin.symbol})</h2>
        <p><strong>Rank:</strong> ${coin.cmc_rank}</p>
        <p><strong>Price:</strong> $${coin.quote.USD.price.toFixed(2)}</p>
        <p><strong>Market Cap:</strong> $${(coin.quote.USD.market_cap / 1e9).toFixed(2)}B</p>
        <p><strong>24h Change:</strong> ${coin.quote.USD.percent_change_24h.toFixed(2)}%</p>
        <p><strong>Total Supply:</strong> ${coin.total_supply?.toLocaleString() ?? 'N/A'}</p>
      `;
      container.appendChild(div);
    });

  })
  .catch(error => {
    console.error('Error fetching data:', error);
    document.getElementById('crypto-container').innerText = "Error: Unable to load data.";
  });
