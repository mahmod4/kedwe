// تحميل المنتجات والفئات من localStorage أو استخدام القائمة الافتراضية
let products = JSON.parse(localStorage.getItem('products')) || [
    {
        name: "رز_الضحي",
        price: "15 ج/كجم",
        image: "images/رز_الضحي.jpg",
        category: "بقوليات",
        alt: "أرز مصري عالي الجودة من ماركت الخديوي"
    }
];

let categories = JSON.parse(localStorage.getItem('categories')) || [
    { name: "بقوليات", icon: "fas fa-seedling" },
    { name: "زيوت", icon: "fas fa-oil-can" },
    { name: "ألبان", icon: "fas fa-cheese" },
    { name: "مشروبات", icon: "fas fa-coffee" },
    { name: "بقالة", icon: "fas fa-shopping-basket" },
    { name: "منتجات طبيعية", icon: "fas fa-leaf" },
    { name: "حلويات", icon: "fas fa-cookie" },
    { name: "خضروات", icon: "fas fa-carrot" }
];

// متغيرات البحث والترتيب
let currentSearchFilter = 'all';
let currentSortField = null;
let currentSortDirection = 'asc';

// البحث في المنتجات
function searchProducts(query) {
    query = query.toLowerCase();
    let filteredProducts = products;

    // تطبيق الفلتر المحدد
    if (currentSearchFilter === 'name') {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query)
        );
    } else if (currentSearchFilter === 'category') {
        filteredProducts = products.filter(product => 
            product.category.toLowerCase().includes(query)
        );
    } else if (currentSearchFilter === 'price') {
        filteredProducts = products.filter(product => 
            product.price.toLowerCase().includes(query)
        );
    } else {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.price.toLowerCase().includes(query)
        );
    }

    // تطبيق الترتيب
    if (currentSortField) {
        filteredProducts.sort((a, b) => {
            let valueA = a[currentSortField];
            let valueB = b[currentSortField];

            if (currentSortField === 'price') {
                // تحويل السعر إلى رقم للترتيب
                valueA = parseFloat(valueA);
                valueB = parseFloat(valueB);
            }

            if (currentSortDirection === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });
    }

    return filteredProducts;
}

// تحديث عدد نتائج البحث
function updateSearchResultsCount(filteredProducts) {
    const resultsCount = document.getElementById('searchResultsCount');
    if (resultsCount) {
        if (filteredProducts.length === products.length) {
            resultsCount.textContent = 'عرض جميع المنتجات';
        } else {
            resultsCount.textContent = `عرض ${filteredProducts.length} من ${products.length} منتج`;
        }
    }
}

// تحديث قائمة الفئات في الصفحة الرئيسية
function updateMainPageCategories() {
    // تحديث أزرار الفئات في الصفحة الرئيسية
    const categoriesContainer = document.querySelector('.categories');
    if (categoriesContainer) {
        categoriesContainer.innerHTML = `
            <button class="btn btn-outline-primary mx-1" onclick="filterByCategory('all')">الكل</button>
            ${categories.map(category => `
                <button class="btn btn-outline-primary mx-1" onclick="filterByCategory('${category.name}')">
                    <i class="${category.icon}"></i> ${category.name}
                </button>
            `).join('')}
        `;
    }

    // تحديث قائمة الفئات في نموذج المنتجات
    updateCategorySelect();

    // تحديث فلترة النتائج في الصفحة الرئيسية
    const productsContainer = document.getElementById('productsContainer');
    if (productsContainer) {
        // إعادة تحميل المنتجات مع الفئات المحدثة
        loadProducts();
    }

    // تحديث كلمات الفلترة في الصفحة الرئيسية
    updateFilterKeywords();
}

// تحديث كلمات الفلترة في الصفحة الرئيسية
function updateFilterKeywords() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // تحديث خاصية placeholder في حقل البحث
        searchInput.placeholder = `ابحث عن منتج... (${categories.map(c => c.name).join('، ')})`;
        
        // تحديث قائمة الكلمات المفتاحية للبحث
        const keywords = categories.map(c => c.name).join(' ');
        searchInput.setAttribute('data-keywords', keywords);
    }
}

