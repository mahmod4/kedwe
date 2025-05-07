// components/ProductList.js
// مكون لعرض المنتجات من قاعدة بيانات Supabase

import { supabase } from '../lib/supabase.js';

// دالة لجلب المنتجات من Supabase
async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

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
async function displaySupabaseProducts() {
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

  // جلب المنتجات من Supabase
  const products = await fetchProducts();
  
  // التحقق من وجود منتجات
  if (!products || products.length === 0) {
    if (productContainer) {
      productContainer.innerHTML = `<p class="no-products">لا توجد منتجات متاحة حاليًا.</p>`;
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
