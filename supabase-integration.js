// supabase-integration.js
// ملف لتكامل موقع متجر الخديوي مع Supabase

// استيراد المكونات اللازمة
import { supabase } from './lib/supabase.js';
import { signUp, signIn, signOut, getCurrentUser } from './components/Auth.js';
import { fetchUserProfile, updateAuthUI } from './components/Profile.js';
import { fetchProducts, displaySupabaseProducts } from './components/ProductList.js';
import { uploadProductImage, createImageUploadForm } from './components/UploadImage.js';

// تنفيذ الكود عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', async () => {
    // تحديث واجهة المستخدم بناءً على حالة المصادقة
    const authData = await updateAuthUI();
    
    // إعداد مستمعي الأحداث لنماذج تسجيل الدخول/إنشاء الحساب
    setupAuthForms();
    
    // إعداد مستمعي الأحداث لتبديل علامات التبويب في نموذج المصادقة
    setupAuthTabs();
    
    // إذا كان المستخدم مسؤولاً، قم بإظهار قسم الإدارة
    if (authData?.user) {
        checkAdminRole(authData.user);
    }
    
    // عرض المنتجات من Supabase
    await displaySupabaseProducts();
});

// دالة لإعداد نماذج تسجيل الدخول/إنشاء الحساب
function setupAuthForms() {
    // نموذج تسجيل الدخول
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // تسجيل الدخول
            const authData = await signIn(email, password);
            
            if (authData) {
                // إغلاق النموذج
                const loginModal = document.getElementById('login-modal');
                if (loginModal) {
                    loginModal.style.display = 'none';
                }
                
                // تحديث واجهة المستخدم
                const userData = await updateAuthUI();
                
                // التحقق من دور المستخدم
                if (userData?.user) {
                    checkAdminRole(userData.user);
                }
            }
        });
    }
    
    // نموذج إنشاء حساب
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            
            // إنشاء حساب جديد
            const authData = await signUp(email, password, fullName);
            
            if (authData) {
                // إغلاق النموذج
                const loginModal = document.getElementById('login-modal');
                if (loginModal) {
                    loginModal.style.display = 'none';
                }
                
                // تحديث واجهة المستخدم
                await updateAuthUI();
            }
        });
    }
}

// دالة لإعداد مستمعي الأحداث لتبديل علامات التبويب في نموذج المصادقة
function setupAuthTabs() {
    const tabButtons = document.querySelectorAll('.auth-tab-btn');
    const tabContents = document.querySelectorAll('.auth-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // إزالة الفئة النشطة من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة الفئة النشطة للزر الذي تم النقر عليه
            button.classList.add('active');
            
            // إخفاء جميع المحتويات
            tabContents.forEach(content => content.classList.remove('active'));
            
            // إظهار المحتوى المناسب
            const tabId = button.getAttribute('data-tab');
            const tabContent = document.getElementById(`${tabId}-tab`);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

// دالة للتحقق من دور المستخدم (مسؤول أم لا)
async function checkAdminRole(user) {
    try {
        // جلب دور المستخدم من Supabase
        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();
        
        if (error) {
            console.error('خطأ في جلب دور المستخدم:', error);
            return;
        }
        
        // إذا كان المستخدم مسؤولاً، قم بإظهار قسم الإدارة
        if (data && data.role === 'admin') {
            const adminSection = document.getElementById('admin');
            if (adminSection) {
                adminSection.style.display = 'block';
                
                // إنشاء نموذج رفع الصور
                createImageUploadForm('image-upload-container', (imageUrl, fileName) => {
                    console.log('تم رفع الصورة بنجاح:', imageUrl);
                    // هنا يمكن إضافة كود لإضافة المنتج إلى قاعدة البيانات
                });
            }
        }
    } catch (error) {
        console.error('خطأ غير متوقع:', error);
    }
}

// دالة لإظهار إشعارات للمستخدم
window.showNotification = function(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إظهار الإشعار بعد إضافته للصفحة
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إضافة مستمع حدث لزر الإغلاق
    const closeButton = notification.querySelector('.notification-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // إغلاق الإشعار تلقائيًا بعد 5 ثوانٍ
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
};

// دالة مساعدة للحصول على أيقونة الإشعار المناسبة
function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        default:
            return 'fa-info-circle';
    }
}

// تصدير الدوال للاستخدام في الملفات الأخرى
export {
    setupAuthForms,
    setupAuthTabs,
    checkAdminRole
};
