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
      case "order":
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
      count.min = "1";
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
    let cartPage = document.querySelector(".cartContainer");
    cartPage.innerHTML = "";

    if (this.cartManager.cartItems.length) {
      let cartCount = document.getElementById("cartCount");
      let cartItemsList = createElement("ol");
      let sum = 0;

      this.cartManager.cartItems.forEach((cartItem) => {
        let row = createElement("li");

        let name = createElement("span");
        name.innerText = cartItem.name;

        let price = createElement("span");
        price.innerText = cartItem.price;

        let count = createElement("input");
        count.type = "number";
        count.min = "1";
        count.value = cartItem.count;
        count.addEventListener("input", (e) => {
          this.cartManager.editCartItems(cartItem, Number(e.target.value));
          cartCount.innerText = Number(cartCount.innerText) + 1;
        });

        sum += Number(cartItem.price) * Number(cartItem.count);

        let delBtn = createElement("button");
        delBtn.addEventListener("click", () => {
          this.cartManager.editCartItems(cartItem, 0);
          row.parentElement.removeChild(row);
          let newSum = document.getElementById("labelTotal");
          newSum.innerText = this.cartManager.getTotalSum();
        });
        delBtn.innerText = "X";

        row.append(name, price, count, delBtn);

        cartItemsList.appendChild(row);
      });

      cartPage.append(cartItemsList);

      let orderInfo = createElement("div");
      let label = createElement("span");
      label.id = "labelTotal";
      label.innerText = `Total: ${sum.toFixed(2)}`;

      let orderButton = createElement("button");
      orderButton.innerText = "Order";
      orderButton.addEventListener("click", () => {
        window.location.hash = "order";
      });

      orderInfo.append(label, orderButton);

      cartPage.appendChild(orderInfo);
    } else {
      cartPage.append(
        (createElement("p").innerText = "Изберете продукти от менюто!")
      );
    }
  };

  renderOrderPage = () => {

    let deliveryForm = document.getElementById("deliveryButton");

    deliveryForm.addEventListener("submit", (event) => {
        // event.preventDefault();
        console.log(event.target);
        
        // this.cartManager.deliver(event.currentTarget.address.value);
    })

  };
}

let viewController = new ViewController();
