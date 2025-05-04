fetch('/.netlify/functions/getCrypto')
  .then(res => res.json())
  .then(data => {
    if (!data || !data.data) {
      console.error('API returned unexpected response:', data);
      document.getElementById('crypto-container').innerText = "Error: Failed to load crypto data.";
      return;
    }

    const container = document.getElementById('crypto-container');
    data.data.forEach(coin => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h2>${coin.name} (${coin.symbol})</h2>
        <p><strong>Price:</strong> $${coin.quote.USD.price.toFixed(2)}</p>
        <p><strong>Rank:</strong> ${coin.cmc_rank}</p>
        <p><strong>Market Cap:</strong> $${(coin.quote.USD.market_cap / 1e9).toFixed(2)}B</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    document.getElementById('crypto-container').innerText = "Error: Unable to load data.";
  });
