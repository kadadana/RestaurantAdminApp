class Product {
    constructor(id, name, category, description, price, isActive, path) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.isActive = isActive;
        this.path = path;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getCategory() {
        return this.category;
    }
    setCategory(category) {
        this.category = category;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    getPrice() {
        return this.price;
    }
    setPrice(price) {
        this.price = price;
    }
    getIsActive() {
        return this.isActive;
    }
    setIsActive(isActive) {
        this.isActive = isActive;
    }
    getPath() {
        return this.path;
    }
    setPath(path) {
        this.path = path;
    }

}

export default Product;

