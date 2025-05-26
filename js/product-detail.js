// Product detail page JavaScript

let currentProduct = null;

// Get product ID from URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Load product details
function loadProductDetail() {
    const productId = getProductIdFromURL();
    currentProduct = products.find(p => p.id === productId);

    if (!currentProduct) {
        window.location.href = 'products.html';
        return;
    }

    // Update page title
    document.title = `${currentProduct.title} - Digital Products Store`;

    // Load product content
    loadProductContent();
    loadProductFeatures();
    loadRelatedProducts();
    loadReviews();
}

// Load main product content
function loadProductContent() {
    const contentContainer = document.getElementById('product-detail-content');
    if (!contentContainer) return;

    const discountPercentage = currentProduct.oldPrice ?
        Math.round(((currentProduct.oldPrice - currentProduct.price) / currentProduct.oldPrice) * 100) : 0;

    contentContainer.innerHTML = `
        <div class="col-lg-6 mb-4">
            <div class="position-relative">
                ${discountPercentage > 0 ? `<div class="badge bg-danger position-absolute" style="top: 20px; left: 20px; z-index: 1; font-size: 1rem;">${discountPercentage}% OFF</div>` : ''}
                <img src="${currentProduct.image}" alt="${currentProduct.title}" class="img-fluid product-detail-img">
            </div>
        </div>
        <div class="col-lg-6">
            <div class="product-detail-info">
                <h1 class="fw-bold mb-3">${currentProduct.title}</h1>

                <div class="product-rating mb-3">
                    ${generateStarRating(currentProduct.rating)}
                    <span class="text-muted ms-2">(${currentProduct.reviews} reviews)</span>
                </div>

                <div class="product-price mb-4">
                    <span class="h2 text-primary fw-bold">${formatPrice(currentProduct.price)}</span>
                    ${currentProduct.oldPrice ? `<span class="h4 text-muted text-decoration-line-through ms-3">${formatPrice(currentProduct.oldPrice)}</span>` : ''}
                </div>

                <p class="lead mb-4">${currentProduct.description}</p>

                <div class="product-features mb-4">
                    <h5 class="fw-bold mb-3">Product Features:</h5>
                    <ul class="list-unstyled">
                        ${currentProduct.features.map(feature => `<li class="mb-2"><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
                    </ul>
                </div>

                <div class="d-flex gap-3 mb-4">
                    <button class="btn btn-primary btn-lg flex-grow-1" onclick="addToCart(${currentProduct.id})">
                        <i class="fas fa-cart-plus me-2"></i>
                        Add to Cart
                    </button>
                    <button class="btn btn-success btn-lg" onclick="buyNow(${currentProduct.id})">
                        <i class="fas fa-bolt me-2"></i>
                        Buy Now
                    </button>
                </div>

                <div class="row text-center">
                    <div class="col-4">
                        <i class="fas fa-download fa-2x text-primary mb-2"></i>
                        <div class="small">Instant Download</div>
                    </div>
                    <div class="col-4">
                        <i class="fas fa-shield-alt fa-2x text-primary mb-2"></i>
                        <div class="small">Secure Payment</div>
                    </div>
                    <div class="col-4">
                        <i class="fas fa-headset fa-2x text-primary mb-2"></i>
                        <div class="small">24/7 Support</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load product features section
function loadProductFeatures() {
    const featuresContainer = document.getElementById('product-features');
    if (!featuresContainer) return;

    const features = [
        {
            icon: 'fas fa-download',
            title: 'Instant Download',
            description: 'Get the product immediately after completing the purchase'
        },
        {
            icon: 'fas fa-sync-alt',
            title: 'Free Updates',
            description: 'Get all future updates for free'
        },
        {
            icon: 'fas fa-headset',
            title: 'Technical Support',
            description: 'Support team available to help you anytime'
        },
        {
            icon: 'fas fa-certificate',
            title: 'Quality Guarantee',
            description: 'We guarantee product quality or money back'
        }
    ];

    featuresContainer.innerHTML = features.map(feature => `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="text-center">
                <i class="${feature.icon} fa-3x text-primary mb-3"></i>
                <h5 class="fw-bold">${feature.title}</h5>
                <p class="text-muted">${feature.description}</p>
            </div>
        </div>
    `).join('');
}

// Load related products
function loadRelatedProducts() {
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;

    // Get products from same category, excluding current product
    const relatedProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 3);

    if (relatedProducts.length === 0) {
        // If no products in same category, get random products
        const randomProducts = products
            .filter(p => p.id !== currentProduct.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        relatedContainer.innerHTML = randomProducts.map(generateProductCard).join('');
    } else {
        relatedContainer.innerHTML = relatedProducts.map(generateProductCard).join('');
    }
}

// Load reviews
function loadReviews() {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) return;

    // Sample reviews data
    const reviews = [
        {
            name: 'John Smith',
            rating: 5,
            date: '2024-01-15',
            comment: 'Excellent product with high quality. Highly recommend it!'
        },
        {
            name: 'Sarah Johnson',
            rating: 4,
            date: '2024-01-10',
            comment: 'Very good and useful product. Download was fast and quality is excellent.'
        },
        {
            name: 'Michael Brown',
            rating: 5,
            date: '2024-01-05',
            comment: 'Best product I bought from this site. Customer service is excellent too.'
        }
    ];

    reviewsList.innerHTML = reviews.map(review => `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h6 class="fw-bold mb-1">${review.name}</h6>
                        <div class="text-muted small">${new Date(review.date).toLocaleDateString('en-US')}</div>
                    </div>
                    <div class="text-warning">
                        ${generateStarRating(review.rating)}
                    </div>
                </div>
                <p class="mb-0">${review.comment}</p>
            </div>
        </div>
    `).join('');
}

