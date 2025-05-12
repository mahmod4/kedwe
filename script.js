// Replace the static products array with dynamic loading
let products = []; // Initialize empty array that will be filled with data

// Function to fetch products data from JSON file
async function fetchProducts() {
    try {
        const response = await fetch('/products/index.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        products = await response.json();
        displayProducts(products);
        
        // Hide loading spinner if it exists
        const loadingSpinner = document.getElementById('loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading products:', error);
        
        // Show error message in product container
        const productContainer = document.getElementById('product-container');
        if (productContainer) {
            productContainer.innerHTML = `<p class="no-products">حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى لاحقاً.</p>`;
        }
        
        // Hide loading spinner
        const loadingSpinner = document.getElementById('loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    }
}

// DOM Elements
const productContainer = document.getElementById('product-container');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-products');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPrice = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout');
const closeBtn = document.querySelector('.close');

// Mobile menu elements
const menuToggle = document.querySelector('.main-menu-toggle');
const mainMenu = document.querySelector('.main-menu');
const menuItems = document.querySelectorAll('#main-menu li a');

// Cart
let cart = [];

// Variables for pagination
let currentPage = 1;
const productsPerPage = 15;
let totalPages = 1;
let currentProducts = [];

// Variables for header control
let lastScrollTop = 0;
const header = document.querySelector('header');
const headerHeight = header.offsetHeight;
const scrollThreshold = 50;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add touch detection class to body
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // Load products data first
    fetchProducts();
    
    setupEventListeners();
    handleMobileMenu();
    setActiveNavItem();
    
    // Initialize authentication features
    initializeAuth();
    
    // تفعيل التحميل البطيء للصور لتحسين الأداء
    lazyLoadImages();
    
    // استشعار تحويل الجهاز (portrait/landscape)
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            updateLayoutOnOrientationChange();
        }, 200);
    });
    
    // إضافة مراقبة التمرير للقائمة العلوية
    window.addEventListener('scroll', debounce(handleHeaderOnScroll, 10));
    window.addEventListener('resize', debounce(handleHeaderOnScroll, 100));
    // تنفيذ الدالة مرة عند تحميل الصفحة
    handleHeaderOnScroll();
    
    // Prevent 300ms delay on mobile devices
    document.addEventListener('touchstart', function() {}, {passive: true});
});

function setupEventListeners() {
    // Filter products by category
    categoryFilter.addEventListener('change', filterProducts);
    
    // Search products
    searchInput.addEventListener('input', filterProducts);
    
    // Cart modal
    document.querySelector('.cart a').addEventListener('click', (e) => {
        e.preventDefault();
        openCartModal();
    });
    
    // Close cart modal
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    // Close cart modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // إرسال الطلب إلى واتساب
            sendOrderToWhatsApp();
        } else {
            alert('سلة التسوق فارغة!');
        }
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('تم استلام رسالتك وسنتواصل معك قريباً!');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mainMenu.classList.contains('active')) {
                mainMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                const backdrop = document.querySelector('.backdrop');
                if (backdrop) {
                    backdrop.classList.remove('active');
                    backdrop.style.opacity = '0';
                    setTimeout(() => {
                        backdrop.style.display = 'none';
                    }, 300);
                }
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for header
                    behavior: 'smooth'
                });
                
                // Update active menu item
                document.querySelectorAll('.main-menu a').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Handle scroll to update active menu items - تخفيض تردد تحديث العناصر النشطة
    window.addEventListener('scroll', debounce(setActiveNavItem, 200));
}

// Handle mobile menu toggle
function handleMobileMenu() {
    const menuToggle = document.querySelector('.main-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const backdrop = document.querySelector('.backdrop') || createBackdrop();
    
    if (!menuToggle || !mainMenu) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        mainMenu.classList.toggle('active');
        backdrop.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Give time for transition to complete
        if (backdrop.classList.contains('active')) {
            backdrop.style.display = 'block';
            // Force reflow
            backdrop.offsetHeight;
            backdrop.style.opacity = '1';
        } else {
            backdrop.style.opacity = '0';
            // Remove display after transition
            setTimeout(() => {
                if (!backdrop.classList.contains('active')) {
                    backdrop.style.display = 'none';
                }
            }, 300);
        }
    });
    
    backdrop.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        mainMenu.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        backdrop.style.opacity = '0';
        setTimeout(() => {
            backdrop.style.display = 'none';
        }, 300);
    });
    
    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll('.main-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainMenu.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            backdrop.style.opacity = '0';
            setTimeout(() => {
                backdrop.style.display = 'none';
            }, 300);
        });
    });
}

function createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');
    document.body.appendChild(backdrop);
    return backdrop;
}

// Set active menu item based on scroll position with improved mobile support
function setActiveNavItem() {
    const scrollPosition = window.scrollY + 80; // Adjusted offset for better mobile experience
    
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.main-menu a').forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Handle the case when at the top of the page
    if (scrollPosition < 100) {
        document.querySelectorAll('.main-menu a').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#home') {
                item.classList.add('active');
            }
        });
    }
}

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Display products with pagination
function displayProducts(productsArray) {
    // Update current products and calculate total pages
    currentProducts = productsArray;
    totalPages = Math.ceil(productsArray.length / productsPerPage);
    
    // Make sure current page is valid
    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }
    
    productContainer.innerHTML = '';
    
    if (productsArray.length === 0) {
        productContainer.innerHTML = '<p class="no-products">لا توجد منتجات متطابقة مع البحث</p>';
        return;
    }
    
    // Calculate start and end index for current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, productsArray.length);
    const currentPageProducts = productsArray.slice(startIndex, endIndex);
    
    // تجنب عمليات DOM المتكررة باستخدام DocumentFragment
    const fragment = document.createDocumentFragment();
    
    currentPageProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy" width="200" height="200">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price} ج.م</p>
                <button class="add-to-cart" data-id="${product.id}">إضافة للسلة</button>
            </div>
        `;
        fragment.appendChild(productElement);
    });
    
    productContainer.appendChild(fragment);
    
    // Add pagination controls
    createPaginationControls();
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Create pagination controls
function createPaginationControls() {
    // Remove existing pagination if any
    const existingPagination = document.querySelector('.pagination');
    if (existingPagination) {
        existingPagination.remove();
    }
    
    // Create pagination element if needed
    if (totalPages <= 1) {
        return;
    }
    
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    prevButton.classList.add('pagination-btn', 'prev');
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts(currentProducts);
            window.scrollTo({
                top: document.getElementById('products').offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    nextButton.classList.add('pagination-btn', 'next');
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts(currentProducts);
            window.scrollTo({
                top: document.getElementById('products').offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
    
    // Page numbers
    const pageNumbers = document.createElement('div');
    pageNumbers.className = 'page-numbers';
    
    // Add page indicator
    const pageIndicator = document.createElement('span');
    pageIndicator.textContent = `${currentPage} / ${totalPages}`;
    pageIndicator.className = 'page-indicator';
    
    // Assemble pagination
    pagination.appendChild(prevButton);
    pagination.appendChild(pageIndicator);
    pagination.appendChild(nextButton);
    
    // Append to container
    productContainer.after(pagination);
}

// Filter products
function filterProducts() {
    const category = categoryFilter.value;
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    let filteredProducts = products;
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Filter by search term
    if (searchTerm !== '') {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
    }
    
    // Reset to first page when filtering
    currentPage = 1;
    
    displayProducts(filteredProducts);
}

// Add to cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Show notification
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = `تمت إضافة ${product.name} إلى السلة`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Update cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="70" height="70">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">${item.price} ج.م</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <button class="remove-item" data-id="${item.id}">×</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
    
    // Update total price
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalPrice.textContent = total;
}

// Open cart modal
function openCartModal() {
    updateCart();
    cartModal.style.display = 'block';
}

// Increase item quantity
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Decrease item quantity
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity--;
        
        if (item.quantity === 0) {
            // Remove item if quantity is 0
            cart = cart.filter(item => item.id !== productId);
        }
        
        updateCart();
    }
}

// Remove item from cart
function removeItem(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Add notification styles
const style = document.createElement('style');
style.innerHTML = `
    .notification {
        position: fixed;
        bottom: -60px;
        left: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateY(-80px);
    }
    
    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px;
        font-size: 1.2rem;
        color: #666;
    }
