
fetch('/.netlify/functions/getCryptoList')
  .then(res => res.json())
  .then(data => {
    if (!data || !data.data) throw new Error("Invalid API response");
    const top20 = data.data.slice(0, 20);
    const container = document.getElementById('chart-container');

    top20.forEach((coin, index) => {
      if (!coin.quote || !coin.quote.USD || !coin.circulating_supply || !coin.total_supply) return;

      const card = document.createElement('div');
      card.className = 'crypto-card';

      const title = document.createElement('h3');
      title.innerText = `${coin.name} (${coin.symbol})`;

      const canvas1 = document.createElement('canvas');
      canvas1.id = `financial-${index}`;

      const canvas2 = document.createElement('canvas');
      canvas2.id = `supply-${index}`;

      card.appendChild(title);
      card.appendChild(canvas1);
      card.appendChild(canvas2);
      container.appendChild(card);

      const safe = val => {
        if (typeof val !== 'number' || !isFinite(val) || val <= 0) return 0.01;
        if (val > 1e12) return 1e12;
        return val;
      };

      const financialCtx = canvas1.getContext('2d');
      new Chart(financialCtx, {
        type: 'bar',
        data: {
          labels: ['Price', 'Mkt Cap', 'Vol 24h'],
          datasets: [{
            data: [
              safe(coin.quote.USD.price),
              safe(coin.quote.USD.market_cap),
              safe(coin.quote.USD.volume_24h)
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
          maintainAspectRatio: true,
          aspectRatio: 2,
          animation: {
            duration: 800,
            easing: 'easeOutQuart'
          },
          layout: { padding: { top: 10, bottom: 20 } },
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Financial Metrics (Log Scale)',
              color: '#fff',
              font: { size: 14 }
            },
            tooltip: {
              callbacks: {
                label: ctx => `$${Number(ctx.raw).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              }
            }
          },
          scales: {
            y: {
              type: 'logarithmic',
              ticks: {
                color: '#fff',
                font: { size: 11 },
                maxTicksLimit: 4,
                precision: 0,
                callback: val => {
                  if (val === 0.01) return '';
                  if (val >= 1e12) return `$${(val / 1e12).toFixed(1)}T`;
                  if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
                  if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
                  return `$${val}`;
                }
              },
              grid: { color: 'rgba(255,255,255,0.1)' }
            },
            x: {
              ticks: {
                color: '#fff',
                font: { size: 11 },
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0
              },
              grid: { color: 'rgba(255,255,255,0.1)' }
            }
          }
        }
      });

      // Adjust for overlap if values are equal
      const circ = safe(coin.circulating_supply);
      const total = safe(coin.total_supply);
      const adjustedSupply = circ === total ? [circ, total * 1.01] : [circ, total];

      const supplyCtx = canvas2.getContext('2d');
      new Chart(supplyCtx, {
        type: 'bar',
        data: {
          labels: ['Circ. Supply', 'Total Supply'],
          datasets: [{
            data: adjustedSupply,
            backgroundColor: [
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          animation: {
            duration: 800,
            easing: 'easeOutQuart'
          },
          layout: { padding: { top: 10, bottom: 20 } },
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Supply Metrics (Log Scale)',
              color: '#fff',
              font: { size: 14 }
            },
            tooltip: {
              callbacks: {
                label: ctx => Number(ctx.raw).toLocaleString(undefined, { maximumFractionDigits: 2 })
              }
            }
          },
          scales: {
            y: {
              type: 'logarithmic',
              ticks: {
                color: '#fff',
                font: { size: 11 },
                maxTicksLimit: 4,
                precision: 0,
                callback: val => {
                  if (val === 0.01) return '';
                  if (val >= 1e12) return `${(val / 1e12).toFixed(1)}T`;
                  if (val >= 1e9) return `${(val / 1e9).toFixed(1)}B`;
                  if (val >= 1e6) return `${(val / 1e6).toFixed(1)}M`;
                  return `${val}`;
                }
              },
              grid: { color: 'rgba(255,255,255,0.1)' }
            },
            x: {
              ticks: {
                color: '#fff',
                font: { size: 11 },
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0
              },
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
