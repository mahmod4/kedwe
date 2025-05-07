// components/Profile.js
// مكون لعرض بيانات المستخدم من Supabase

import { supabase } from '../lib/supabase.js';

// دالة لجلب بيانات ملف تعريف المستخدم
async function fetchUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('خطأ في جلب ملف التعريف:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return null;
  }
}

// دالة لتحديث واجهة المستخدم بناءً على حالة المصادقة
async function updateAuthUI() {
  try {
    // الحصول على المستخدم الحالي
    const { data: { user }, error } = await supabase.auth.getUser();

    // عناصر واجهة المستخدم
    const loginButton = document.getElementById('login-button');
    const userMenuContainer = document.getElementById('user-menu-container');

    if (error || !user) {
      // المستخدم غير مسجل الدخول
      if (loginButton) {
        loginButton.innerHTML = '<i class="fas fa-user"></i> تسجيل الدخول';
        loginButton.style.display = 'inline-block';
      }

      if (userMenuContainer) {
        userMenuContainer.style.display = 'none';
      }
      
      return null;
    }

    // المستخدم مسجل الدخول - جلب بيانات الملف الشخصي
    const profile = await fetchUserProfile(user.id);
    
    // تحديث واجهة المستخدم
    if (loginButton) {
      loginButton.style.display = 'none';
    }

    if (userMenuContainer) {
      userMenuContainer.style.display = 'block';
      
      // تحديث اسم المستخدم
      const userNameElement = userMenuContainer.querySelector('.user-name');
      if (userNameElement) {
        userNameElement.textContent = profile?.full_name || user.email;
        console.log('تم تحديث اسم المستخدم:', profile?.full_name || user.email);
      }
      
      // إضافة مستمع حدث لزر تسجيل الخروج إذا لم يكن موجودًا
      const logoutButton = userMenuContainer.querySelector('#logout-button');
      if (logoutButton && !logoutButton._hasEventListener) {
        logoutButton.addEventListener('click', async (e) => {
          e.preventDefault();
          // استدعاء دالة تسجيل الخروج من Auth.js
          const { signOut } = await import('./Auth.js');
          await signOut();
          updateAuthUI();
        });
        logoutButton._hasEventListener = true;
      }

      // إضافة مستمع حدث لفتح/إغلاق قائمة المستخدم إذا لم يكن موجودًا
      const menuToggle = userMenuContainer.querySelector('.user-menu-toggle');
      if (menuToggle && !menuToggle._hasEventListener) {
        menuToggle.addEventListener('click', () => {
          const menu = userMenuContainer.querySelector('.user-menu');
          if (menu) {
            menu.classList.toggle('active');
          }
        });
        menuToggle._hasEventListener = true;
      }
    }

    return { user, profile };
  } catch (error) {
    console.error('خطأ في تحديث واجهة المستخدم:', error);
    return null;
  }
}

// دالة مساعدة لإنشاء حاوية قائمة المستخدم إذا لم تكن موجودة
function createUserMenuContainer() {
  // التحقق من وجود حاوية قائمة المستخدم
  let container = document.getElementById('user-menu-container');
  
  if (!container) {
    // إنشاء حاوية جديدة
    container = document.createElement('div');
    container.id = 'user-menu-container';
    container.className = 'user-menu-container';
    container.innerHTML = `
      <div class="user-menu-toggle">
        <i class="fas fa-user-circle"></i>
        <span class="user-name">المستخدم</span>
        <i class="fas fa-caret-down"></i>
      </div>
      <div class="user-menu">
        <ul>
          <li><a href="#profile"><i class="fas fa-id-card"></i> الملف الشخصي</a></li>
          <li><a href="#orders"><i class="fas fa-shopping-bag"></i> طلباتي</a></li>
          <li><a href="#" id="logout-button"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a></li>
        </ul>
      </div>
    `;

    // إضافة الحاوية إلى header-actions
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
      headerActions.appendChild(container);
      
      // إضافة مستمع حدث لزر تسجيل الخروج
      const logoutButton = container.querySelector('#logout-button');
      if (logoutButton) {
        logoutButton.addEventListener('click', async (e) => {
          e.preventDefault();
          // استدعاء دالة تسجيل الخروج من Auth.js
          const { signOut } = await import('./Auth.js');
          await signOut();
          updateAuthUI();
        });
      }

      // إضافة مستمع حدث لفتح/إغلاق قائمة المستخدم
      const menuToggle = container.querySelector('.user-menu-toggle');
      if (menuToggle) {
        menuToggle.addEventListener('click', () => {
          const menu = container.querySelector('.user-menu');
          if (menu) {
            menu.classList.toggle('active');
          }
        });
      }
    }
  }

  return container;
}

// تصدير الدوال للاستخدام في الملفات الأخرى
export { fetchUserProfile, updateAuthUI };
