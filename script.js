// بيانات المنتجات
let products = [
    {
        name: "رز_الضحي",
        price: "15 ج/كجم",
        image: "images/رز_الضحي.jpg",
        category: "بقوليات",
        alt: "أرز مصري عالي الجودة من ماركت الخديوي"
    },
    {
        name: "عدس أصفر",
        price: "20 ج/كجم",
        image: "images/عدس.jpg",
        category: "بقوليات",
        alt: "عدس أصفر عالي الجودة من ماركت الخديوي"
    },
    {
        name: "عسل نحل طبيعي",
        price: "150 ج/كجم",
        image: "images/عسل_نحل.jpg",
        category: "منتجات طبيعية",
        alt: "عسل نحل طبيعي من ماركت الخديوي"
    },
    {
        name: "شاي ",
        price: "30 ج/علبة",
        image: "images/شاي.jpg",
        category: "مشروبات",
        alt: "شاي أخضر عالي الجودة من ماركت الخديوي"
    },
    {
        name: "عصير برتقال طبيعي",
        price: "20 ج/لتر",
        image: "images/عصير_برتقال.jpg",
        category: "مشروبات",
        alt: "عصير برتقال طبيعي من ماركت الخديوي"
    },
    {
        name: "سكر أبيض",
        price: "10 ج/كجم",
        image: "images/سكر.jpg",
        category: "بقالة",
        alt: "سكر أبيض نقي من ماركت الخديوي"
    },
    {
        name: "دقيق فاخر",
        price: "12 ج/كجم",
        image: "images/دقيق.jpg",
        category: "بقالة",
        alt: "دقيق فاخر عالي الجودة من ماركت الخديوي"
    },
    {
        name: "كورن فليكس 2",
        price: "30 ج/علبة",
        image: "images/كورن_فليكس2.webp",
        category: "بقالة",
        alt: "كورن فليكس 2"
    },
    {
        name: "ماشروم",
        price: "50 ج/علبة",
        image: "images/ماشروم.webp",
        category: "خضروات",
        alt: "ماشروم طازج"
    },
    {
        name: "مربى تين",
        price: "25 ج/علبة",
        image: "images/مربي_تين.webp",
        category: "منتجات طبيعية",
        alt: "مربى تين"
    },
    {
        name: "مربى مشمش",
        price: "25 ج/علبة",
        image: "images/مربي_مشمش.webp",
        category: "منتجات طبيعية",
        alt: "مربى مشمش"
    },
    {
        name: "مكرونة",
        price: "15 ج/علبة",
        image: "images/مكرونة.webp",
        category: "بقالة",
        alt: "مكرونة"
    },
    {
        name: "مكرونة 2",
        price: "20 ج/علبة",
        image: "images/مكرونة2.webp",
        category: "بقالة",
        alt: "مكرونة 2"
    },
    {
        name: "تونة",
        price: "25 ج/علبة",
        image: "images/تونة.webp",
        category: "بقالة",
        alt: "تونة"
    },
    {
        name: "جبنة المراعي",
        price: "50 ج/كجم",
        image: "images/جبنة_المراعي.jpg",
        category: "البان",
        alt: "جبنة المراعي"
    },
    {
        name: "جبنة ثلاجة",
        price: "45 ج/كجم",
        image: "images/جبنة_ثلاجة.jpg",
        category: "البان",
        alt: "جبنة ثلاجة"
    },
    {
        name: "جبنة فيتا",
        price: "60 ج/كجم",
        image: "images/جبنة_فيتة.jpg",
        category: "البان",
        alt: "جبنة فيتا"
    },
    {
        name: "جبنة فيتا 1",
        price: "65 ج/كجم",
        image: "images/جبنة_فيتة (2).jpg",
        category: "البان",
        alt: "جبنة فيتا 1"
    },
    {
        name: "جبنة كريمي",
        price: "70 ج/كجم",
        image: "images/جبنة_كريمي.jpg",
        category: "البان",
        alt: "جبنة كريمي"
    },
    {
        name: "جبنة موزاريلا",
        price: "80 ج/كجم",
        image: "images/جبنة_موزاريلا.jpg",
        category: "البان",
        alt: "جبنة موزاريلا"
    },
    {
        name: "جبنة رومي",
        price: "70 ج/كجم",
        image: "images/جبنة_رومي.webp",
        category: "البان",
        alt: "جبنة رومي"
    },
    {
        name: "جلي",
        price: "10 ج/علبة",
        image: "images/جلي.webp",
        category: "حلويات",
        alt: "جلي"
    },
    {
        name: "دومتي كريمي",
        price: "55 ج/كجم",
        image: "images/دومتي_كريمي.jpg",
        category: "البان",
        alt: "دومتي كريمي"
    },
    {
        name: "كورن فليكس",
        price: "25 ج/علبة",
        image: "images/كورن_فليكس.webp",
        category: "بقالة",
        alt: "كورن فليكس"
    },
    {
        name: "كورن فليكس 1",
        price: "28 ج/علبة",
        image: "images/كورن_فليكس1.webp",
        category: "بقالة",
        alt: "كورن فليكس 1"
    },
    {
        name: "زبادي",
        price: "5 ج/علبة",
        image: "images/زبادي_المراعي.jpg",
        category: "البان",
        alt: "زبادي"
    },
    {
        name: "زبادي يوناني",
        price: "15 ج/علبة",
        image: "images/زبادي_يوناني.jpg",
        category: "البان",
        alt: "زبادي يوناني"
    },
    {
        name: "هوهوز",
        price: "5 ج/قطعة",
        image: "images/هوهز.png",
        category: "حلويات",
        alt: "كيك رول هوهوز"
    },
    {
        name: "بيبسي",
        price: "5 ج/علبة",
        image: "images/ببسي.jpeg",
        category: "مشروبات",
        alt: "مشروب بيبسي غازي"
    },
    {
        name: "كرانشي",
        price: "5 ج/كيس",
        image: "images/كرانشي.jpeg",
        category: "مقرمشات",
        alt: "مقرمشات كرانشي"
    },
    {
        name: "كوكاكولا",
        price: "5 ج/علبة",
        image: "images/كولا.png",
        category: "مشروبات",
        alt: "مشروب كوكاكولا غازي"
    },
    {
        name: "بيج شيبس بالليمون الحلو",
        price: "5 ج/كيس",
        image: "images/بيج_شيبس_لمون_حلو.jpeg",
        category: "مقرمشات",
        alt: "بيج شيبس بالليمون الحلو"
    },
    {
        name: "ڤي سوبر صودا كولا",
        price: "5 ج/علبة",
        image: "images/7V.jpeg",
        category: "مشروبات",
        alt: "ڤي سوبر صودا كولا"
    },
    {
        name: "شيتوس حار نار",
        price: "5 ج/كيس",
        image: "images/شيتوس.jpeg",
        category: "مقرمشات",
        alt: "شيتوس حار نار"
    },
    {
        name: "شيبسي جبنة",
        price: "5 ج/كيس",
        image: "images/شبسي_جبنة.jpeg",
        category: "مقرمشات",
        alt: "شيبسي بطعم الجبنة"
    },
    {
        name: "شيبسي طماطم",
        price: "5 ج/كيس",
        image: "images/شيبسي_طماطم.jpeg",
        category: "مقرمشات",
        alt: "شيبسي بطعم الطماطم"
    },
    {
        name: "مناديل فاميليا تواليت",
        price: "40 ج/باكت",
        image: "images/فاميليا.jpeg",
        category: "منظفات",
        alt: "مناديل تواليت فاميليا"
    },
    {
        name: "مناديل فاين سحب",
        price: "18 ج/علبة",
        image: "images/فاين.jpeg",
        category: "منظفات",
        alt: "مناديل وجه فاين"
    }
];

