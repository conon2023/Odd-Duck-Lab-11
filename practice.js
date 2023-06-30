'use strict';

const productContainer = document.getElementById('productContainer');
const productImages = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck","dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "water-can", "wine-glass"];
let numRounds = 25; // Default number of rounds

// Constructor function for creating a product object
function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.timesShown = 0;
  this.votes = 0;
}

// Create product objects
const products = [
  new Product("bag", "images/bag.jpg"),
  new Product("banana", "images/banana.jpg"),
  new Product("bathroom", "images/bathroom.jpg"),
  new Product("boots", "images/boots.jpg"),
  new Product("breakfast", "images/breakfast.jpg"),
  new Product("bubblegum", "images/bubblegum.jpg"),
  new Product("chair", "images/chair.jpg"),
  new Product("cthulhu", "images/cthulhu.jpg"),
  new Product("dog-duck", "images/dog-duck.jpg"),
  new Product("dragon", "images/dragon.jpg"),
  new Product("pen", "images/pen.jpg"),
  new Product("pet-sweep", "images/pet-sweep.jpg"),
  new Product("scissors", "images/scissors.jpg"),
  new Product("shark", "images/shark.jpg"),
  new Product("sweep", "images/sweep.png"),
  new Product("tauntaun", "images/tauntaun.jpg"),
  new Product("unicorn", "images/unicorn.jpg"),
  new Product("water-can", "images/water-can.jpg"),
  new Product("wine-glass", "images/wine-glass.jpg")
];

// Function to get three unique random product indices
function getRandomProductIndices() {
  const indices = [];
  while (indices.length < 3) {
    const randomIndex = Math.floor(Math.random() * productImages.length);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
}

// Function to display three random products
function displayRandomProducts() {
  if (numRounds === 0) {
    // End the voting session
    productContainer.removeEventListener('click', productClickHandler);
    const viewResultsButton = document.createElement('button');
    viewResultsButton.textContent = 'View Results';
    viewResultsButton.addEventListener('click', showResults);
    document.body.appendChild(viewResultsButton);
    saveVotingData(); // Save voting data before showing results
    return;
  }

  const productIndices = getRandomProductIndices();

  for (let i = 0; i < productIndices.length; i++) {
    const productIndex = productIndices[i];
    const product = products[productIndex];
    const imageElement = document.getElementById(`product${i + 1}`);
    imageElement.src = product.imagePath;
    imageElement.alt = product.name;
    product.timesShown++;
  }

  numRounds--;


// Event listener for product click
function productClickHandler(event) {
  const clickedProductId = event.target.id;
  if (clickedProductId === 'product1' || clickedProductId === 'product2' || clickedProductId === 'product3') {
    const clickedProductIndex = parseInt(clickedProductId.replace('product', '')) - 1;
    const clickedProduct = products[clickedProductIndex];
    clickedProduct.votes++;
  }

  // Generate three new random products
  displayRandomProducts();
}

// Event listener for "View Results" button click
function showResults() {
  // Sort the products based on votes received
  const sortedProducts = products.sort((a, b) => b.votes - a.votes);

  // Create arrays for labels and data
  const labels = sortedProducts.map((product) => product.name);
  const votesData = sortedProducts.map((product) => product.votes);
  const timesShownData = sortedProducts.map((product) => product.timesShown);

  // Remove the product container
  // productContainer.remove();

  // Create a chart canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'resultsChart';
  document.body.appendChild(canvas);

  // Draw the bar chart
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Votes',
          data: votesData,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Times Shown',
          data: timesShownData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Attach event listener to product container
productContainer.addEventListener('click', productClickHandler);

// Display initial random products
displayRandomProducts();}