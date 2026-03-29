// Data Produk Kue
const products = [
    {
        id: 1,
        name: 'Kue Cokelat Klasik',
        category: 'chocolate',
        price: 120000,
        description: 'Kue ulang tahun cokelat klasik dengan topping ceri dan dekorasi manis.',
        rating: '★★★★★',
        image: 'WhatsApp Image 2026-03-27 at 13.11.04.jpeg'
    },
    {
        id: 2,
        name: 'Kue Oreo Cokelat',
        category: 'vanilla',
        price: 150000,
        description: 'Kue cokelat dengan topping biskuit Oreo dan tulisan ulang tahun.',
        rating: '★★★★☆',
        image: 'WhatsApp Image 2026-03-27 at 13.11.13.jpeg'
    },
    {
        id: 3,
        name: 'Kue 3 Tingkat',
        category: 'fruit',
        price: 500000,
        description: 'Kue 3 tingkat warna biru dengan dekorasi bunga dan detail elegan.',
        rating: '★★★★★',
        image: 'WhatsApp Image 2026-03-27 at 13.11.24.jpeg'
    },
    {
        id: 4,
        name: 'Kue 2 Tingkat',
        category: 'premium',
        price: 400000,
        description: 'Kue 2 tingkat warna biru dengan ucapan selamat dan sukses.',
        rating: '★★★★★',
        image: 'WhatsApp Image 2026-03-27 at 13.11.42.jpeg'
    },
    {
        id: 5,
        name: 'Kue Ulang Tahun 2 Tingkat',
        category: 'fruit',
        price: 300000,
        description: 'Kue Ulang Tahun dengan tampilan cokelat modern.',
        rating: '★★★★☆',
        image: 'WhatsApp Image 2026-03-27 at 13.11.57.jpeg'
    },
    {
        id: 6,
        name: 'Kue 2 Tingkat Cokelat Pink',
        category: 'chocolate',
        price: 350000,
        description: 'Kue 2 tingkat nuansa cokelat pink dengan dekorasi bintang dan hati.',
        rating: '★★★★★',
        image: 'WhatsApp Image 2026-03-27 at 13.12.12.jpeg'
    },
    {
        id: 7,
        name: 'Kue Ulang Tahun 17 Tahun',
        category: 'premium',
        price: 200000,
        description: 'Kue ulang tahun tema 17 tahun dengan warna hijau lembut dan cokelat.',
        rating: '★★★★★',
        image: 'WhatsApp Image 2026-03-27 at 13.13.22.jpeg'
    },
    {
        id: 8,
        name: 'Kue Ulang Tahun Pink Bunga',
        category: 'fruit',
        price: 100000,
        description: 'Kue ulang tahun pink bunga dengan dekorasi sederhana dan manis.',
        rating: '★★★★☆',
        image: 'WhatsApp Image 2026-03-27 at 13.14.53.jpeg'
    }
];

// State
let cart = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupScrollNavigation();
});

// Display Products
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">Tidak ada produk ditemukan</p>';
        return;
    }

    productsToDisplay.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <span class="product-category">${getCategoryLabel(product.category)}</span>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">${product.rating}</div>
                <div class="product-footer">
                    <span class="product-price">Rp ${product.price.toLocaleString('id-ID')}</span>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        + Beli
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter Products
function filterProducts(category) {
    currentFilter = category;

    // Update button style
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter and display
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    displayProducts(filtered);
}

// Get Category Label
function getCategoryLabel(category) {
    const labels = {
        'chocolate': '🍫 Cokelat',
        'vanilla': '🍰 Vanilla',
        'fruit': '🍓 Buah',
        'premium': '👑 Premium'
    };
    return labels[category] || category;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${product.name} ditambahkan ke keranjang!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart Display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    const cartCount = document.querySelector('.cart-count');

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Keranjang belanja kosong</p>';
        totalPrice.textContent = 'Rp 0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Qty: ${item.quantity}</p>
                <p class="cart-item-price">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = 'Rp ' + total.toLocaleString('id-ID');
}

// Toggle Cart Modal
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'none' ? 'flex' : 'none';
}

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!cartModal.contains(event.target) && !cartIcon.contains(event.target)) {
        cartModal.style.display = 'none';
    }
});

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #2ecc71;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        font-size: 14px;
        z-index: 2000;
        animation: slideInUp 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Setup Scroll Navigation
function setupScrollNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetTop = targetSection.offsetTop - headerHeight - 12;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        });
    });
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Add keyframes animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
