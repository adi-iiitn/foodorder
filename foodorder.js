let currentRestaurant = '';
let cart = [];
let discount = 0;

// Mock Data for Coupon Codes (Replace with actual logic in production)
const validCoupons = {
    'DISCOUNT10': 10,   // 10% discount
    'DISCOUNT20': 20,   // 20% discount
};

// Mock Data for Products (Replace with actual data in production)
const restaurants = {
    restaurant1: [
        { name: 'Pizza', price: 200, img: 'pizza.jpg' },
        { name: 'Burger', price: 100, img: 'burger.jpg' },
        { name: 'Pasta', price: 150, img: 'pasta.jpg' },
        { name: 'Salad', price: 80, img: 'salad.jpg' },
        { name: 'Fries', price: 50, img: 'fries.jpg' }
    ],
    restaurant2: [
        { name: 'Noodles', price: 120, img: 'noodles.jpg' },
        { name: 'Spring Rolls', price: 100, img: 'springrolls.jpg' },
        { name: 'Dim Sum', price: 180, img: 'dimsum.jpg' },
        { name: 'Soup', price: 80, img: 'soup.jpg' },
        { name: 'Fried Rice', price: 150, img: 'friedrice.jpg' }
    ],
    restaurant3: [
        { name: 'Tacos', price: 150, img: 'tacos.jpg' },
        { name: 'Burrito', price: 180, img: 'burrito.jpg' },
        { name: 'Quesadilla', price: 220, img: 'quesadilla.jpg' },
        { name: 'Nachos', price: 120, img: 'nachos.jpg' },
        { name: 'Guacamole', price: 80, img: 'guacamole.jpg' }
    ],
    restaurant4: [
        { name: 'Sushi', price: 300, img: 'sushi.jpg' },
        { name: 'Ramen', price: 250, img: 'ramen.jpg' },
        { name: 'Tempura', price: 200, img: 'tempura.jpg' },
        { name: 'Gyoza', price: 150, img: 'gyoza.jpg' },
        { name: 'Miso Soup', price: 100, img: 'misosoup.jpg' }
    ],
    restaurant5: [
        { name: 'Steak', price: 500, img: 'steak.jpg' },
        { name: 'Burger', price: 350, img: 'burger.jpg' },
        { name: 'Lobster', price: 800, img: 'lobster.jpg' },
        { name: 'Chicken Wings', price: 250, img: 'wings.jpg' },
        { name: 'Pork Ribs', price: 600, img: 'ribs.jpg' }
    ]
};

// Function to login
function login() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('foodPage').style.display = 'block';
}

// Function to load restaurant menu
function loadRestaurantMenu(restaurant) {
    currentRestaurant = restaurant;
    const menu = restaurants[restaurant];
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = '';

    menu.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productListDiv.appendChild(productDiv);
    });

    document.getElementById('foodPage').style.display = 'none';
    document.getElementById('menuPage').style.display = 'block';
}

// Function to search products
function searchProducts() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const menu = restaurants[currentRestaurant];
    const filteredMenu = menu.filter(product => product.name.toLowerCase().includes(searchQuery));

    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = '';

    filteredMenu.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productListDiv.appendChild(productDiv);
    });
}

// Function to add item to cart
function addToCart(productName, price) {
    cart.push({ productName, price });
    updateCart();
}

// Function to update cart and total price
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
    if (discount > 0) {
        total -= (total * discount) / 100;
    }

    // Update total amount
    document.getElementById('totalAmount').innerText = `Total: ₹${total.toFixed(2)}`;

    // Update cart count notification
    document.getElementById('cartCount').innerText = cart.length;
}

// Function to view cart
function viewCart() {
    document.getElementById('menuPage').style.display = 'none';
    document.getElementById('cartPage').style.display = 'block';
}

// Function to apply coupon
function applyCoupon() {
    const couponCode = document.getElementById('couponCode').value.toUpperCase();
    const couponMessage = document.getElementById('couponMessage');
    if (validCoupons[couponCode]) {
        discount = validCoupons[couponCode];
        couponMessage.textContent = `Coupon applied! You get ${discount}% off.`;
        updateCart();  // Update cart total with discount
    } else {
        discount = 0;
        couponMessage.textContent = 'Invalid coupon code.';
    }
}

// Function to go back to the menu page
function goBackToMenu() {
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('menuPage').style.display = 'block';
}

function checkout() {
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('checkoutPage').style.display = 'block';
}
