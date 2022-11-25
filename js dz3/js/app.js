window.products = [];

function filterProducts(search){
  const filteredProductsData = window.products.filter(function(productObj){
    return productObj.title.toLowerCase().indexOf(search) >= 0;
  })
  renderProducts(filteredProductsData);
}

function renderProducts(products){
const getProducts = products.reduce(function(acc, product){
  return acc +=  `<div class="card" style="width: 17rem;">
     <img class="card-img-top" src="${product.image}">
     <div class="card-body">
       <h5 class="card-title">${product.title}</h5>
       <p class="card-text">Category: ${product.category}</p>
       <p class="card-text text-danger">${product.price}</p>
     </div>
    </div>`;
},'')
document.querySelector('#products').innerHTML = getProducts;
}

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(function(data) {
    window.products = data;
    const filteredProducts = data.map(function(product){
      return {
        title: product.title, 
        image: product.image, 
        category: product.category,
        price: product.price
      }
    })
    console.log(filteredProducts);
    renderProducts(filteredProducts);
})

document.querySelector('#search').onkeyup = function(e){
  const searchValue = e.currentTarget.value.trim().toLowerCase();
  filterProducts(searchValue);
}