`;
document.head.appendChild(style);

// تحسين تحميل الصور لأداء أفضل على الهواتف
function lazyLoadImages() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        document.querySelectorAll('img').forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImages = document.querySelectorAll('img:not([loading])');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src || image.src;
                        observer.unobserve(image);
                    }
                });
            });

            lazyImages.forEach(image => {
                if (!image.src && image.dataset.src) {
                    image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; // Tiny placeholder
                }
                imageObserver.observe(image);
            });
        }
    }
}

// تحديث التخطيط عند تغيير اتجاه الجهاز
function updateLayoutOnOrientationChange() {
    setActiveNavItem();
    
    // إعادة تهيئة الفلتر وترتيب المنتجات
    if (window.innerWidth <= 768) {
        const productContainer = document.getElementById('product-container');
        if (productContainer) {
            const products = productContainer.querySelectorAll('.product');
            products.forEach(product => {
                product.style.opacity = '0';
                setTimeout(() => {
                    product.style.opacity = '1';
                }, 100);
            });
        }
    }
}

// إرسال الطلب إلى واتساب
function sendOrderToWhatsApp() {
    // إنشاء نص الطلب
    let orderText = "🛒 *طلب جديد من متجر الخديوي* 🛒\n\n";
    orderText += "📋 *تفاصيل الطلب:*\n";
    
    // إضافة المنتجات
    cart.forEach((item, index) => {
        orderText += `${index + 1}. ${item.name} - ${item.price} ج.م × ${item.quantity} = ${item.price * item.quantity} ج.م\n`;
    });
    
    // إضافة المجموع
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderText += `\n💰 *المجموع:* ${total} ج.م\n\n`;
    orderText += "🙏 يرجى تأكيد الطلب بإرسال عنوان التوصيل ورقم الهاتف";
    
    // تشفير النص للرابط
    const encodedText = encodeURIComponent(orderText);
    
    // رقم الواتساب الخاص بالمتجر
    const phoneNumber = "201234567890"; // رقم وهمي للتواصل
    
    // إنشاء رابط واتساب
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // فتح رابط واتساب في نافذة جديدة
    window.open(whatsappLink, '_blank');
    
    // مسح السلة بعد إرسال الطلب
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
    
    // عرض رسالة تأكيد
    alert('تم إرسال طلبك إلى واتساب. شكراً لتسوقك معنا!');
}

/**
 * دالة التحكم في سلوك الهيدر عند التمرير
 * - على الأجهزة المحمولة (أقل من أو يساوي 768 بكسل): يبقى الهيدر مرئياً دائماً مع تغيير شكله عند التمرير
 * - على الأجهزة الأكبر (أكثر من 768 بكسل): يختفي الهيدر عند التمرير لأسفل ويظهر عند التمرير لأعلى
 */
function handleHeaderOnScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolled past threshold
    if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Always make header fixed on mobile for better UX
    if (window.innerWidth <= 768) {
        header.style.transform = 'translateY(0)';
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.width = '100%';
        header.style.zIndex = '1000';
    } 
    // On larger screens, hide header on scroll down, show on scroll up
    else {
        if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
            // Scrolling down - hide header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show header
            header.style.transform = 'translateY(0)';
        }
    }
    
    // Ensure lastScrollTop is never negative
    lastScrollTop = (currentScroll <= 0) ? 0 : currentScroll;
}

// User Authentication Functions
function setupAuthFeatures() {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const authTabButtons = document.querySelectorAll('.auth-tab-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const closeButtons = document.querySelectorAll('.close');
    
    // Open login modal when login button is clicked
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        createBackdrop();
        document.body.classList.add('modal-open');
    });
    
    // Close modals when the X is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            removeBackdrop();
            document.body.classList.remove('modal-open');
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            removeBackdrop();
            document.body.classList.remove('modal-open');
        }
    });
    
    // Tab switching between login and signup
    authTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            authTabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show the corresponding form
            const tabToShow = this.getAttribute('data-tab');
            if (tabToShow === 'login') {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
            }
        });
    });
    
    // Handle login form submission
    const loginFormElement = loginForm.querySelector('form');
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (!email || !password) {
            showNotification('يرجى إدخال البريد الإلكتروني وكلمة المرور', 'error');
            return;
        }
        
        // Here you would normally send a request to your server for authentication
        // For demo purposes, we'll simulate a successful login
        simulateLogin(email);
    });
    
    // Handle signup form submission
    const signupFormElement = signupForm.querySelector('form');
    signupFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-password-confirm').value;
        
        // Simple validation
        if (!name || !email || !phone || !password) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('كلمات المرور غير متطابقة', 'error');
            return;
        }
        
        // Here you would normally send a request to your server to create a new account
        // For demo purposes, we'll simulate a successful signup
        simulateSignup(name, email);
    });
    
    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        
        if (!email) {
            showNotification('يرجى إدخال البريد الإلكتروني أولاً', 'error');
            return;
        }
        
        showNotification('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني', 'success');
    });
}

// Helper function to remove backdrop
function removeBackdrop() {
    const backdrop = document.querySelector('.backdrop');
    if (backdrop) {
        backdrop.classList.remove('active');
        setTimeout(() => {
            backdrop.remove();
        }, 300);
    }
}

// Simulate login (demo only)
function simulateLogin(email) {
    // Show loading state
    showNotification('جاري تسجيل الدخول...', 'info');
    
    // Simulate API request delay
    setTimeout(() => {
        // Store user info in localStorage (in a real app, you'd use tokens)
        const user = {
            email: email,
            name: email.split('@')[0], // Use part of email as name for demo
            isLoggedIn: true,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Update UI to reflect logged-in state
        updateAuthUI();
        
        // Close modal
        document.getElementById('login-modal').style.display = 'none';
        removeBackdrop();
        document.body.classList.remove('modal-open');
        
        showNotification('تم تسجيل الدخول بنجاح!', 'success');
    }, 1000);
}

// Simulate signup (demo only)
function simulateSignup(name, email) {
    // Show loading state
    showNotification('جاري إنشاء الحساب...', 'info');
    
    // Simulate API request delay
    setTimeout(() => {
        // Store user info in localStorage
        const user = {
            email: email,
            name: name,
            isLoggedIn: true,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Update UI to reflect logged-in state
        updateAuthUI();
        
        // Close modal
        document.getElementById('login-modal').style.display = 'none';
        removeBackdrop();
        document.body.classList.remove('modal-open');
        
        showNotification('تم إنشاء الحساب بنجاح!', 'success');
    }, 1000);
}

// Update UI based on authentication state
function updateAuthUI() {
    const loginButton = document.getElementById('login-button');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (user && user.isLoggedIn) {
        // User is logged in
        loginButton.innerHTML = `<i class="fas fa-user"></i> ${user.name}`;
        loginButton.classList.add('logged-in');
        
        // Add logout option to login button (dropdown)
        loginButton.removeEventListener('click', openLoginModal);
        loginButton.addEventListener('click', toggleUserMenu);
        
        // Create user menu if it doesn't exist
        if (!document.getElementById('user-menu')) {
            createUserMenu();
        }
    } else {
        // User is not logged in
        loginButton.innerHTML = `<i class="fas fa-user"></i> تسجيل الدخول`;
        loginButton.classList.remove('logged-in');
        
        // Restore login button behavior
        loginButton.removeEventListener('click', toggleUserMenu);
        loginButton.addEventListener('click', openLoginModal);
        
        // Remove user menu if it exists
        const userMenu = document.getElementById('user-menu');
        if (userMenu) {
            userMenu.remove();
        }
    }
}

// Open login modal (for event listener)
function openLoginModal(e) {
    e.preventDefault();
    document.getElementById('login-modal').style.display = 'block';
    createBackdrop();
    document.body.classList.add('modal-open');
}

// Toggle user menu
function toggleUserMenu(e) {
    e.preventDefault();
    
    let userMenu = document.getElementById('user-menu');
    
    if (userMenu && userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
    } else if (userMenu) {
        userMenu.style.display = 'block';
    } else {
        createUserMenu();
    }
}

// Create user menu
function createUserMenu() {
    const loginButton = document.getElementById('login-button');
    const headerActions = document.querySelector('.header-actions');
    
    // Create menu
    const userMenu = document.createElement('div');
    userMenu.id = 'user-menu';
    userMenu.className = 'user-menu';
    userMenu.style.display = 'block';
    
    // Add menu items
    userMenu.innerHTML = `
        <ul>
            <li><a href="#"><i class="fas fa-user-circle"></i> الملف الشخصي</a></li>
            <li><a href="#"><i class="fas fa-shopping-bag"></i> طلباتي</a></li>
            <li><a href="#"><i class="fas fa-heart"></i> المفضلة</a></li>
            <li><a href="#" id="logout-button"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a></li>
        </ul>
    `;
    
    // Append to DOM
    headerActions.appendChild(userMenu);
    
    // Add logout functionality
    document.getElementById('logout-button').addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!loginButton.contains(e.target) && !userMenu.contains(e.target)) {
            userMenu.style.display = 'none';
        }
    });
}

// Logout function
function logout() {
    // Clear user data
    localStorage.removeItem('currentUser');
    
    // Update UI
    updateAuthUI();
    
    // Close user menu
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
        userMenu.style.display = 'none';
    }
    
    showNotification('تم تسجيل الخروج بنجاح', 'success');
}

// Check authentication status on page load
function checkAuthOnLoad() {
    updateAuthUI();
}

// Update the last DOMContentLoaded event listener to avoid conflict
// Replace the last DOMContentLoaded event listener with this code:
// Check authentication status on page load
function initializeAuth() {
    setupAuthFeatures();
    checkAuthOnLoad();
}

// Show notification for login/signup status messages
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');
    
    // Add type-specific class for styling
    notification.classList.add(`notification-${type}`);
    
    // Set the message
    notification.textContent = message;
    
    // Add to the document
    document.body.appendChild(notification);
    
    // Show the notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove the notification after a delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

