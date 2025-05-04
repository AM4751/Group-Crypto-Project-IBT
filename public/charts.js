fetch('/.netlify/functions/getCryptoList')
  .then(res => res.json())
  .then(data => {
    const top20 = data.data.slice(0, 20);
    const container = document.getElementById('chart-container');

    top20.forEach((coin, index) => {
      const canvas = document.createElement('canvas');
      canvas.id = `chart-${index}`;
      canvas.style.marginBottom = '50px';
      canvas.style.background = '#1e1e1e';
      canvas.style.borderRadius = '10px';

      const wrapper = document.createElement('div');
      wrapper.style.marginBottom = '40px';
      wrapper.innerHTML = `<h3 style="text-align:center;color:white;">${coin.name} (${coin.symbol})</h3>`;
      wrapper.appendChild(canvas);
      container.appendChild(wrapper);

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
    document.getElementById('chart-container').innerHTML = "<p style='color:red;text-align:center;'>Failed to load charts.</p>";
  });
