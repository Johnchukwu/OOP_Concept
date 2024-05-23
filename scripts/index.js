class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0).toFixed(2);
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.displayCart();
    }

    removeItem(productId) {
        const itemIndex = this.items.findIndex(item => item.product.id === productId);
        if (itemIndex !== -1) {
            this.items.splice(itemIndex, 1);
        }
        this.displayCart();
    }

    displayCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        this.items.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <span>${item.product.name} (x${item.quantity})</span>
                <span>$${item.getTotalPrice().toFixed(2)}</span>
                <button onclick="removeFromCart(${item.product.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        document.getElementById('cart-total').innerText = `Total Items: ${this.getTotalItems()}, Total Price: $${this.getTotalPrice()}`;
    }
}

const products = [
    new Product(1, 'Laptop', 999.99),
    new Product(2, 'Smartphone', 499.99),
    new Product(3, 'Headphones', 199.99),
    new Product(4, 'Tablet', 299.99),
    new Product(5, 'Smartwatch', 199.99),
    new Product(6, 'Desktop PC', 1199.99),
    new Product(7, 'Gaming Console', 399.99),
    new Product(8, 'Wireless Mouse', 49.99),
    new Product(9, 'Keyboard', 69.99),
    new Product(10, 'External Hard Drive', 89.99),
    new Product(11, 'Bluetooth Speaker', 129.99),
    new Product(12, 'Digital Camera', 549.99),
    new Product(13, 'E-Reader', 139.99)
];


const cart = new ShoppingCart();

function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.addItem(product, 1);
}

function removeFromCart(productId) {
    cart.removeItem(productId);
}

displayProducts();
