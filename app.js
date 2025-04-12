// ==================================
// القسم المشترك وإدارة المنتجات
// ==================================

// --- المنتجات الافتراضية ---
const DEFAULT_PRODUCTS = [
    // أمثلة - استبدل هذه بمنتجاتك الأولية الفعلية
    { name: "أرز مصري فاخر", price: "35 ج", category: "بقوليات", image: "images/products/rice.jpg", description: "أرز عالي الجودة، حبة رفيعة.", isOffer: false, offerEndDate: null },
    { name: "زيت ذرة", price: "70 ج", category: "زيوت", image: "images/products/corn_oil.jpg", description: "زيت ذرة نقي وصحي للقلي والطهي.", isOffer: false, offerEndDate: null },
    { name: "جبنة فيتا", price: "55 ج", category: "ألبان", image: "images/products/feta_cheese.jpg", description: "جبنة فيتا طبيعية، وزن 1 كجم.", isOffer: true, offerEndDate: "2024-12-31" },
    { name: "لبن كامل الدسم", price: "28 ج", category: "ألبان", image: "images/products/full_cream_milk.jpg", description: "لبن طازج كامل الدسم.", isOffer: false, offerEndDate: null },
    { name: "شاي ليبتون", price: "60 ج", category: "مشروبات", image: "images/products/lipton_tea.jpg", description: "علبة شاي ليبتون، 100 فتلة.", isOffer: true, offerEndDate: "2024-10-31" },
    { name: "مكرونة الملكة", price: "15 ج", category: "بقالة", image: "images/products/macaroni.jpg", description: "مكرونة خواتم، 400 جرام.", isOffer: false, offerEndDate: null },
    { name: "عسل نحل طبيعي", price: "120 ج", category: "منتجات طبيعية", image: "images/products/honey.jpg", description: "عسل نحل جبلي نقي.", isOffer: false, offerEndDate: null },
    // أضف المزيد من المنتجات الافتراضية هنا...
];

// --- تحميل المنتجات والسلة --- 
let products = [];
let cart = [];

try {
    const storedProducts = localStorage.getItem('products');
    // استخدام المنتجات المخزنة إذا كانت موجودة وصالحة، وإلا استخدم الافتراضية
    if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        // تحقق بسيط من صحة البيانات (هل هي مصفوفة وليست فارغة؟)
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
            products = parsedProducts;
        } else {
            console.warn("localStorage products data invalid or empty, using defaults.");
            products = [...DEFAULT_PRODUCTS]; // Use defaults if stored data is invalid/empty
            // اختيارياً: احفظ الافتراضيات في localStorage إذا كانت البيانات المخزنة تالفة
            // saveProducts(); 
        }
    } else {
        // لا توجد بيانات مخزنة، استخدم الافتراضية
        products = [...DEFAULT_PRODUCTS];
        // اختيارياً: احفظ الافتراضيات للمرة الأولى
        // saveProducts(); 
    }
} catch (e) {
    console.error("Error parsing localStorage products, using defaults:", e);
    products = [...DEFAULT_PRODUCTS]; // استخدم الافتراضية عند حدوث خطأ
    // اختيارياً: حاول حفظ الافتراضيات لإصلاح الخطأ المحتمل
    // try { saveProducts(); } catch (lsError) { console.error("Failed to save default products to localStorage:", lsError); }
}

try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!Array.isArray(cart)) {
        console.warn("localStorage cart data invalid, resetting cart.");
        cart = [];
        saveCart();
    }
} catch (e) {
    console.error("Error parsing localStorage cart, resetting cart:", e);
    cart = [];
    // try { saveCart(); } catch (lsError) { console.error("Failed to save empty cart to localStorage:", lsError); }
}

let editIndex = -1; // متغير لتتبع فهرس المنتج المعدل (للإدارة)