const specialOffers = [
    {
        name: "عرض خاص 1",
        description: "خصم 20% على جميع منتجات الألبان.",
        image: "images/offer1.jpg",
        alt: "عرض خاص 1"
    },
    {
        name: "عرض خاص 2",
        description: "اشترِ 3 كجم من الفواكه واحصل على 1 كجم مجاناً.",
        image: "images/offer2.jpg",
        alt: "عرض خاص 2"
    },
    {
        name: "عرض خاص 3",
        description: "خصم 15% على جميع أنواع اللحوم الطازجة.",
        image: "images/offer3.jpg",
        alt: "عرض خاص 3"
    }
];

// دالة إنشاء بطاقات المنتجات
function createProductCards(productsArray, page = 1) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    const itemsPerPage = 16; // Updated to display 16 products per page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = productsArray.slice(startIndex, endIndex);

    if (paginatedProducts.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><h4>لا توجد منتجات مطابقة للبحث</h4></div>';
        document.getElementById('paginationContainer').innerHTML = ''; // إخفاء أزرار التصفح
        return;
    }

    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
        
        productCard.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.alt}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title h5">${product.name}</h3>
                    <p class="text-success mt-2"><strong>السعر:</strong> ${product.price}</p>
                    <button class="btn btn-primary btn-sm mt-auto" onclick='addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')}, event)'>
                        <i class="fas fa-cart-plus me-1"></i> إضافة إلى السلة
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
    });

    createPagination(productsArray.length, itemsPerPage, page);
}

