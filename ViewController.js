class ViewController {
  constructor() {
    window.addEventListener("hashchange", this.changeMainPage);
    window.addEventListener("load", this.changeMainPage);
    this.dunerManager = new DunerManager();
  }

  changeMainPage = () => {
    let hash = window.location.hash.slice(1);
    
    let menu = document.getElementById("menu");
    let cart = document.getElementById("cart");
    let order = document.getElementById("order");
    let cartCount = document.getElementById("cartCount");

    if (hash === "menu") {
      menu.style.display = "flex";
      cart.style.display = "none";
      order.style.display = "none";
    } else if (hash === "cart") {
      menu.style.display = "none";
      cart.style.display = "flex";
      order.style.display = "none";
    } else if (hash === "order") {
      menu.style.display = "none";
      cart.style.display = "none";
      order.style.display = "flex";
    }

   

    switch (hash) {
      case "menu":
        this.renderMenuPage();
        break;
       
    }
  };

  renderDuners = (dunerList, container) => {
        container.innerHTML = "";

        dunerList.forEach((duner) => {
        let card = createElement("div");
        card.classList.add("card");
    
        let img = createElement("img");
        img.src = duner.image;
        img.style.width = "230px"
    
        let name = createElement("div");
        name.innerText = duner.name;
    
        let weight = createElement("div");
        weight.innerText = duner.weight;
    
        let category = createElement("div");
        category.innerText = duner.category;
    
        let price = createElement("div");
        price.innerText = duner.price;
    
        let count = createElement("input");
        count.type = "number";
        count.value = 1;
        count.style.width = "100px"
    
        let addToCart = createElement("button");
        addToCart.innerText = "Add to Cart";
    
        card.append(img, name, weight, category, price, count, addToCart);
    
        container.appendChild(card);
      });
  }

  renderMenuPage = () => {
    let searchInput = document.getElementById("searhInput");

    searchInput.addEventListener("input", (e) => {
        let result = this.dunerManager.search(e.target.value);
        
        this.renderDuners(result, dunerContainer);
    })

    let dunerContainer = document.querySelector("#menu .container");
    
    this.renderDuners(this.dunerManager.dunerList, dunerContainer);
    
  }  
}

let viewController = new ViewController();
