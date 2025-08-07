const productCards = document.querySelectorAll(".product-card");
const bundleList = document.getElementById("bundle-list");
const subtotalEl = document.getElementById("subtotal");
const discountLabel = document.getElementById("discount-label");
const progressBar = document.getElementById("progress-bar");
const addToCartBtn = document.getElementById("add-to-cart");

const products = [
  { id: 1, title: "Tie-Dye Lounge Set", price: 150.0, image: "assets/photo-1432149877166-f75d49000351.jpg" },
  { id: 2, title: "Sunburst Tracksuit", price: 150.0, image: "assets/photo-1515886657613-9f3515b0c78f.jpg" },
  { id: 3, title: "Retro Red Streetwear", price: 150.0, image: "assets/photo-1529139574466-a303027.jpg" },
  { id: 4, title: "Urban Sportwear Combo", price: 150.0, image: "assets/photo-1550831107-1553da8c8464.jpg" },
  { id: 5, title: "Oversized Knit & Coat", price: 150.0, image: "assets/photo-1551029506-080b53b7f7b4.jpg" },
  { id: 6, title: "Chic Monochrome Blazer", price: 150.0, image: "assets/photo-1542060748-10c28b62716b.jpg" }
];

let selectedItems = [];

productCards.forEach((card, index) => {
  const btn = card.querySelector("button");
  btn.addEventListener("click", () => {
    const product = products[index];
    const found = selectedItems.find(item => item.id === product.id);

    if (found) {
      selectedItems = selectedItems.filter(item => item.id !== product.id);
      btn.textContent = "Add to Bundle";
      btn.classList.remove("added");
    } else {
      selectedItems.push(product);
      btn.textContent = "Added ✓";
      btn.classList.add("added");
    }

    updateBundle();
  });
});

function updateBundle() {
  bundleList.innerHTML = "";

  selectedItems.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${item.image}" alt="${item.title}" />
                    <div><p>${item.title}</p><p><s>$${item.price.toFixed(2)}</s></p></div>`;
    bundleList.appendChild(li);
  });

  progressBar.textContent = `${selectedItems.length}/3`;
  progressBar.style.width = `${(selectedItems.length / 3) * 100}%`;

  let subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
  if (selectedItems.length >= 3) {
    subtotal *= 0.7;
    discountLabel.textContent = "30% off applied!";
    addToCartBtn.disabled = false;
  } else {
    discountLabel.textContent = "Select 3 items";
    addToCartBtn.disabled = true;
  }

  subtotalEl.textContent = subtotal.toFixed(2);
}

addToCartBtn.addEventListener("click", () => {
  console.log("Selected Products:", selectedItems);
  alert("Bundle added to cart!");
});