// Buy now function
function buyNow(productId) {
    addToCart(productId);
    window.location.href = 'checkout.html';
}

// Handle review form submission
function handleReviewSubmission(event) {
    event.preventDefault();

    const name = document.getElementById('reviewer-name').value;
    const comment = document.getElementById('review-text').value;
    const rating = document.querySelector('.rating-input .fas.text-warning:last-of-type')?.dataset.rating || 5;

    if (!name || !comment) {
        showNotification('Please fill in all fields', 'warning');
        return;
    }

    showNotification('Thank you! Your review has been submitted successfully', 'success');

    // Reset form
    document.getElementById('review-form').reset();
    resetRatingInput();
}

// Handle rating input
function setupRatingInput() {
    const stars = document.querySelectorAll('.rating-input .fas');

    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);

            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.add('text-warning');
                    s.classList.remove('text-muted');
                } else {
                    s.classList.remove('text-warning');
                    s.classList.add('text-muted');
                }
            });
        });

        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);

            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.add('text-warning');
                } else {
                    s.classList.remove('text-warning');
                }
            });
        });
    });

    // Reset on mouse leave
    document.querySelector('.rating-input').addEventListener('mouseleave', function() {
        const selectedRating = document.querySelector('.rating-input .fas.text-warning:last-of-type')?.dataset.rating || 0;

        stars.forEach((s, i) => {
            if (i < selectedRating) {
                s.classList.add('text-warning');
                s.classList.remove('text-muted');
            } else {
                s.classList.remove('text-warning');
                s.classList.add('text-muted');
            }
        });
    });
}

// Reset rating input
function resetRatingInput() {
    const stars = document.querySelectorAll('.rating-input .fas');
    stars.forEach(star => {
        star.classList.remove('text-warning');
        star.classList.add('text-muted');
    });
}

// Initialize product detail page
document.addEventListener('DOMContentLoaded', function() {
    // Only run on product detail page
    if (!window.location.pathname.includes('product-detail.html')) return;

    // Load product details
    loadProductDetail();

    // Setup rating input
    setupRatingInput();

    // Setup review form
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmission);
    }
});

// Export functions
window.buyNow = buyNow;
window.loadProductDetail = loadProductDetail;
