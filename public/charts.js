fetch('/.netlify/functions/getCryptoList')
  .then(res => res.json())
  .then(data => {
    const top20 = data.data.slice(0, 20);
    const labels = top20.map(coin => `${coin.name} (${coin.symbol})`);
    const prices = top20.map(coin => coin.quote.USD.price);

    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Price (USD)',
          data: prices,
          backgroundColor: 'rgba(0, 255, 255, 0.6)',
          borderColor: 'rgba(0, 255, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: { color: '#fff', autoSkip: false, maxRotation: 90, minRotation: 45 },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#fff' },
            grid: { color: 'rgba(255,255,255,0.1)' },
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: { color: '#fff' }
          },
          tooltip: {
            callbacks: {
              label: ctx => `$${ctx.raw.toFixed(2)}`
            }
          }
        }
      }
    });
  })
  .catch(err => {
    console.error("Failed to load chart data:", err);
    document.getElementById('priceChart').insertAdjacentHTML('beforebegin', "<p style='color:red;text-align:center;'>Failed to load chart data.</p>");
  });
