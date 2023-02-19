class ViewController {
  constructor() {
    window.addEventListener("hashchange", this.changeMainPage);
    window.addEventListener("load", this.changeMainPage);
    this.dunerManager = new DunerManager();
    this.cartManager = new CartManager();
  }

  changeMainPage = () => {
    let hash = window.location.hash.slice(1);

    let menu = document.getElementById("menu");
    let cart = document.getElementById("cart");
    let order = document.getElementById("order");

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
      case "cart":
        this.renderCartPage();
        break;
    }
  };

  renderDuners = (dunerList, container) => {
    container.innerHTML = "";
    let cartCount = document.getElementById("cartCount");

    dunerList.forEach((duner) => {
      let card = createElement("div");
      card.classList.add("card");

      let img = createElement("img");
      img.src = duner.image;
      img.style.width = "230px";

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
      count.style.width = "100px";

      let addToCart = createElement("button");
      addToCart.innerText = "Add to Cart";
      addToCart.addEventListener("click", () => {
        this.cartManager.addToCartt(duner, count.value);
        cartCount.innerText = Number(cartCount.innerText) + Number(count.value);
      });

      card.append(img, name, weight, category, price, count, addToCart);

      container.appendChild(card);
    });
  };

  renderMenuPage = () => {
    let searchInput = document.getElementById("searhInput");

    searchInput.addEventListener("input", (e) => {
      let result = this.dunerManager.search(e.target.value);

      this.renderDuners(result, dunerContainer);
    });

    let dunerContainer = document.querySelector("#menu .container");

    this.renderDuners(this.dunerManager.dunerList, dunerContainer);
  };

  renderCartPage = () => {

        let cartPage = document.getElementsByClassName(".cartContainer");

        let cartItemsList = createElement("ol");
;
         this.cartManager.cartItems.forEach(cartItem => {

            let row = createElement("li");

            let name = createElement("span");
            name.innerText = cartItem.name;

            let price = createElement("span");
            price.innerText = cartItem.price;

            let count = createElement("span");
            count.type = "number";
            count.innerText = cartItem.count;

            let delBtn = createElement("button");
            delBtn.innerText = "X";


            row.append(
                name,
                price,
                count,
                delBtn
            )

            cartItemsList.appendChild(row);
         })
  }
}

let viewController = new ViewController();