// دالة لإنشاء أزرار التصفح
function createPagination(totalItems, itemsPerPage, currentPage) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'} mx-1`;
        button.textContent = i;
        button.addEventListener('click', () => createProductCards(products, i));
        paginationContainer.appendChild(button);
    }
}

// تحسين دالة البحث
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    updateURL(searchTerm);

    const filtered = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm);
        const categoryMatch = product.category.toLowerCase().includes(searchTerm);
        return nameMatch || categoryMatch;
    });

    createProductCards(filtered);
});

// تحديث عنوان URL
function updateURL(searchTerm) {
    const state = { search: searchTerm };
    const title = searchTerm ? `نتائج البحث عن: ${searchTerm} - الخديوي` : "الخديوي - متجر الأسماك والجمبري الطازج";
    const url = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : window.location.pathname;
    
    history.pushState(state, title, url);
    document.title = title;
}

// إعادة تفعيل دالة تصفية المنتجات حسب الفئة لتعمل مع الأزرار الحالية
function filterByCategory(category) {
    console.log(`تصفية المنتجات حسب الفئة: ${category}`);
    
    // إضافة الفئة النشطة للزر المختار وإزالتها من باقي الأزرار
    const allButtons = document.querySelectorAll('.categories .btn');
    allButtons.forEach(button => {
        if (button.textContent === category || (button.textContent === 'الكل' && category === 'all')) {
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-primary');
        } else {
            button.classList.remove('btn-primary');
            button.classList.add('btn-outline-primary');
        }
    });
    
    // تصفية المنتجات حسب الفئة
    const filteredProducts = category === 'all' 
        ? products
        : products.filter(product => product.category === category);
    
    // طباعة عدد المنتجات للتأكد من التصفية
    console.log(`تم العثور على ${filteredProducts.length} منتج`);
    
    // عرض المنتجات المصفاة في الصفحة
    createProductCards(filteredProducts, 1);
    
    // إعادة تعيين شريط البحث
    document.getElementById('searchInput').value = '';
    updateURL(null);
}

// دالة لإنشاء دلافين إضافية بشكل عشوائي
function createRandomDolphins() {
    const waterSurface = document.querySelector('.water-surface');
    const dolphinCount = Math.floor(Math.random() * 2) + 1; // 1-2 دلافين إضافية
    
    for(let i = 0; i < dolphinCount; i++) {
        const dolphin = document.createElement('div');
        const delay = Math.random() * 5;
        const left = Math.random() * 70 + 10;
        
        dolphin.className = 'dolphin';
        dolphin.style.left = `${left}%`;
        dolphin.style.animationDelay = `${delay}s`;
        
        waterSurface.appendChild(dolphin);
        
        // إزالة الدلفين بعد انتهاء الحركة
        setTimeout(() => {
            dolphin.remove();
        }, 8000 + (delay * 1000));
    }
    
    setTimeout(createRandomDolphins, 10000);
}

