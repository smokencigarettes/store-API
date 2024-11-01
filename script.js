let mainContainer = document.querySelector("main");
let navContainer = document.querySelector("nav");

function getCategories(){
  fetch("https://fakestoreapi.com/products/categories")
    .then(response => response.json())
    .then(categories => {
      createButtons(categories);
      createAllButton();
    })
    .catch(error => {
      mainContainer.insertAdjacentHTML("beforeend", "<h2>Error: the server does not respond<h2>")
    })
}

function createAllButton(){
  let allButton = document.createElement("button");
  allButton.textContent = "Tutti";
  navContainer.append(allButton);
  getAllProducts();
}

function createButtons(categories){
  categories.forEach(category => {
    let buttonCategory = document.createElement("button");
    buttonCategory.textContent = category;
    navContainer.append(buttonCategory);
  });
}

function getAllProducts(){
  fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(products => createProducts(products));

}

function getProducts(category){
  fetch(`https://fakestoreapi.com/products/category/${category}`)
  .then(response => response.json())
  .then(products => createProducts(products));
}

function createProducts(products){
  mainContainer.innerHTML = "";
  products.forEach(product => {
    let productContainer = document.createElement("article");
    
    let articleTitle = document.createElement("h2");
    articleTitle.textContent = product.title;

    let articleDescription = document.createElement("p");
    articleDescription.textContent = product.description;
    
    let articleImage = document.createElement("img");
    articleImage.src = product.image;
    
    let articlePrice = document.createElement("h4");
    articlePrice.textContent = product.price + "€";
    
    let articleCategory = document.createElement("h5")
    articleCategory.textContent = product.category;
    
    productContainer.append(articleCategory);
    productContainer.append(articleImage);
    productContainer.append(articleTitle);
    productContainer.append(articleDescription);
    productContainer.append(articlePrice);
    mainContainer.append(productContainer);
  })
}

navContainer.addEventListener("click", (e) => {
  if(e.target.tagName === "BUTTON"){
    if(e.target.textContent === "Tutti"){
      getAllProducts();
    }else{
      getProducts(e.target.textContent);
    }
  }
})


getCategories();