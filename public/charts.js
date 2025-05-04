fetch('/.netlify/functions/getCryptoList')
  .then(res => res.json())
  .then(data => {
    const top20 = data.data.slice(0, 20);
    const container = document.getElementById('chart-container');

    top20.forEach((coin, index) => {
      // Create a card element styled like the homepage
      const card = document.createElement('div');
      card.className = 'crypto-card';

      // Title
      const title = document.createElement('h3');
      title.innerText = `${coin.name} (${coin.symbol})`;

      // Canvas for chart
      const canvas = document.createElement('canvas');
      canvas.id = `chart-${index}`;
      canvas.style.maxHeight = '220px';

      // Append elements
      card.appendChild(title);
      card.appendChild(canvas);
      container.appendChild(card);

      // Render chart
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Price ($)', 'Market Cap ($)', 'Volume 24h ($)', 'Supply'],
          datasets: [{
            label: `${coin.symbol} Metrics`,
            data: [
              coin.quote.USD.price,
              coin.quote.USD.market_cap,
              coin.quote.USD.volume_24h,
              coin.circulating_supply
            ],
            backgroundColor: [
              'rgba(0, 255, 255, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)'
            ]
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: '#fff' },
              grid: { color: 'rgba(255,255,255,0.1)' }
            },
            x: {
              ticks: { color: '#fff' },
              grid: { color: 'rgba(255,255,255,0.1)' }
            }
          },
          plugins: {
            legend: { labels: { color: '#fff' } }
          }
        }
      });
    });
  })
  .catch(err => {
    console.error("Chart loading error", err);
    document.getElementById('chart-container').innerHTML =
      "<p style='color:red;text-align:center;'>Failed to load charts.</p>";
  });
