const ctx = document.getElementById('priceChart').getContext('2d');

// Example: mock data for BTC price over time
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'BTC Price (USD)',
      data: [65000, 66000, 67000, 66500, 67500],
      borderColor: 'rgba(255, 255, 255, 0.9)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      tension: 0.3,
      fill: true
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { display: false }
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    },
    plugins: {
      legend: {
        labels: { color: '#fff' }
      }
    }
  }
});
