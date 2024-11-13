// Fetch and display products in index.html
if (window.location.pathname.includes("index.html")) {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const tableBody = document.querySelector("#productTable tbody");
      tableBody.innerHTML = products.map(product => `
        <tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><button onclick="viewProduct(${product.id})">View</button></td>
        </tr>
      `).join('');
    });
}

// Redirect to view page with selected product ID
function viewProduct(productId) {
  window.location.href = `view.html?id=${productId}`;
}

// Load product details in view.html
if (window.location.pathname.includes("view.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id == productId);
      const productDetailsDiv = document.getElementById('productDetails');
      
      if (product) {
        productDetailsDiv.innerHTML = `
          <h2>${product.name}</h2>
          <p><strong>Description:</strong> ${product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
        `;
      } else {
        productDetailsDiv.innerHTML = '<p>Product not found.</p>';
      }
    });
}
