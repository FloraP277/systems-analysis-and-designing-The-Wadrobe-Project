// POS (Point of Sale) JavaScript
// Handle product selection, cart management, and checkout

const products = [
    { id: 1, sku: 'WP-VD-001', name: 'Vintage Levi\'s 501 Jeans', category: 'vintage-denim', price: 65.00, stock: 12, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300' },
    { id: 2, sku: 'WP-OW-015', name: '80s Leather Jacket', category: 'outerwear', price: 125.00, stock: 5, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300' },
    { id: 3, sku: 'WP-DR-032', name: 'Floral Summer Dress', category: 'dresses', price: 45.00, stock: 8, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300' },
    { id: 4, sku: 'WP-AC-087', name: 'Designer Handbag', category: 'accessories', price: 120.00, stock: 3, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300' },
    { id: 5, sku: 'WP-TP-042', name: 'Vintage Band T-Shirt', category: 'tops', price: 25.00, stock: 15, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300' },
    { id: 6, sku: 'WP-VD-018', name: 'High-Waisted Jeans', category: 'vintage-denim', price: 55.00, stock: 7, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300' },
    { id: 7, sku: 'WP-AC-102', name: 'Vintage Scarf', category: 'accessories', price: 15.00, stock: 3, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=300' },
    { id: 8, sku: 'WP-OW-029', name: '90s Windbreaker', category: 'outerwear', price: 48.00, stock: 5, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300' },
];

let cart = [];
let discountPercent = 0;
const TAX_RATE = 0.085; // 8.5%

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('barcodeInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProduct();
        }
    });
    
    document.getElementById('categoryQuickFilter')?.addEventListener('change', filterProducts);
}

function loadProducts(filter = '') {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    const filteredProducts = filter 
        ? products.filter(p => p.category === filter)
        : products;
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 col-sm-6 mb-3';
        productCard.innerHTML = `
            <div class="card product-card h-100" onclick="addToCart(${product.id})">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body p-2">
                    <h6 class="card-title mb-1">${product.name}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-primary fw-bold">$${product.price.toFixed(2)}</span>
                        <small class="text-muted">Stock: ${product.stock}</small>
                    </div>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

function filterProducts() {
    const filter = document.getElementById('categoryQuickFilter').value;
    loadProducts(filter);
}

function searchProduct() {
    const searchTerm = document.getElementById('barcodeInput').value.trim();
    if (!searchTerm) return;
    
    const product = products.find(p => 
        p.sku.toLowerCase() === searchTerm.toLowerCase() ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (product) {
        addToCart(product.id);
        document.getElementById('barcodeInput').value = '';
    } else {
        alert('Product not found!');
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check stock
    const cartItem = cart.find(item => item.id === productId);
    const currentQty = cartItem ? cartItem.quantity : 0;
    
    if (currentQty >= product.stock) {
        alert('Insufficient stock!');
        return;
    }
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    
    const product = products.find(p => p.id === productId);
    const newQty = item.quantity + change;
    
    if (newQty <= 0) {
        removeFromCart(productId);
    } else if (newQty <= product.stock) {
        item.quantity = newQty;
        updateCart();
    } else {
        alert('Insufficient stock!');
    }
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    if (!cartItemsDiv) return;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <p class="text-muted text-center py-4">
                <i class="bi bi-cart-x fs-1"></i><br>
                Cart is empty
            </p>
        `;
        document.getElementById('checkoutBtn').disabled = true;
        document.querySelectorAll('.btn-primary, .btn-success').forEach(btn => {
            if (btn.id !== 'checkoutBtn') btn.disabled = true;
        });
    } else {
        cartItemsDiv.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small class="text-muted">$${item.price.toFixed(2)} × ${item.quantity}</small>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">
                            <i class="bi bi-dash"></i>
                        </button>
                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        document.getElementById('checkoutBtn').disabled = false;
        document.querySelectorAll('.btn-primary, .btn-success').forEach(btn => {
            btn.disabled = false;
        });
    }
    
    updateTotals();
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = subtotal * (discountPercent / 100);
    const discountedSubtotal = subtotal - discount;
    const tax = discountedSubtotal * TAX_RATE;
    const total = discountedSubtotal + tax;
    
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('discount').textContent = '-$' + discount.toFixed(2);
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

function applyDiscount() {
    const discountInput = document.getElementById('discountInput');
    discountPercent = parseFloat(discountInput.value) || 0;
    
    if (discountPercent < 0 || discountPercent > 100) {
        alert('Discount must be between 0 and 100%');
        discountPercent = 0;
        discountInput.value = 0;
        return;
    }
    
    updateTotals();
}

function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Clear all items from cart?')) {
        cart = [];
        discountPercent = 0;
        document.getElementById('discountInput').value = 0;
        updateCart();
    }
}

function processPayment(method) {
    if (cart.length === 0) return;
    
    const total = parseFloat(document.getElementById('total').textContent.replace('$', ''));
    const transactionId = 'TXN-' + Math.floor(Math.random() * 10000);
    const now = new Date();
    
    // Update modal content
    document.getElementById('transactionId').textContent = transactionId;
    document.getElementById('paymentMethod').textContent = method === 'cash' ? 'Cash' : 'Credit Card';
    document.getElementById('amountPaid').textContent = '$' + total.toFixed(2);
    document.getElementById('transactionTime').textContent = now.toLocaleString();
    
    // Show success modal
    const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
    modal.show();
    
    // In real implementation: update inventory, record sale, update CRM
    console.log('Payment processed:', {
        transactionId,
        method,
        total,
        items: cart,
        timestamp: now
    });
}

function printReceipt() {
    alert('Receipt printing...\n\nReceipt would include:\n• Transaction details\n• Itemized list\n• Payment information\n• Store information');
    console.log('Receipt printed');
}

function newTransaction() {
    cart = [];
    discountPercent = 0;
    document.getElementById('discountInput').value = 0;
    document.getElementById('customerSelect').value = '';
    updateCart();
}
