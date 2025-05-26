// Main JavaScript file for Digital Products Store

// Sample products data
const products = [
    {
        id: 1,
        title: "Complete Web Development Course",
        description: "Comprehensive course to learn web development from scratch to professional level",
        price: 299,
        oldPrice: 399,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "courses",
        rating: 4.8,
        reviews: 156,
        featured: true,
        features: [
            "Over 50 hours of content",
            "Advanced practical projects",
            "Certified completion",
            "Lifetime technical support"
        ]
    },
    {
        id: 2,
        title: "Digital Marketing Book",
        description: "Complete guide to mastering digital marketing arts and reaching customers",
        price: 89,
        oldPrice: 129,
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "ebooks",
        rating: 4.6,
        reviews: 89,
        featured: true,
        features: [
            "Over 300 pages",
            "Modern strategies",
            "Practical examples",
            "Free updates"
        ]
    },
    {
        id: 3,
        title: "Project Management Software",
        description: "Advanced software for project management and team organization",
        price: 199,
        oldPrice: 299,
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "software",
        rating: 4.9,
        reviews: 234,
        featured: true,
        features: [
            "Easy-to-use interface",
            "Detailed reports",
            "Integration with other tools",
            "Multi-language support"
        ]
    },
    {
        id: 4,
        title: "Professional Design Templates",
        description: "Collection of professional templates for websites and applications",
        price: 149,
        oldPrice: 199,
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "templates",
        rating: 4.7,
        reviews: 112,
        featured: false,
        features: [
            "Over 50 templates",
            "Responsive design",
            "Open source files",
            "Comprehensive documentation"
        ]
    },
    {
        id: 5,
        title: "Artificial Intelligence Course",
        description: "Learn fundamentals and applications of artificial intelligence and machine learning",
        price: 399,
        oldPrice: 499,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "courses",
        rating: 4.9,
        reviews: 78,
        featured: true,
        features: [
            "Advanced content",
            "Practical projects",
            "Modern tools",
            "Interactive community"
        ]
    },
    {
        id: 6,
        title: "Animation Graphics Pack",
        description: "Comprehensive collection of animations and icons",
        price: 79,
        oldPrice: 119,
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "graphics",
        rating: 4.5,
        reviews: 156,
        featured: false,
        features: [
            "Over 200 graphics",
            "Multiple formats",
            "High quality",
            "Commercial use"
        ]
    },
    {
        id: 7,
        title: "Mobile App Development Course",
        description: "Learn to build native mobile apps for iOS and Android platforms",
        price: 249,
        oldPrice: 349,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "courses",
        rating: 4.7,
        reviews: 203,
        featured: true,
        features: [
            "iOS and Android development",
            "Real-world projects",
            "App Store deployment",
            "Career guidance"
        ]
    },
    {
        id: 8,
        title: "E-commerce Business Guide",
        description: "Complete guide to starting and scaling your online business",
        price: 59,
        oldPrice: 99,
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "ebooks",
        rating: 4.4,
        reviews: 127,
        featured: false,
        features: [
            "Step-by-step guide",
            "Marketing strategies",
            "Legal considerations",
            "Case studies"
        ]
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in navigation
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Add product to cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Show success message
    showNotification('Product added to cart successfully!', 'success');
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Refresh cart page if we're on it
    if (window.location.pathname.includes('cart.html')) {
        loadCartItems();
    }
}

// Update cart item quantity
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();

            // Refresh cart page if we're on it
            if (window.location.pathname.includes('cart.html')) {
                loadCartItems();
            }
        }
    }
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 100px; left: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Format price
function formatPrice(price) {
    return `$${price}`;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star text-warning"></i>';
    }

    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt text-warning"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star text-warning"></i>';
    }

    return starsHTML;
}

// Generate product card HTML
function generateProductCard(product) {
    const discountPercentage = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card product-card h-100">
                ${discountPercentage > 0 ? `<div class="badge bg-danger position-absolute" style="top: 10px; left: 10px; z-index: 1;">${discountPercentage}% OFF</div>` : ''}
                <img src="${product.image}" class="card-img-top" alt="${product.title}"
                     onerror="this.src='https://via.placeholder.com/300x200/007bff/ffffff?text=${encodeURIComponent(product.title)}'; this.onerror=null;"
                     loading="lazy">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="product-rating mb-2">
                        ${generateStarRating(product.rating)}
                        <span class="text-muted ms-2">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        ${formatPrice(product.price)}
                        ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                    </div>
                    <div class="d-flex gap-2 mt-auto">
                        <button class="btn btn-primary flex-grow-1" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus me-2"></i>Add to Cart
                        </button>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline-primary">
                            <i class="fas fa-eye"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    const featuredProducts = products.filter(product => product.featured).slice(0, 3);
    featuredContainer.innerHTML = featuredProducts.map(generateProductCard).join('');
}

// Newsletter subscription
function handleNewsletterSubmission(event) {
    event.preventDefault();

    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email) {
        showNotification('Please enter a valid email address', 'warning');
        return;
    }

    // Simulate newsletter subscription
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loading me-2"></div>Subscribing...';

    setTimeout(() => {
        // Save email to localStorage (in real app, send to server)
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers')) || [];

        if (subscribers.includes(email)) {
            showNotification('This email is already subscribed!', 'info');
        } else {
            subscribers.push(email);
            localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
            showNotification('Successfully subscribed! Thank you', 'success');
            emailInput.value = '';
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 1500);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

    // Load featured products on homepage
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadFeaturedProducts();
    }

    // Newsletter form handler
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.product-card, .feature-box, .card').forEach(el => {
        observer.observe(el);
    });

    // Add animation to footer elements
    document.querySelectorAll('.footer-widget, .social-link, .contact-item').forEach(el => {
        observer.observe(el);
    });
});

// Export functions for use in other files
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.getCartTotal = getCartTotal;
window.formatPrice = formatPrice;
window.generateStarRating = generateStarRating;
window.generateProductCard = generateProductCard;
window.showNotification = showNotification;
window.products = products;
window.cart = cart;