// دالة لإنشاء خلفية الأسماك المتحركة
function initFishBackground() {
    const fishContainer = document.getElementById('fishContainer');
    const fishTypes = ['fish-1', 'fish-2', 'fish-3', 'shark'];
    
    // إنشاء الأسماك
    for (let i = 0; i < 8; i++) {
        createFish();
    }
    
    // إنشاء الفقاعات
    setInterval(createBubble, 800);
    
    function createFish() {
        const fish = document.createElement('div');
        const fishType = fishTypes[Math.floor(Math.random() * fishTypes.length)];
        const size = Math.random() * 0.7 + 0.5;
        const duration = Math.random() * 40 + 30;
        const delay = Math.random() * 30;
        const top = Math.random() * 80 + 10;
        
        fish.className = `fish ${fishType}`;
        fish.style.top = `${top}%`;
        fish.style.left = `${Math.random() * 100}%`;
        fish.style.transform = `scale(${size})`;
        fish.style.animationName = Math.random() > 0.5 ? 'swim' : 'swim-reverse';
        fish.style.animationDuration = `${duration}s`;
        fish.style.animationDelay = `-${delay}s`;
        
        fishContainer.appendChild(fish);
    }
    
    function createBubble() {
        const bubble = document.createElement('div');
        const left = Math.random() * 100;
        const size = Math.random() * 10 + 5;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        bubble.className = 'bubble';
        bubble.style.left = `${left}%`;
        bubble.style.bottom = '0';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `-${delay}s`;
        
        fishContainer.appendChild(bubble);
        
        // إزالة الفقاعة بعد انتهاء الحركة
        setTimeout(() => {
            bubble.remove();
        }, duration * 1000);
    }
}

// تهيئة أولية
document.addEventListener('DOMContentLoaded', function() {
    // عرض المنتجات
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    
    // استرجاع بيانات المنتجات المحفوظة (إذا وجدت)
    const savedProducts = localStorage.getItem('productsData');
    if (savedProducts) {
        try {
            // استبدال بيانات المنتجات بالبيانات المحفوظة
            products = JSON.parse(savedProducts);
            console.log('تم تحميل بيانات المنتجات من التخزين المحلي');
        } catch (error) {
            console.error('خطأ في تحميل بيانات المنتجات:', error);
        }
    }
    
    // عرض المنتجات بعد تحميل البيانات المحفوظة
    if (searchParam) {
        document.getElementById('searchInput').value = searchParam;
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchParam.toLowerCase()) ||
            product.category.toLowerCase().includes(searchParam.toLowerCase())
        );
        createProductCards(filtered);
    } else {
        createProductCards(products);
    }
    
    // تحديث سنة حقوق النشر
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // بدء خلفية الأسماك المتحركة
    initFishBackground();
    
    // بدء حركة الدلافين بعد تأخير
    setTimeout(createRandomDolphins, 5000);
});

const cart = [];

function addToCart(product, event) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const isDairy = product.category === "البان";
        cart.push({ 
            ...product, 
            quantity: 1, 
            // Add default weight only for dairy products
            weight: isDairy ? "1 كجم" : undefined 
        });
    }
    updateCartUI();
    
    // عرض تأثير إضافة المنتج للسلة
    if (event) {
        showAddToCartAnimation(product.image, event);
    } else {
        // إذا لم يتم تمرير حدث، استخدم موقع زر السلة كنقطة بداية
        const cartButton = document.querySelector('.cart-toggle');
        if (cartButton) {
            const rect = cartButton.getBoundingClientRect();
            const fakeEvent = {
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2
            };
            showAddToCartAnimation(product.image, fakeEvent);
        }
    }
    
    showNotification(`${product.name} تمت إضافته إلى السلة.`);
}

