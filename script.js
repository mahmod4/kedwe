// بيانات المنتجات
const products = [
    {
        name: "رز_الضحي",
        price: "15 ج/كجم",
        image: "images/رز_الضحي.jpg",
        category: "بقوليات",
        alt: "أرز مصري عالي الجودة من ماركت الخديوي"
    },
    {
        name: "زيت ",
        price: "50 ج/لتر",
        image: "images/2زيت.jpg",
        category: "زيوت",
        alt: "زيت عباد الشمس نقي من ماركت الخديوي"
    },
    {
        name: "عدس أصفر",
        price: "20 ج/كجم",
        image: "images/عدس.jpg",
        category: "بقوليات",
        alt: "عدس أصفر عالي الجودة من ماركت الخديوي"
    },
    {
        name: "زيت زيتون بكر",
        price: "100 ج/لتر",
        image: "images/زيت_زيتون.jpg",
        category: "زيوت",
        alt: "زيت زيتون بكر نقي من ماركت الخديوي"
    },
    {
        name: "بيض بلدي",
        price: "2 ج/بيضة",
        image: "images/بيض.jpg",
        category: "ألبان",
        alt: "بيض بلدي طازج من ماركت الخديوي"
    },
    {
        name: "عسل نحل طبيعي",
        price: "150 ج/كجم",
        image: "images/عسل.jpg",
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
        name: "زيت جوز الهند",
        price: "120 ج/لتر",
        image: "images/زيت_جوز_الهند.jpg",
        category: "زيوت",
        alt: "زيت جوز الهند نقي من ماركت الخديوي"
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
        name: "مكرونة سباجيتي",
        price: "15 ج/علبة",
        image: "images/مكرونة.jpg",
        category: "بقالة",
        alt: "مكرونة سباجيتي طازجة من ماركت الخديوي"
    },
    {
        name: "شاي أسود",
        price: "25 ج/علبة",
        image: "images/شاي_أسود.jpg",
        category: "مشروبات",
        alt: "شاي أسود عالي الجودة من ماركت الخديوي"
    },
    {
        name: "ملح طعام",
        price: "5 ج/كجم",
        image: "images/ملح.jpg",
        category: "بقالة",
        alt: "ملح طعام نقي من ماركت الخديوي"
    },
    {
        name: "خل أبيض",
        price: "8 ج/لتر",
        image: "images/خل.jpg",
        category: "بقالة",
        alt: "خل أبيض نقي من ماركت الخديوي"
    },
    {
        name: "عسل أسود",
        price: "20 ج/كجم",
        image: "images/عسل_أسود.jpg",
        category: "منتجات طبيعية",
        alt: "عسل أسود طبيعي من ماركت الخديوي"
    },
    {
        name: "زيت ذرة",
        price: "60 ج/لتر",
        image: "images/زيت_ذرة.jpg",
        category: "زيوت",
        alt: "زيت ذرة نقي من ماركت الخديوي"
    },
    {
        name: "عدس بني",
        price: "18 ج/كجم",
        image: "images/عدس_بني.jpg",
        category: "بقوليات",
        alt: "عدس بني عالي الجودة من ماركت الخديوي"
    },
    {
        name: "فاصوليا بيضاء",
        price: "22 ج/كجم",
        image: "images/فاصوليا.jpg",
        category: "بقوليات",
        alt: "فاصوليا بيضاء طازجة من ماركت الخديوي"
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
        image: "images/جبنة المراعي.jpg",
        category: "ألبان",
        alt: "جبنة المراعي"
    },
    {
        name: "جبنة ثلاجة",
        price: "45 ج/كجم",
        image: "images/جبنة ثلاجة.jpg",
        category: "ألبان",
        alt: "جبنة ثلاجة"
    },
    {
        name: "جبنة فيتا",
        price: "60 ج/كجم",
        image: "images/جبنة فيتة.jpg",
        category: "ألبان",
        alt: "جبنة فيتا"
    },
    {
        name: "جبنة فيتا 1",
        price: "65 ج/كجم",
        image: "images/جبنة فيتة1.jpg",
        category: "ألبان",
        alt: "جبنة فيتا 1"
    },
    {
        name: "جبنة كريمي",
        price: "70 ج/كجم",
        image: "images/جبنة كريمي.jpg",
        category: "ألبان",
        alt: "جبنة كريمي"
    },
    {
        name: "جبنة موزاريلا",
        price: "80 ج/كجم",
        image: "images/جبنة موزاريلا.jpg",
        category: "ألبان",
        alt: "جبنة موزاريلا"
    },
    {
        name: "جبنة رومي",
        price: "70 ج/كجم",
        image: "images/جبنة_رومي.webp",
        category: "ألبان",
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
        image: "images/دومتي كريمي.jpg",
        category: "ألبان",
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
        name: "لبن كامل الدسم",
        price: "15 ج/لتر",
        image: "images/لبن.jpg",
        category: "ألبان",
        alt: "لبن كامل الدسم"
    },
    {
        name: "جبنة بيضاء",
        price: "50 ج/كجم",
        image: "images/جبنة_بيضاء.jpg",
        category: "ألبان",
        alt: "جبنة بيضاء"
    },
    {
        name: "زبادي",
        price: "5 ج/علبة",
        image: "images/زبادي.jpg",
        category: "ألبان",
        alt: "زبادي"
    },
    {
        name: "جبنة رومي",
        price: "70 ج/كجم",
        image: "images/جبنة_رومي.jpg",
        category: "ألبان",
        alt: "جبنة رومي"
    },
    {
        name: "جبنة شيدر",
        price: "90 ج/كجم",
        image: "images/جبنة_شيدر.jpg",
        category: "ألبان",
        alt: "جبنة شيدر"
    },
    {
        name: "كريمة لباني",
        price: "25 ج/علبة",
        image: "images/كريمة_لباني.jpg",
        category: "ألبان",
        alt: "كريمة لباني"
    },
    {
        name: "جبنة موتزاريلا",
        price: "80 ج/كجم",
        image: "images/جبنة_موتزاريلا.jpg",
        category: "ألبان",
        alt: "جبنة موتزاريلا"
    },
    {
        name: "جبنة فيتا",
        price: "60 ج/كجم",
        image: "images/جبنة_فيتا.jpg",
        category: "ألبان",
        alt: "جبنة فيتا"
    },
    {
        name: "زبادي يوناني",
        price: "15 ج/علبة",
        image: "images/زبادي_يوناني.jpg",
        category: "ألبان",
        alt: "زبادي يوناني"
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
        return;
    }

    paginatedProducts.forEach(product => {
        const card = `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4"> <!-- Adjusted column size -->
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top product-img" alt="${product.alt}" loading="lazy">
                    <div class="card-body">
                        <h3 class="card-title h5">${product.name}</h3>
                        <p class="text-success"><strong>السعر:</strong> ${product.price}</p>
                        <button class="btn btn-primary btn-sm" onclick='addToCart(${JSON.stringify(product)})'>إضافة إلى السلة</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
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

// دالة لتصفية المنتجات حسب الفئة
function filterByCategory(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    createProductCards(filteredProducts);
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

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const isCheese = product.category === "ألبان" && product.name.includes("جبنة");
        cart.push({ 
            ...product, 
            quantity: 1, 
            weight: isCheese ? "1 كجم" : undefined // Default weight for cheese
        });
    }
    updateCartUI();
    showAddToCartAnimation(product.image);
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
        return;
    }

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    cart.forEach(item => {
        const isCheese = item.category === "ألبان" && item.name.includes("جبنة");
        const pricePerKg = parseFloat(item.price.split(' ')[0]); // Extract price as a number
        const weightFactor = item.weight === "ربع كجم" ? 0.25 : item.weight === "نصف كجم" ? 0.5 : 1;
        const calculatedPrice = isCheese ? (pricePerKg * weightFactor).toFixed(2) : item.price;

        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.alt}">
                <div>
                    <p>${item.name}</p>
                    <p>الكمية: ${item.quantity}</p>
                    ${isCheese ? `
                        <select class="form-select mt-2" onchange="updateWeight('${item.name}', this.value)">
                            <option value="ربع كجم" ${item.weight === "ربع كجم" ? "selected" : ""}>ربع كجم</option>
                            <option value="نصف كجم" ${item.weight === "نصف كجم" ? "selected" : ""}>نصف كجم</option>
                            <option value="1 كجم" ${item.weight === "1 كجم" ? "selected" : ""}>1 كجم</option>
                        </select>
                    ` : ''}
                    <p class="mt-2">السعر: ${calculatedPrice} ج</p>
                    <textarea class="form-control mt-2" placeholder="أضف ملاحظاتك..." data-product="${item.name}" oninput="updateNotes('${item.name}', this.value)"></textarea>
                </div>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.name}')">إزالة</button>
            </div>
        `;
        cartContainer.innerHTML += cartItem;
    });
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

function showAddToCartAnimation(imageSrc) {
    const animationElement = document.createElement('img');
    animationElement.src = imageSrc;
    animationElement.className = 'add-to-cart-animation';

    // Use event parameter explicitly
    document.addEventListener('click', (event) => {
        animationElement.style.top = `${event.clientY}px`;
        animationElement.style.left = `${event.clientX}px`;
    });

    document.body.appendChild(animationElement);

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
