// components/ProductList.js
// مكون لعرض المنتجات من قاعدة بيانات Supabase

import { supabase } from '../lib/supabase.js';

// دالة لجلب المنتجات من Supabase
async function fetchProducts(category = null, searchQuery = null, sortBy = 'id', sortOrder = 'asc') {
  try {
    // إنشاء استعلام أساسي لجلب المنتجات
    let query = supabase
      .from('products')
      .select('id, name, price, image_url, category, description');
    
    // إضافة فلتر حسب الفئة إذا تم تحديدها
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    // إضافة بحث نصي إذا تم تحديده
    if (searchQuery) {
      query = query.ilike('name', `%${searchQuery}%`);
    }
    
    // إضافة ترتيب النتائج
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    
    // تنفيذ الاستعلام
    const { data, error } = await query;

    if (error) {
      console.error('خطأ في جلب المنتجات:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return [];
  }
}

// دالة لعرض المنتجات في واجهة المستخدم
async function displaySupabaseProducts(category = null, searchQuery = null, sortBy = 'id', sortOrder = 'asc') {
  // إظهار مؤشر التحميل
  const productContainer = document.getElementById('product-container');
  if (productContainer) {
    productContainer.innerHTML = `
      <div class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i>
        <span>جاري تحميل المنتجات...</span>
      </div>
    `;
  }

  // الحصول على قيم الفلترة من واجهة المستخدم إذا لم يتم تمريرها
  if (!category) {
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      category = categoryFilter.value;
    }
  }
  
  if (!searchQuery) {
    const searchInput = document.getElementById('search-products');
    if (searchInput) {
      searchQuery = searchInput.value.trim();
    }
  }

  // جلب المنتجات من Supabase باستخدام الفلاتر
  console.log(`جلب المنتجات بالفلاتر: الفئة=${category}, البحث=${searchQuery}, الترتيب=${sortBy} ${sortOrder}`);
  const products = await fetchProducts(category, searchQuery, sortBy, sortOrder);
  
  // التحقق من وجود منتجات
  if (!products || products.length === 0) {
    if (productContainer) {
      productContainer.innerHTML = `<p class="no-products">لا توجد منتجات متاحة تطابق معايير البحث.</p>`;
    }
    return;
  }

  // إنشاء عناصر HTML للمنتجات
  let productsHTML = '';
  products.forEach(product => {
    productsHTML += `
      <div class="product">
        <img src="${product.image_url || 'images/placeholder.png'}" alt="${product.name}" loading="lazy">
        <h3>${product.name}</h3>
        <p class="price">${product.price} ج.م</p>
        <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image_url || 'images/placeholder.png'}">
          <i class="fas fa-cart-plus"></i> أضف للسلة
        </button>
      </div>
    `;
  });

  // عرض المنتجات في الصفحة
  if (productContainer) {
    productContainer.innerHTML = productsHTML;
    
    // إضافة مستمعي الأحداث لأزرار "أضف للسلة"
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }
}

// تصدير الدوال للاستخدام في الملفات الأخرى
export { fetchProducts, displaySupabaseProducts };
