class CartItem {
    constructor(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }
}


class CartManager {

    cartItems = [];

    addToCartt = (duner, count) => {

        let dunerInCart = this.cartItems.find(cartItem => cartItem.name === duner.name);

        if(dunerInCart){
            dunerInCart.count = Number(dunerInCart.count) + Number(count);
        } else {
            this.cartItems.push(new CartItem(duner.name, duner.price, count));
        }
    }
}