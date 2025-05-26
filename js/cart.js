// Cart page JavaScript

let appliedCoupon = null;
const coupons = {
    'WELCOME10': { discount: 10, type: 'percentage', description: '10% discount for new customers' },
    'SAVE20': { discount: 20, type: 'percentage', description: '20% discount on all products' },
    'FIXED50': { discount: 50, type: 'fixed', description: '$50 discount' }
};

// Clear all cart items
function clearAllCart() {
    // Show confirmation dialog
    if (confirm('Are you sure you want to remove all items from your cart? This action cannot be undone.')) {
        // Clear cart array
        cart = [];

        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count in navbar
        updateCartCount();

        // Reload cart display
        loadCartItems();

        // Reload recommended products
        loadRecommendedProducts();

        // Show success notification
        showNotification('All items have been removed from your cart', 'success');
    }
}

// Load cart items
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const orderSummary = document.getElementById('order-summary');
    const cartHeader = document.getElementById('cart-header');

    if (!cartItemsContainer) return;

    // Update cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.classList.add('d-none');
        emptyCart.classList.remove('d-none');
        orderSummary.classList.add('d-none');
        if (cartHeader) cartHeader.style.display = 'none';
        return;
    }

    cartItemsContainer.classList.remove('d-none');
    emptyCart.classList.add('d-none');
    orderSummary.classList.remove('d-none');
    if (cartHeader) cartHeader.style.display = 'flex';

    let cartHTML = '';

    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-md-2 col-4 mb-3 mb-md-0">
                        <img src="${item.image}" alt="${item.title}" class="img-fluid rounded">
                    </div>
                    <div class="col-md-4 col-8 mb-3 mb-md-0">
                        <h5 class="mb-1">${item.title}</h5>
                        <p class="text-muted mb-0">Digital Product</p>
                    </div>
                    <div class="col-md-2 col-6 mb-3 mb-md-0">
                        <div class="quantity-controls">
                            <button type="button" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" value="${item.quantity}" min="1"
                                   onchange="updateCartQuantity(${item.id}, parseInt(this.value))" readonly>
                            <button type="button" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2 col-3 mb-3 mb-md-0">
                        <div class="fw-bold">${formatPrice(item.price)}</div>
                    </div>
                    <div class="col-md-2 col-3 mb-3 mb-md-0 text-end">
                        <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHTML;
    updateOrderSummary();
}

// Update order summary
function updateOrderSummary() {
    const subtotal = getCartTotal();
    const tax = subtotal * 0.15; // 15% tax
    let discount = 0;

    if (appliedCoupon) {
        if (appliedCoupon.type === 'percentage') {
            discount = subtotal * (appliedCoupon.discount / 100);
        } else {
            discount = appliedCoupon.discount;
        }
    }

    const total = subtotal + tax - discount;

    // Update display
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('tax').textContent = formatPrice(tax);
    document.getElementById('total').textContent = formatPrice(total);

    // Show/hide discount row
    const discountRow = document.getElementById('discount-row');
    if (discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('discount').textContent = `-${formatPrice(discount)}`;
    } else {
        discountRow.style.display = 'none';
    }

    // Update checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (cart.length === 0) {
        checkoutBtn.classList.add('disabled');
        checkoutBtn.setAttribute('href', '#');
    } else {
        checkoutBtn.classList.remove('disabled');
        checkoutBtn.setAttribute('href', 'checkout.html');
    }
}

// Apply coupon
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.trim().toUpperCase();

    if (!couponCode) {
        showNotification('Please enter a coupon code', 'warning');
        return;
    }

    if (coupons[couponCode]) {
        appliedCoupon = coupons[couponCode];
        showNotification(`Coupon applied: ${appliedCoupon.description}`, 'success');
        document.getElementById('coupon-code').value = '';
        updateOrderSummary();
    } else {
        showNotification('Invalid coupon code', 'danger');
    }
}

// Load recommended products
function loadRecommendedProducts() {
    const recommendedContainer = document.getElementById('recommended-products');
    if (!recommendedContainer) return;

    // Get random products that are not in cart
    const cartProductIds = cart.map(item => item.id);
    const availableProducts = products.filter(product => !cartProductIds.includes(product.id));
    const recommendedProducts = availableProducts.sort(() => 0.5 - Math.random()).slice(0, 3);

    recommendedContainer.innerHTML = recommendedProducts.map(generateProductCard).join('');
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    // Only run on cart page
    if (!window.location.pathname.includes('cart.html')) return;

    // Load cart items
    loadCartItems();

    // Load recommended products
    loadRecommendedProducts();

    // Set up coupon functionality
    const applyCouponBtn = document.getElementById('apply-coupon');
    const couponInput = document.getElementById('coupon-code');

    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', applyCoupon);
    }

    if (couponInput) {
        couponInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyCoupon();
            }
        });
    }
});

// Override cart functions to update display
const originalUpdateCartQuantity = window.updateCartQuantity;
const originalRemoveFromCart = window.removeFromCart;

window.updateCartQuantity = function(productId, quantity) {
    originalUpdateCartQuantity(productId, quantity);
    loadCartItems();
};

window.removeFromCart = function(productId) {
    originalRemoveFromCart(productId);
    loadCartItems();
    loadRecommendedProducts(); // Refresh recommendations
};

// Export functions
window.loadCartItems = loadCartItems;
window.applyCoupon = applyCoupon;
window.clearAllCart = clearAllCart;