// تحميل المنتجات في الصفحة الرئيسية
function loadProducts() {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;

    productsContainer.innerHTML = products.map(product => {
        const category = categories.find(c => c.name === product.category);
        const categoryIcon = category ? category.icon : 'fas fa-box';
        
        return `
            <div class="col-md-4 mb-4 product-item" data-category="${product.category}">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.alt}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">
                            <i class="${categoryIcon}"></i> ${product.category}
                        </p>
                        <p class="card-text price">${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart('${product.name}')">
                            <i class="fas fa-cart-plus"></i> أضف للسلة
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// فلترة المنتجات حسب الفئة
function filterByCategory(category) {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// تحديث قائمة المنتجات في الجدول
function updateProductsTable(filteredProducts = null) {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';

    const productsToShow = filteredProducts || products;

    productsToShow.forEach((product, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${product.image}" alt="${product.alt}" class="product-image"></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1" onclick="editProduct(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // حفظ التغييرات في localStorage
    localStorage.setItem('products', JSON.stringify(products));
}

// تحديث قائمة الفئات في الجدول
function updateCategoriesTable() {
    const tbody = document.getElementById('categoriesTableBody');
    tbody.innerHTML = '';

    categories.forEach((category, index) => {
        const productCount = products.filter(p => p.category === category.name).length;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><i class="${category.icon}"></i></td>
            <td>${category.name}</td>
            <td>${productCount}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1" onclick="editCategory(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteCategory(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // تحديث قائمة الفئات في الصفحة الرئيسية
    updateMainPageCategories();

    // حفظ التغييرات في localStorage
    localStorage.setItem('categories', JSON.stringify(categories));
}

// تحديث قائمة الفئات في نموذج المنتجات
function updateCategorySelect() {
    const select = document.getElementById('productCategory');
    if (select) {
        select.innerHTML = '<option value="">اختر الفئة</option>';
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            select.appendChild(option);
        });
    }
}

// إضافة/تعديل منتج
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productCategory = document.getElementById('productCategory').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').files[0];

    const product = {
        name: productName,
        price: productPrice,
        category: productCategory,
        alt: productDescription || productName
    };

    // معالجة صورة المنتج
    if (productImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            product.image = e.target.result;
            saveProduct(product, productId);
        };
        reader.readAsDataURL(productImage);
    } else {
        // إذا لم يتم اختيار صورة جديدة، احتفظ بالصورة القديمة
        if (productId !== '') {
            product.image = products[productId].image;
        }
        saveProduct(product, productId);
    }
});

// إضافة/تعديل فئة
document.getElementById('categoryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const categoryId = document.getElementById('categoryId').value;
    const categoryName = document.getElementById('categoryName').value;
    const categoryIcon = document.getElementById('categoryIcon').value;

    const category = {
        name: categoryName,
        icon: categoryIcon
    };

    saveCategory(category, categoryId);
});

// حفظ المنتج
function saveProduct(product, productId) {
    if (productId !== '') {
        // تعديل منتج موجود
        products[productId] = product;
    } else {
        // إضافة منتج جديد
        products.push(product);
    }

    updateProductsTable();
    resetForm();
    showNotification('تم حفظ المنتج بنجاح');
}

// حفظ الفئة
function saveCategory(category, categoryId) {
    if (categoryId !== '') {
        // تعديل فئة موجودة
        categories[categoryId] = category;
    } else {
        // إضافة فئة جديدة
        categories.push(category);
    }

    updateCategoriesTable();
    resetCategoryForm();
    showNotification('تم حفظ الفئة بنجاح');
}

// تعديل منتج
function editProduct(index) {
    const product = products[index];
    document.getElementById('productId').value = index;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productDescription').value = product.alt;
    
    // تمرير إلى أعلى النموذج
    document.querySelector('.product-form').scrollIntoView({ behavior: 'smooth' });
}

// تعديل فئة
function editCategory(index) {
    const category = categories[index];
    document.getElementById('categoryId').value = index;
    document.getElementById('categoryName').value = category.name;
    document.getElementById('categoryIcon').value = category.icon;
    
    // تمرير إلى أعلى النموذج
    document.querySelector('.category-form').scrollIntoView({ behavior: 'smooth' });
}

// حذف منتج
function deleteProduct(index) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        products.splice(index, 1);
        updateProductsTable();
        showNotification('تم حذف المنتج بنجاح');
    }
}

// حذف فئة
function deleteCategory(index) {
    const category = categories[index];
    const productCount = products.filter(p => p.category === category.name).length;
    
    if (productCount > 0) {
        alert('لا يمكن حذف هذه الفئة لأنها تحتوي على منتجات. يرجى نقل المنتجات إلى فئة أخرى أولاً.');
        return;
    }

    if (confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
        categories.splice(index, 1);
        updateCategoriesTable();
        showNotification('تم حذف الفئة بنجاح');
    }
}

// إعادة تعيين نموذج المنتجات
function resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productImage').value = '';
}

// إعادة تعيين نموذج الفئات
function resetCategoryForm() {
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryId').value = '';
}

// عرض إشعار
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// تحميل البيانات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    updateProductsTable();
    updateCategoriesTable();

    // إضافة مستمعي الأحداث للبحث
    const searchInput = document.getElementById('adminSearchInput');
    const searchButton = document.getElementById('adminSearchButton');
    const sortByNameButton = document.getElementById('sortByName');
    const sortByPriceButton = document.getElementById('sortByPrice');

    if (searchInput && searchButton) {
        // البحث عند الضغط على زر البحث
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            const filteredProducts = searchProducts(query);
            updateProductsTable(filteredProducts);
            updateSearchResultsCount(filteredProducts);
        });

        // البحث عند الضغط على Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                const filteredProducts = searchProducts(query);
                updateProductsTable(filteredProducts);
                updateSearchResultsCount(filteredProducts);
            }
        });

        // البحث عند الكتابة
        searchInput.addEventListener('input', function() {
            const query = searchInput.value.trim();
            const filteredProducts = searchProducts(query);
            updateProductsTable(filteredProducts);
            updateSearchResultsCount(filteredProducts);
        });
    }

    // تغيير نوع البحث
    document.querySelectorAll('.dropdown-item[data-filter]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            currentSearchFilter = this.dataset.filter;
            const query = searchInput.value.trim();
            const filteredProducts = searchProducts(query);
            updateProductsTable(filteredProducts);
            updateSearchResultsCount(filteredProducts);
        });
    });

    // الترتيب حسب الاسم
    if (sortByNameButton) {
        sortByNameButton.addEventListener('click', function() {
            if (currentSortField === 'name') {
                currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                currentSortField = 'name';
                currentSortDirection = 'asc';
            }
            const query = searchInput.value.trim();
            const filteredProducts = searchProducts(query);
            updateProductsTable(filteredProducts);
            updateSearchResultsCount(filteredProducts);
        });
    }

    // الترتيب حسب السعر
    if (sortByPriceButton) {
        sortByPriceButton.addEventListener('click', function() {
            if (currentSortField === 'price') {
                currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                currentSortField = 'price';
                currentSortDirection = 'asc';
            }
            const query = searchInput.value.trim();
            const filteredProducts = searchProducts(query);
            updateProductsTable(filteredProducts);
            updateSearchResultsCount(filteredProducts);
        });
    }
}); 