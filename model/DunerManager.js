class Duner {
    constructor(name, weight, category, price, image){
        
        this.name = name;
        this.weight = weight;
        this.category = category;
        this.price = price;
        this.image = image;
    }
}

class DunerManager {
    constructor(){
        this.dunerList = DATA.map(duner => new Duner(
            duner.name,
            duner.weight,
            duner.category,
            duner.price,
            duner.image));
    }

    search(keyword) {

        return this.dunerList.filter(duner => {
            return duner.name.toLowerCase().includes(keyword.trim().toLowerCase());
        })
    }
}