// دالة لحفظ المنتجات في localStorage
function saveProducts() {
    try {
        localStorage.setItem('products', JSON.stringify(products));
    } catch (e) {
        console.error("Failed to save products to localStorage:", e);
        showNotification("خطأ: لم نتمكن من حفظ تغييرات المنتج. قد يكون المتصفح ممتلئًا.", "error");
    }
}

// دالة لحفظ السلة في localStorage
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.error("Failed to save cart to localStorage:", e);
        // Avoid notifying user too often for cart saves
    }
}

// دالة لعرض الإشعارات
function showNotification(message, type = 'success') {
    const container = document.getElementById('notificationContainer') || document.body; // استخدم body كاحتياطي
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // إضافة عنصر الإشعار
    if (document.getElementById('notificationContainer')) {
        container.appendChild(notification);
    } else {
        // إذا لم يكن هناك حاوية مخصصة، أضفها إلى body مع بعض التنسيق الأساسي
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '2000';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.color = 'white';
        notification.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
        notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        container.appendChild(notification);
    }

    // إزالة الإشعار بعد 3 ثوانٍ
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


// ==================================
// وظائف لوحة التحكم (admin-dashboard.html)
// ==================================

// دالة لعرض المنتجات في لوحة التحكم
function displayAdminProducts(productsToDisplay = products) {
    const container = document.getElementById('adminProductsContainer');
    if (!container) return; // تأكد من أننا في الصفحة الصحيحة

    container.innerHTML = '';
    if (productsToDisplay.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><h4>لا توجد منتجات مطابقة للبحث</h4></div>';
        return;
    }

    productsToDisplay.forEach(product => {
        const originalIndex = products.findIndex(p => p.name === product.name && p.price === product.price /* Add more checks if needed */);
        if (originalIndex === -1) return;

        let offerBadge = '';
        let offerInfo = '';
        let cardClass = '';
        if (product.isOffer) {
            const endDate = product.offerEndDate ? new Date(product.offerEndDate) : null;
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Compare dates only

            if (endDate && endDate < today) {
                offerBadge = '<span class="badge bg-secondary text-dark offer-badge">عرض منتهي</span>';
                cardClass = 'is-offer-expired';
                offerInfo = `<small class="d-block text-muted">انتهى في: ${product.offerEndDate}</small>`;
            } else {
                offerBadge = '<span class="badge bg-warning text-dark offer-badge">عرض خاص</span>';
                cardClass = 'is-offer';
                if (endDate) {
                    offerInfo = `<small class="d-block text-warning">ينتهي في: ${product.offerEndDate}</small>`;
                }
            }
        }

        const card = `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100 admin-dashboard-card ${cardClass}">
                     <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-img" alt="${product.name || 'Product'}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
                        ${offerBadge}
                    </div>
                    <div class="card-body">
                        <h3 class="card-title h5">${product.name || 'اسم غير متوفر'}</h3>
                        <p class="text-success mb-1"><strong>السعر:</strong> ${product.price || '-'} ج</p>
                        ${offerInfo} <!-- Display offer end date info -->
                        <div class="mt-2"> <!-- Wrapper for buttons -->
                            <button class="btn btn-warning btn-sm me-1" onclick='setupEditModal(${originalIndex})'><i class="fas fa-edit"></i> تعديل</button>
                            <button class="btn btn-danger btn-sm" onclick='deleteProduct(${originalIndex})'><i class="fas fa-trash"></i> حذف</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// دالة لتصفية المنتجات في لوحة التحكم
function filterAdminProducts() {
    const searchTerm = document.getElementById('adminSearchInput').value.toLowerCase().trim();
    const filteredProducts = products.filter(product => {
        const nameMatch = product.name && product.name.toLowerCase().includes(searchTerm);
        const categoryMatch = product.category && product.category.toLowerCase().includes(searchTerm);
        return nameMatch || categoryMatch;
    });
    displayAdminProducts(filteredProducts); // عرض المنتجات المفلترة
}

// إعداد النافذة المنبثقة للإضافة
function setupAddModal() {
    editIndex = -1; // تحديد أننا في وضع الإضافة
    const form = document.getElementById('productForm');
    if (!form) return;
    form.reset(); // مسح الحقول
    document.querySelector('#addProductModal .modal-title').textContent = 'إضافة منتج جديد';
    form.elements['image'].required = true;
    const modalElement = document.getElementById('addProductModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// إعداد النافذة المنبثقة للتعديل
function setupEditModal(index) {
    if (index < 0 || index >= products.length) return;
    editIndex = index;
    const product = products[index];
    const form = document.getElementById('productForm');
    if (!form) return;

    // Populate form fields
    form.elements['name'].value = product.name || '';
    form.elements['price'].value = product.price ? String(product.price).replace(' ج', '') : '';
    form.elements['category'].value = product.category || '';
    form.elements['description'].value = product.description || '';
    form.elements['isOffer'].checked = product.isOffer || false;
    form.elements['offerEndDate'].value = product.offerEndDate || ''; // Populate end date

    // Show/hide end date field based on checkbox
    document.getElementById('offerEndDateGroup').style.display = form.elements['isOffer'].checked ? 'block' : 'none';

    document.querySelector('#addProductModal .modal-title').textContent = 'تعديل المنتج';
    form.elements['image'].required = false;
    const modalElement = document.getElementById('addProductModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// معالجة إرسال النموذج (إضافة أو تعديل)
function handleFormSubmit() {
    const form = document.getElementById('productForm');
    if (!form) return;
    const formData = new FormData(form);
    const priceValue = formData.get('price');
    const isOfferChecked = form.elements['isOffer'].checked;
    const offerEndDateValue = formData.get('offerEndDate');

    // Validate end date if offer is checked
    if (isOfferChecked && !offerEndDateValue) {
        showNotification('يرجى تحديد تاريخ انتهاء للعرض الخاص.', 'error');
        return;
    }

    const productData = {
        name: formData.get('name'),
        price: `${priceValue} ج`,
        category: formData.get('category'),
        description: formData.get('description'),
        isOffer: isOfferChecked,
        offerEndDate: isOfferChecked ? offerEndDateValue : null, // Save end date only if offer
        image: editIndex !== -1 && products[editIndex] ? products[editIndex].image : ''
    };

    const imageFile = formData.get('image');

    if (editIndex === -1 && (!imageFile || imageFile.size === 0)) {
        showNotification('يرجى اختيار صورة للمنتج عند الإضافة.', 'error');
        return;
    }

    const processProduct = (imageData) => {
        if (imageData) {
            productData.image = imageData;
        }

        if (!productData.name || !priceValue || !productData.category) {
             showNotification('يرجى ملء جميع الحقول المطلوبة (الاسم، السعر، الصنف).', 'error');
             return;
        }

        if (editIndex === -1) {
            products.push(productData);
            showNotification('تمت إضافة المنتج بنجاح', 'success');
        } else {
            if (editIndex >= 0 && editIndex < products.length) {
                products[editIndex] = productData;
                showNotification('تم تعديل المنتج بنجاح', 'success');
            } else {
                showNotification('خطأ: فهرس المنتج غير صالح للتعديل.', 'error');
                editIndex = -1;
                return;
            }
        }

        saveProducts();
        displayAdminProducts();
        form.reset();
        // Reset end date field visibility
        document.getElementById('offerEndDateGroup').style.display = 'none';
        const modalElement = document.getElementById('addProductModal');
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
              modal.hide();
            }
        }
        editIndex = -1;
    };

    if (imageFile && imageFile.size > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            processProduct(e.target.result);
        };
        reader.onerror = function() {
            showNotification('حدث خطأ أثناء قراءة الصورة.', 'error');
        };
        reader.readAsDataURL(imageFile);
    } else {
        processProduct(editIndex !== -1 ? productData.image : null);
    }
}

// دالة لحذف منتج
function deleteProduct(index) {
    if (index < 0 || index >= products.length) return;
    if (confirm(`هل أنت متأكد من حذف المنتج: ${products[index].name || 'هذا المنتج'}؟`)) {
        products.splice(index, 1);
        saveProducts();
        displayAdminProducts();
        showNotification('تم حذف المنتج بنجاح', 'success');
    }
}

// دالة لمزامنة التغييرات مع الموقع الرئيسي (هي نفسها saveProducts حاليًا)
function syncWithMainSite() {
    saveProducts();
    showNotification('تم حفظ التغييرات. ستظهر في الموقع الرئيسي عند إعادة تحميله.', 'success');
}


// ==================================
// وظائف الموقع الرئيسي (index.html)
// ==================================

// دالة إنشاء بطاقات المنتجات للموقع
function createProductCards(productsArray, page = 1) {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    container.innerHTML = '';

    const itemsPerPage = 16;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = productsArray.slice(startIndex, endIndex);

    if (paginatedProducts.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><h4>لا توجد منتجات مطابقة</h4></div>';
        createPagination(productsArray.length, itemsPerPage, page);
        return;
    }

    paginatedProducts.forEach(product => {
        const safeProduct = { ...product };
        const productJson = JSON.stringify(safeProduct).replace(/'/g, "\\'").replace(/"/g, '&quot;');

        let isOfferBadge = '';
        let cardClass = '';
        let remainingDaysText = ''; // Initialize remaining days text

        if (product.isOffer) {
            const endDate = product.offerEndDate ? new Date(product.offerEndDate) : null;
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Compare dates only

            // Show badge and remaining days only if offer is active
            if (endDate && endDate >= today) {
                isOfferBadge = '<span class="badge bg-danger offer-badge-main">عرض!</span>';
                cardClass = 'main-is-offer';

                // Calculate remaining days
                const diffTime = endDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Use ceil for days

                if (diffDays === 0) {
                    remainingDaysText = '<small class="d-block text-warning fw-bold">ينتهي اليوم!</small>';
                } else if (diffDays === 1) {
                    remainingDaysText = '<small class="d-block text-warning">آخر يوم للعرض!</small>';
                } else {
                    remainingDaysText = `<small class="d-block text-warning">ينتهي خلال ${diffDays} أيام</small>`;
                }
            } else if (!endDate) { // Offer without end date
                 isOfferBadge = '<span class="badge bg-danger offer-badge-main">عرض!</span>';
                 cardClass = 'main-is-offer';
            }
        }

        const card = `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100 main-site-card ${cardClass}">
                     <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-img" alt="${product.name || 'Product'}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
                        ${isOfferBadge}
                    </div>
                    <div class="card-body">
                        <h3 class="card-title h5">${product.name || 'اسم غير متوفر'}</h3>
                        <p class="text-success mb-0"><strong>السعر:</strong> ${product.price || '-'} ج</p>
                        ${remainingDaysText} <!-- Display remaining days here -->
                        <button class="btn btn-primary btn-sm mt-2" onclick='addToCart(event, ${productJson})'><i class="fas fa-cart-plus"></i> إضافة للسلة</button>
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
    if (!paginationContainer) return; // تأكد من أننا في الصفحة الصحيحة
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return; // لا تعرض التصفح لصفحة واحدة

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'} mx-1`;
        button.textContent = i;
        // Need to preserve current filter/search term when paginating
        button.addEventListener('click', () => {
            const searchTerm = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase().trim() : '';
            const activeCategoryButton = document.querySelector('.categories .btn.active');
            const currentCategory = activeCategoryButton ? activeCategoryButton.getAttribute('data-category') : 'all';
            filterAndDisplayProducts(searchTerm, currentCategory, i);
        });
        paginationContainer.appendChild(button);
    }
}

// دالة للبحث والتصفية وعرض المنتجات
function filterAndDisplayProducts(searchTerm = '', category = 'all', page = 1) {
    const filtered = products.filter(product => {
        const nameMatch = product.name && product.name.toLowerCase().includes(searchTerm);
        const categoryMatch = product.category && product.category.toLowerCase().includes(searchTerm);
        const categoryFilterMatch = category === 'all' || (product.category && product.category === category);
        return (nameMatch || categoryMatch) && categoryFilterMatch;
    });
    createProductCards(filtered, page);
}

// تحديث عنوان URL عند البحث
function updateURL(searchTerm) {
    if (typeof history.pushState !== 'function') return; // Check if supported
    const state = { search: searchTerm };
    const title = searchTerm ? `نتائج البحث عن: ${searchTerm} - الخديوي` : "ماركت الخديوي - سوبر ماركت شامل في مصر";
    const url = searchTerm ? `${window.location.pathname}?search=${encodeURIComponent(searchTerm)}` : window.location.pathname;
    history.pushState(state, title, url);
    document.title = title;
}

// دالة لإضافة منتج إلى السلة
function addToCart(event, product) { // Accept event as first argument
    if (!product || !product.name) return;
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const isCheese = product.category === "ألبان" && product.name.includes("جبنة");
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1,
            weight: isCheese ? "1 كجم" : undefined,
            note: '' // Initialize notes
        });
    }
    saveCart();
    updateCartUI();
    // Pass the clicked button element to the animation function
    if(event && event.target) {
        showAddToCartAnimation(event.target.closest('button'));
    }
    showNotification(`${product.name} تمت إضافته إلى السلة.`);
}

