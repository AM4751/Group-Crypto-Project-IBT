
fetch('/.netlify/functions/getCryptoList')
  .then(res => res.json())
  .then(data => {
    const top20 = data.data.slice(0, 20);
    const container = document.getElementById('chart-container');

    top20.forEach((coin, index) => {
      const card = document.createElement('div');
      card.className = 'crypto-card';

      // Title
      const title = document.createElement('h3');
      title.innerText = `${coin.name} (${coin.symbol})`;

      // Canvas for financial metrics
      const canvas1 = document.createElement('canvas');
      canvas1.id = `financial-${index}`;
      canvas1.style.maxHeight = '200px';
      canvas1.style.marginBottom = '1rem';

      // Canvas for supply metrics
      const canvas2 = document.createElement('canvas');
      canvas2.id = `supply-${index}`;
      canvas2.style.maxHeight = '200px';

      // Append everything
      card.appendChild(title);
      card.appendChild(canvas1);
      card.appendChild(canvas2);
      container.appendChild(card);

      const financialCtx = canvas1.getContext('2d');
      new Chart(financialCtx, {
        type: 'bar',
        data: {
          labels: ['Price ($)', 'Market Cap ($)', 'Volume 24h ($)'],
          datasets: [{
            label: 'Financial Metrics',
            data: [
              coin.quote.USD.price,
              coin.quote.USD.market_cap,
              coin.quote.USD.volume_24h
            ],
            backgroundColor: [
              'rgba(0, 255, 255, 0.6)',
              'rgba(0, 200, 120, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: '#fff' } },
            title: {
              display: true,
              text: 'Financial Metrics',
              color: '#fff'
            },
            tooltip: {
              callbacks: {
                label: ctx => `$${ctx.raw.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              }
            }
          },
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
          }
        }
      });

      const supplyCtx = canvas2.getContext('2d');
      new Chart(supplyCtx, {
        type: 'bar',
        data: {
          labels: ['Circulating Supply', 'Total Supply'],
          datasets: [{
            label: 'Supply Metrics',
            data: [
              coin.circulating_supply,
              coin.total_supply || 0
            ],
            backgroundColor: [
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: '#fff' } },
            title: {
              display: true,
              text: 'Supply Metrics',
              color: '#fff'
            },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.raw.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              }
            }
          },
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
