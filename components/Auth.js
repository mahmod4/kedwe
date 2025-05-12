// components/Auth.js
// مكون للتعامل مع المصادقة (تسجيل الدخول وإنشاء الحسابات)

import { supabase } from '../lib/supabase.js';

// دالة لتسجيل مستخدم جديد
async function signUp(email, password, fullName) {
  try {
    // إنشاء حساب جديد
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      showNotification(error.message, 'error');
      return null;
    }

    // إنشاء ملف تعريف للمستخدم
    if (data.user) {
      // إنشاء سجل في جدول profiles باستخدام استعلام متقدم
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            user_id: data.user.id,
            full_name: fullName,
            email: email,
            role: 'user',  // الدور الافتراضي للمستخدمين الجدد
            created_at: new Date().toISOString()
          }
        ])
        .select(); // إضافة select() لإرجاع البيانات التي تم إدراجها

      if (profileError) {
        console.error('خطأ في إنشاء ملف التعريف:', profileError);
      } else {
        console.log('تم إنشاء ملف التعريف بنجاح:', profileData);
      }

      showNotification('تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني للتأكيد.', 'success');
    }

    return data;
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    showNotification('حدث خطأ أثناء إنشاء الحساب.', 'error');
    return null;
  }
}

// دالة لتسجيل الدخول
async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showNotification(error.message, 'error');
      return null;
    }

    showNotification('تم تسجيل الدخول بنجاح!', 'success');
    return data;
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    showNotification('حدث خطأ أثناء تسجيل الدخول.', 'error');
    return null;
  }
}

// دالة لتسجيل الخروج
async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      showNotification(error.message, 'error');
      return false;
    }

    showNotification('تم تسجيل الخروج بنجاح!', 'success');
    return true;
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    showNotification('حدث خطأ أثناء تسجيل الخروج.', 'error');
    return false;
  }
}

// دالة للحصول على المستخدم الحالي
async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('خطأ في الحصول على المستخدم الحالي:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return null;
  }
}

// دالة لإظهار إشعارات للمستخدم
function showNotification(message, type = 'info') {
  // التحقق من وجود دالة showNotification في النطاق العام
  if (typeof window.showNotification === 'function') {
    window.showNotification(message, type);
  } else {
    // إنشاء إشعار بسيط إذا لم تكن الدالة موجودة
    alert(message);
  }
}

// تصدير الدوال للاستخدام في الملفات الأخرى
export { signUp, signIn, signOut, getCurrentUser };