// دالة لتحديث عرض السلة
function updateCartUI() {
    const cartContainer = document.getElementById('cartItems');
    const cartCountElement = document.getElementById('cartCount');
    const cartTotalElement = document.getElementById('cartTotal'); // Assuming you have an element for total

    if (!cartContainer || !cartCountElement) return;

    cartContainer.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center p-3">سلة المشتريات فارغة</p>';
    } else {
        cart.forEach((item, index) => {
            const isCheese = item.category === "ألبان" && item.name.includes("جبنة");
            const pricePerUnit = parseFloat(String(item.price).replace(' ج', '')) || 0;
            let weightFactor = 1;
            if (isCheese) {
                 weightFactor = item.weight === "ربع كجم" ? 0.25 : item.weight === "نصف كجم" ? 0.5 : 1;
            }
            const calculatedItemPrice = pricePerUnit * weightFactor;
            const itemTotal = calculatedItemPrice * item.quantity;
            total += itemTotal;
            itemCount += item.quantity;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item d-flex align-items-center p-2 border-bottom';
            cartItemDiv.innerHTML = `
                <img src="${item.image}" class="cart-item-image me-2" alt="${item.name || 'Item'}" onerror="this.src='images/placeholder.jpg'">
                <div class="flex-grow-1">
                    <h6 class="mb-1 cart-item-name">${item.name || 'اسم غير متوفر'}</h6>
                    <small class="text-muted d-block">السعر: ${calculatedItemPrice.toFixed(2)} ج ${isCheese ? '/ ' + item.weight : ''}</small>
                    <div class="d-flex align-items-center mt-1">
                        <button class="btn btn-sm btn-outline-secondary quantity-btn" onclick="updateCartItemQuantity(${index}, ${item.quantity - 1})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary quantity-btn" onclick="updateCartItemQuantity(${index}, ${item.quantity + 1})">+</button>
                    </div>
                    ${isCheese ? `
                        <select class="form-select form-select-sm mt-2 weight-select" onchange="updateWeight(${index}, this.value)">
                            <option value="ربع كجم" ${item.weight === "ربع كجم" ? "selected" : ""}>ربع كجم</option>
                            <option value="نصف كجم" ${item.weight === "نصف كجم" ? "selected" : ""}>نصف كجم</option>
                            <option value="1 كجم" ${item.weight === "1 كجم" ? "selected" : ""}>1 كجم</option>
                        </select>
                    ` : ''}
                    <textarea class="form-control form-control-sm mt-2 notes-input" placeholder="أضف ملاحظاتك..." oninput="updateNotes(${index}, this.value)">${item.note || ''}</textarea>
                </div>
                <div class="ms-2">
                     <p class="mb-1 text-end"><strong>${itemTotal.toFixed(2)} ج</strong></p>
                     <button class="btn btn-sm btn-danger remove-btn" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
                </div>
            `;
            cartContainer.appendChild(cartItemDiv);
        });
    }

    cartCountElement.textContent = itemCount;
    if (cartTotalElement) {
        cartTotalElement.textContent = `${total.toFixed(2)} ج`;
    }
    // Update visibility based on items
    const cartEl = document.getElementById('cartContainer');
    if (cartEl) cartEl.style.display = cart.length > 0 ? 'block' : 'none';

}

