    'use strict';

    const productContainer = document.getElementById('productContainer');
    const productImages = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck","dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "water-can", "wine-glass"]

    // Constructor function for creating a product object
    function Product(name, imagePath) {
      this.name = name;
      this.imagePath = imagePath;
      this.timesShown = 0;
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
      const productIndices = getRandomProductIndices();

      for (let i = 0; i < productIndices.length; i++) {
        const productIndex = productIndices[i];
        const product = products[productIndex];
        const imageElement = document.getElementById(`product${i + 1}`);
        imageElement.src = product.imagePath;
        imageElement.alt = product.name;
        product.timesShown++;
      }
    }

    // Event listener for product click
    function productClickHandler(event) {
      // Generate three new random products
      displayRandomProducts();
    }

    // Attach event listener to product container
    productContainer.addEventListener('click', productClickHandler);

    // Display initial random products
    displayRandomProducts();
