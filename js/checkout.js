// Checkout page JavaScript

// Load checkout items and summary
function loadCheckoutSummary() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTax = document.getElementById('checkout-tax');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (!checkoutItems) return;
    
    // Update cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    // Display cart items
    let itemsHTML = '';
    cart.forEach(item => {
        itemsHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.title}" class="me-2" style="width: 40px; height: 40px; object-fit: cover; border-radius: 5px;">
                    <div>
                        <div class="fw-bold" style="font-size: 0.9rem;">${item.title}</div>
                        <small class="text-muted">الكمية: ${item.quantity}</small>
                    </div>
                </div>
                <div class="fw-bold">${formatPrice(item.price * item.quantity)}</div>
            </div>
        `;
    });
    
    checkoutItems.innerHTML = itemsHTML;
    
    // Calculate totals
    const subtotal = getCartTotal();
    const tax = subtotal * 0.15;
    const total = subtotal + tax;
    
    checkoutSubtotal.textContent = formatPrice(subtotal);
    checkoutTax.textContent = formatPrice(tax);
    checkoutTotal.textContent = formatPrice(total);
}

// Handle payment method change
function handlePaymentMethodChange() {
    const creditCardDetails = document.getElementById('credit-card-details');
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (selectedMethod === 'credit_card') {
        creditCardDetails.style.display = 'block';
        // Make credit card fields required
        document.getElementById('cardNumber').required = true;
        document.getElementById('expiryDate').required = true;
        document.getElementById('cvv').required = true;
        document.getElementById('cardName').required = true;
    } else {
        creditCardDetails.style.display = 'none';
        // Remove required attribute from credit card fields
        document.getElementById('cardNumber').required = false;
        document.getElementById('expiryDate').required = false;
        document.getElementById('cvv').required = false;
        document.getElementById('cardName').required = false;
    }
}

// Format card number input
function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

// Format expiry date input
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// Validate form
function validateForm() {
    const form = document.getElementById('checkout-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate card number if credit card is selected
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    if (selectedMethod === 'credit_card') {
        const cardNumber = document.getElementById('cardNumber');
        const cvv = document.getElementById('cvv');
        const expiryDate = document.getElementById('expiryDate');
        
        if (cardNumber.value.replace(/\s/g, '').length < 16) {
            cardNumber.classList.add('is-invalid');
            isValid = false;
        }
        
        if (cvv.value.length < 3) {
            cvv.classList.add('is-invalid');
            isValid = false;
        }
        
        if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
            expiryDate.classList.add('is-invalid');
            isValid = false;
        }
    }
    
    return isValid;
}

// Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        showNotification('يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'danger');
        return;
    }
    
    const placeOrderBtn = document.getElementById('place-order-btn');
    const originalText = placeOrderBtn.innerHTML;
    
    // Show loading state
    placeOrderBtn.disabled = true;
    placeOrderBtn.innerHTML = '<div class="loading me-2"></div>جاري معالجة الطلب...';
    
    // Simulate order processing
    setTimeout(() => {
        // Create order object
        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: [...cart],
            customer: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                country: document.getElementById('country').value,
                postalCode: document.getElementById('postalCode').value
            },
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
            subtotal: getCartTotal(),
            tax: getCartTotal() * 0.15,
            total: getCartTotal() * 1.15,
            status: 'confirmed'
        };
        
        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        localStorage.removeItem('cart');
        cart = [];
        updateCartCount();
        
        // Show success message
        showNotification('تم تأكيد طلبك بنجاح! سيتم إرسال تفاصيل التحميل إلى بريدك الإلكتروني', 'success');
        
        // Redirect to success page or home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    }, 2000);
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    // Only run on checkout page
    if (!window.location.pathname.includes('checkout.html')) return;
    
    // Load checkout summary
    loadCheckoutSummary();
    
    // Set up payment method change handlers
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', handlePaymentMethodChange);
    });
    
    // Set up card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function() {
            formatCardNumber(this);
        });
    }
    
    // Set up expiry date formatting
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', function() {
            formatExpiryDate(this);
        });
    }
    
    // Set up CVV input (numbers only)
    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 4);
        });
    }
    
    // Set up form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Remove invalid class on input
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
    
    // Initial payment method setup
    handlePaymentMethodChange();
});

// Export functions
window.loadCheckoutSummary = loadCheckoutSummary;
window.handleFormSubmission = handleFormSubmission;