function showNotification(message) {
    const notificationContainer = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
    }
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center">سلة المشتريات فارغة</p>';
        cartCount.textContent = '0';
        document.getElementById('cartTotal').textContent = '0.00'; // Reset total
        return;
    }

    let totalCartPrice = 0;
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    cart.forEach(item => {
        const isDairy = item.category === "البان";
        let displayPrice = item.price; // Default display price
        let itemTotalPrice = 0;
        let weightSelectorHTML = '';

        // Regex to extract base price and unit (e.g., from "50 ج/كجم" or "20 ج/لتر")
        const priceMatch = String(item.price).match(/^([0-9.]+)\s*ج\/(كجم|لتر|قطعة|علبة)/);
        let basePricePerUnit = 0;
        
        if (priceMatch && priceMatch[1]) {
            basePricePerUnit = parseFloat(priceMatch[1]);
        }

        if (isDairy && item.weight && basePricePerUnit > 0) {
            // Determine weight factor based on selection
            let weightFactor = 1; // Default to 1 kg
            if (item.weight === "ربع كجم") weightFactor = 0.25;
            else if (item.weight === "نصف كجم") weightFactor = 0.5;
            else if (item.weight === "ثمن كجم") weightFactor = 0.125; // Added 1/8 kg

            const calculatedItemPrice = basePricePerUnit * weightFactor;
            itemTotalPrice = calculatedItemPrice * item.quantity;
            displayPrice = calculatedItemPrice.toFixed(2) + ' ج'; // Price for the selected weight

            weightSelectorHTML = `
                <select class="form-select form-select-sm mt-1" onchange="updateWeight('${item.name}', this.value)">
                    <option value="ثمن كجم" ${item.weight === "ثمن كجم" ? "selected" : ""}>ثمن كجم</option>
                    <option value="ربع كجم" ${item.weight === "ربع كجم" ? "selected" : ""}>ربع كجم</option>
                    <option value="نصف كجم" ${item.weight === "نصف كجم" ? "selected" : ""}>نصف كجم</option>
                    <option value="1 كجم" ${item.weight === "1 كجم" ? "selected" : ""}>1 كجم</option>
                </select>
            `;
        } else if (basePricePerUnit > 0) {
             // For non-dairy or items without weight, use base price * quantity
             itemTotalPrice = basePricePerUnit * item.quantity;
        } else {
            // Fallback if price format is unexpected - try to parse any number
            const fallbackPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
            itemTotalPrice = fallbackPrice * item.quantity;
        }

        totalCartPrice += itemTotalPrice;

        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.alt}">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-quantity">الكمية: 
                        <button class="btn btn-sm btn-outline-secondary quantity-btn" onclick="decreaseQuantity('${item.name}')">-</button>
                        ${item.quantity}
                        <button class="btn btn-sm btn-outline-secondary quantity-btn" onclick="increaseQuantity('${item.name}')">+</button>
                    </p>
                    ${weightSelectorHTML}
                    <p class="cart-item-price mt-1">السعر: ${displayPrice}</p>
                    <textarea class="form-control form-control-sm mt-1" placeholder="أضف ملاحظاتك..." oninput="updateNotes('${item.name}', this.value)">${item.note || ''}</textarea>
                </div>
                <button class="btn btn-sm btn-danger remove-btn" onclick="removeFromCart('${item.name}')"><i class="fas fa-times"></i></button>
            </div>
        `;
        cartContainer.innerHTML += cartItem;
    });

    // Update total price display
    document.getElementById('cartTotal').textContent = totalCartPrice.toFixed(2);
}

function increaseQuantity(productName) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
        updateCartUI();
    }
}

function decreaseQuantity(productName) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            // If quantity is 1, remove the item
            removeFromCart(productName);
            return; // Exit early as removeFromCart calls updateCartUI
        }
        updateCartUI();
    }
}

function updateWeight(productName, weight) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.weight = weight;
    }
    updateCartUI(); // Recalculate and update the UI
}

function updateNotes(productName, note) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.note = note;
    }
}

function showAddToCartAnimation(imageSrc, event) {
    // إنشاء عنصر الصورة للتأثير
    const animationElement = document.createElement('img');
    animationElement.src = imageSrc || 'images/placeholder.jpg';
    animationElement.className = 'add-to-cart-animation';
    
    // تعيين موقع بداية التأثير
    if (event) {
        animationElement.style.top = `${event.clientY}px`;
        animationElement.style.left = `${event.clientX}px`;
    } else {
        // إذا لم يكن هناك حدث، استخدم منتصف الشاشة
        animationElement.style.top = '50%';
        animationElement.style.left = '50%';
    }
    
    // إضافة عنصر التأثير للصفحة
    document.body.appendChild(animationElement);
    
    // إزالة العنصر بعد انتهاء التأثير
    animationElement.addEventListener('animationend', () => {
        animationElement.remove();
    });
}

function toggleCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.style.display = cartContainer.style.display === 'none' || cartContainer.style.display === '' ? 'block' : 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('سلة المشتريات فارغة!');
        return;
    }

    let message = 'مرحباً، أريد إتمام الطلب التالي:\n';
    cart.forEach(item => {
        message += `- ${item.name} (الكمية: ${item.quantity})\n`;
        if (item.weight) {
            message += `  الوزن: ${item.weight}\n`;
        }
        if (item.note) {
            message += `  ملاحظة: ${item.note}\n`;
        }
    });

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/201003316735?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}