// تحديث كمية عنصر في السلة
function updateCartItemQuantity(index, newQuantity) {
    if (index < 0 || index >= cart.length) return;
    if (newQuantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        saveCart();
        updateCartUI();
    }
}

// إزالة عنصر من السلة
function removeFromCart(index) {
    if (index < 0 || index >= cart.length) return;
    const removedItemName = cart[index].name;
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showNotification(`${removedItemName} تم إزالته من السلة.`, 'error');
}

// تحديث وزن الجبنة
function updateWeight(index, weight) {
    if (index < 0 || index >= cart.length) return;
    const item = cart[index];
    if (item.category === "ألبان" && item.name.includes("جبنة")) {
        item.weight = weight;
        saveCart();
        updateCartUI();
    }
}

// تحديث ملاحظات المنتج
function updateNotes(index, note) {
    if (index < 0 || index >= cart.length) return;
    cart[index].note = note;
    saveCart(); // Save notes immediately
    // No UI update needed just for notes unless displayed differently
}

// تأثير إضافة المنتج للسلة
function showAddToCartAnimation(clickedButtonElement) { // Modify function to accept the element
    if (!clickedButtonElement) return;
    // const button = event.target.closest('button'); // No longer rely on event here
    // if (!button) return;
    const card = clickedButtonElement.closest('.card');
    if (!card) return;
    const img = card.querySelector('img');
    if (!img) return;

    const imgRect = img.getBoundingClientRect();
    const cartToggle = document.querySelector('.cart-toggle');
    if (!cartToggle) return;
    const cartRect = cartToggle.getBoundingClientRect();

    const animationElement = document.createElement('img');
    animationElement.src = img.src;
    animationElement.className = 'add-to-cart-animation'; // Use class for styling
    animationElement.style.position = 'fixed';
    animationElement.style.top = `${imgRect.top}px`;
    animationElement.style.left = `${imgRect.left}px`;
    animationElement.style.width = `${imgRect.width}px`;
    animationElement.style.height = `${imgRect.height}px`;
    animationElement.style.zIndex = '2000';
    animationElement.style.borderRadius = '5px';
    animationElement.style.transition = 'all 1s ease-in-out';

    document.body.appendChild(animationElement);

    // Start animation after element is added
    requestAnimationFrame(() => {
        animationElement.style.top = `${cartRect.top + cartRect.height / 2}px`;
        animationElement.style.left = `${cartRect.left + cartRect.width / 2}px`;
        animationElement.style.width = `0px`;
        animationElement.style.height = `0px`;
        animationElement.style.opacity = '0';
    });

    animationElement.addEventListener('transitionend', () => {
        animationElement.remove();
    });
}


