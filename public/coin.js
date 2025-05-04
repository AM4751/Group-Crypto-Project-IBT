const urlParams = new URLSearchParams(window.location.search);
const coinId = urlParams.get("id");

fetch(`/.netlify/functions/getCoinDetails?id=${coinId}`)
  .then(res => res.json())
  .then(data => {
    const coin = data.data[coinId];
    const container = document.getElementById("coin-detail");

    container.innerHTML = `
      <img src="${coin.logo}" alt="${coin.name}" style="width: 64px;">
      <h2>${coin.name} (${coin.symbol})</h2>
      <p><strong>Category:</strong> ${coin.category}</p>
      <p><strong>Description:</strong> ${coin.description || "No description available."}</p>
      <p><strong>Website:</strong> <a href="${coin.urls.website[0]}" target="_blank">${coin.urls.website[0]}</a></p>
    `;
  })
  .catch(err => {
    console.error("Error loading details", err);
    document.getElementById("coin-detail").innerText = "Failed to load coin data.";
  });
