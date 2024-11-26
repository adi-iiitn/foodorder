let currentRestaurant = '';
let cart = [];
let discount = 0;  // To store the discount amount

// Mock Data for Products (Replace with actual data in production)
const restaurants = {
    restaurant1: [
        { name: 'Pizza', price: 200, img: 'pizza.jpg' },
        { name: 'Burger', price: 100, img: 'burger.jpg' },
        { name: 'Pasta', price: 150, img: 'pasta.jpg' },
        { name: 'Salad', price: 80, img: 'salad.jpg' },
        { name: 'Fries', price: 50, img: 'fries.jpg' }
    ],
    // ... Add other restaurants here
};

// Mock Data for Authentication (For demo purposes)
const validCredentials = {
    username: 'user',
    password: 'password'
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === validCredentials.username && password === validCredentials.password) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('foodPage').style.display = 'block';
    } else {
        alert('Invalid credentials');
    }
}

function loadRestaurantMenu(restaurant) {
    currentRestaurant = restaurant;
    document.getElementById('foodPage').style.display = 'none';
    document.getElementById('menuPage').style.display = 'block';
    
    // Initially show all products
    displayProducts(restaurants[restaurant]);
}

function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear the list first
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <p>${product.name}</p>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add product to cart
function addToCart(productName, price) {
    cart.push({ productName, price });
    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `${item.productName} - ₹${item.price}`;
        cartItemsDiv.appendChild(cartItemDiv);
        total += item.price;
    });

    // Apply discount
    let discountedTotal = total - (total * discount);
    document.getElementById('totalAmount').innerText = `Total: ₹${discountedTotal.toFixed(2)}`;
    
    // Update the cart count notification
    document.getElementById('cartCount').innerText = cart.length;
}

function applyCoupon() {
    const couponCode = document.getElementById('couponCode').value.trim();
    const couponMessage = document.getElementById('couponMessage');

    // Check for valid coupon codes (you can add more coupon codes as needed)
    if (couponCode === "DISCOUNT10") {
        discount = 0.1;  // 10% discount
        couponMessage.innerText = "Coupon applied! 10% discount.";
    } else if (couponCode === "DISCOUNT20") {
        discount = 0.2;  // 20% discount
        couponMessage.innerText = "Coupon applied! 20% discount.";
    } else {
        discount = 0;  // No discount if coupon is invalid
        couponMessage.innerText = "Invalid coupon code.";
    }

    updateCart();  // Recalculate the total with the discount
}

function checkout() {
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('checkoutPage').style.display = 'block';
}

function viewCart() {
    document.getElementById('menuPage').style.display = 'none';
    document.getElementById('cartPage').style.display = 'block';
}

function goBackToMenu() {
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('menuPage').style.display = 'block';
}