// فتح/إغلاق السلة
function toggleCart() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;
    const isOpen = cartContainer.style.display === 'block';
    cartContainer.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) {
        updateCartUI(); // Update cart when opening
    }
}

// إتمام الشراء (واتساب)
function checkout() {
    if (cart.length === 0) {
        showNotification('سلة المشتريات فارغة!', 'error');
        return;
    }

    let message = 'مرحباً، أريد إتمام الطلب التالي من ماركت الخديوي:\n---------------------\n';
    let total = 0;
    cart.forEach(item => {
        const pricePerUnit = parseFloat(String(item.price).replace(' ج', '')) || 0;
        let weightFactor = 1;
        let weightInfo = '';
        if (item.category === "ألبان" && item.name.includes("جبنة")) {
            weightFactor = item.weight === "ربع كجم" ? 0.25 : item.weight === "نصف كجم" ? 0.5 : 1;
            weightInfo = ` (${item.weight})`;
        }
        const calculatedItemPrice = pricePerUnit * weightFactor;
        const itemTotal = calculatedItemPrice * item.quantity;
        total += itemTotal;

        message += `- ${item.name}${weightInfo} (الكمية: ${item.quantity}) - السعر: ${itemTotal.toFixed(2)} ج\n`;
        if (item.note) {
            message += `  *ملاحظة:* ${item.note}\n`;
        }
    });
    message += `---------------------\n*إجمالي الطلب:* ${total.toFixed(2)} ج`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/201003316735?text=${encodedMessage}`; // Replace with actual number
    window.open(whatsappURL, '_blank');
}

// دالة لإنشاء دلافين إضافية بشكل عشوائي
function createRandomDolphins() {
    const waterSurface = document.querySelector('.water-surface');
    if (!waterSurface) return;
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

    //setTimeout(createRandomDolphins, 10000); // Let's not make it recursive for now
}

// دالة لإنشاء خلفية الأسماك المتحركة
function initFishBackground() {
    const fishContainer = document.getElementById('fishContainer');
    if (!fishContainer) return;
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
        }, duration * 1000); // Ensure duration is in ms
    }
}

// ==================================
// تهيئة الصفحات عند التحميل ومستمع التخزين
// ==================================
document.addEventListener('DOMContentLoaded', function() {

    // تهيئة مشتركة
    try {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts);
            if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
                products = parsedProducts;
            } else {
                console.warn("localStorage products data invalid or empty, using defaults.");
                products = [...DEFAULT_PRODUCTS];
            }
        } else {
            products = [...DEFAULT_PRODUCTS];
        }
    } catch (e) {
        console.error("Error parsing localStorage products, using defaults:", e);
        products = [...DEFAULT_PRODUCTS];
    }

    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (!Array.isArray(cart)) {
            console.warn("localStorage cart data invalid, resetting cart.");
            cart = [];
            saveCart();
        }
    } catch (e) {
        console.error("Error parsing localStorage cart, resetting cart:", e);
        cart = [];
    }

    // تهيئة صفحة الموقع الرئيسي (index.html)
    const productsContainer = document.getElementById('productsContainer');
    const adminProductsContainer = document.getElementById('adminProductsContainer');

    if (productsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search') || '';
        const categoryParam = 'all'; // Default category or get from URL if needed

        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchParam) {
            searchInput.value = searchParam;
        }

        filterAndDisplayProducts(searchParam, categoryParam, 1);
        updateCartUI(); // Initial cart display

        // تحديث سنة حقوق النشر
        const yearElement = document.getElementById('year');
        if(yearElement) {
             yearElement.textContent = new Date().getFullYear();
        }

        // بدء خلفية الأسماك المتحركة والدلافين
        initFishBackground();
        setTimeout(createRandomDolphins, 5000);

        // ربط حدث البحث
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase().trim();
                updateURL(searchTerm);
                const activeCategoryButton = document.querySelector('.categories .btn.active');
                const currentCategory = activeCategoryButton ? activeCategoryButton.getAttribute('data-category') : 'all';
                filterAndDisplayProducts(searchTerm, currentCategory, 1);
            });
        }

        // ربط أزرار الفئات
        const categoryButtons = document.querySelectorAll('.categories button');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                 categoryButtons.forEach(btn => btn.classList.remove('active', 'btn-primary'));
                 categoryButtons.forEach(btn => btn.classList.add('btn-outline-primary'));
                 this.classList.add('active', 'btn-primary');
                 this.classList.remove('btn-outline-primary');

                 const category = this.getAttribute('data-category');
                 const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
                 filterAndDisplayProducts(searchTerm, category, 1);
            });
        });
    }

    // تهيئة لوحة التحكم (admin-dashboard.html)
    if (adminProductsContainer) {
        displayAdminProducts();
        const addButton = document.querySelector('button[data-bs-target="#addProductModal"]');
        if (addButton) {
            addButton.onclick = setupAddModal;
        }
        const saveButton = document.getElementById('saveProductButton');
        if (saveButton) {
            saveButton.onclick = handleFormSubmit;
        }
        const syncButton = document.getElementById('syncButton');
        if (syncButton) {
            syncButton.onclick = syncWithMainSite;
        }
        const adminSearchInput = document.getElementById('adminSearchInput');
        if (adminSearchInput) {
            adminSearchInput.addEventListener('input', filterAdminProducts);
        }
        const isOfferCheckbox = document.getElementById('isOfferCheck');
        const offerEndDateGroup = document.getElementById('offerEndDateGroup');
        if (isOfferCheckbox && offerEndDateGroup) {
            isOfferCheckbox.addEventListener('change', function() {
                offerEndDateGroup.style.display = this.checked ? 'block' : 'none';
                document.getElementById('offerEndDate').required = this.checked;
            });
        }
    }
});

// مستمع حدث التخزين لتحديث الموقع الرئيسي تلقائياً
window.addEventListener('storage', function(event) {
    if (event.key === 'products') {
        console.log('Storage event detected for products key.');
        try {
            const updatedProducts = JSON.parse(event.newValue);
            if (Array.isArray(updatedProducts)) {
                products = updatedProducts; // تحديث المصفوفة الرئيسية
                console.log('Products array updated from storage event.');

                // إذا كنا في الموقع الرئيسي، أعد عرض المنتجات
                const productsContainer = document.getElementById('productsContainer');
                if (productsContainer) {
                    console.log('Products container found, re-rendering main site products...');
                    // استخدام البحث والتصنيف الحالي لإعادة العرض
                    const searchInput = document.getElementById('searchInput');
                    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
                    const activeCategoryButton = document.querySelector('.categories .btn.active');
                    const currentCategory = activeCategoryButton ? activeCategoryButton.getAttribute('data-category') : 'all';
                    filterAndDisplayProducts(searchTerm, currentCategory, 1); // إعادة العرض من الصفحة الأولى
                }
                 // قد تحتاج أيضًا إلى تحديث عرض لوحة التحكم إذا كانت مفتوحة
                 const adminProductsContainer = document.getElementById('adminProductsContainer');
                 if (adminProductsContainer) {
                     console.log('Admin products container found, re-rendering admin products...');
                     const adminSearchInput = document.getElementById('adminSearchInput');
                     const adminSearchTerm = adminSearchInput ? adminSearchInput.value.toLowerCase().trim() : '';
                     filterAdminProducts(); // استخدم دالة الفلترة الخاصة بالإدارة
                 }

            } else {
                // إذا كانت القيمة الجديدة غير صالحة، استخدم الافتراضية كإجراء احترازي
                console.warn('Invalid data received from storage event for products, using defaults.');
                products = [...DEFAULT_PRODUCTS];
                 // إعادة عرض المنتجات الافتراضية
                 const productsContainer = document.getElementById('productsContainer');
                 if (productsContainer) filterAndDisplayProducts();
                 const adminProductsContainer = document.getElementById('adminProductsContainer');
                 if (adminProductsContainer) displayAdminProducts();
            }
        } catch (e) {
            console.error("Error processing storage event:", e);
            // في حالة الخطأ، استخدم الافتراضية
            products = [...DEFAULT_PRODUCTS];
             // إعادة عرض المنتجات الافتراضية
             const productsContainer = document.getElementById('productsContainer');
             if (productsContainer) filterAndDisplayProducts();
             const adminProductsContainer = document.getElementById('adminProductsContainer');
             if (adminProductsContainer) displayAdminProducts();
        }
    }
}); 
