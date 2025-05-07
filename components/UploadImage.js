// components/UploadImage.js
// مكون لرفع الصور إلى Supabase Storage

import { supabase } from '../lib/supabase.js';

// دالة لرفع صورة إلى Supabase Storage
async function uploadProductImage(file) {
  try {
    if (!file) {
      throw new Error('لم يتم تحديد ملف');
    }

    // إنشاء اسم فريد للملف
    const fileName = `${Date.now()}_${file.name}`;
    
    // رفع الملف إلى Supabase Storage
    const { data, error } = await supabase.storage
      .from('product_images')
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    // الحصول على الرابط العام للصورة
    const { data: { publicUrl } } = supabase.storage
      .from('product_images')
      .getPublicUrl(fileName);

    return { 
      success: true, 
      url: publicUrl, 
      fileName: fileName 
    };
  } catch (error) {
    console.error('خطأ في رفع الصورة:', error);
    return { 
      success: false, 
      error: error.message || 'حدث خطأ أثناء رفع الصورة' 
    };
  }
}

// دالة لإنشاء نموذج رفع الصور
function createImageUploadForm(containerId, onSuccess) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // إنشاء نموذج رفع الصور
  container.innerHTML = `
    <div class="upload-form">
      <h3>رفع صورة منتج جديدة</h3>
      <div class="upload-preview">
        <img id="image-preview" src="images/placeholder.png" alt="معاينة الصورة">
      </div>
      <div class="upload-controls">
        <input type="file" id="image-file" accept="image/*" class="file-input">
        <label for="image-file" class="file-label">
          <i class="fas fa-cloud-upload-alt"></i> اختر صورة
        </label>
        <button id="upload-button" class="btn upload-btn" disabled>
          <i class="fas fa-upload"></i> رفع الصورة
        </button>
      </div>
      <div id="upload-status" class="upload-status"></div>
    </div>
  `;

  // إضافة مستمعي الأحداث
  const fileInput = document.getElementById('image-file');
  const imagePreview = document.getElementById('image-preview');
  const uploadButton = document.getElementById('upload-button');
  const uploadStatus = document.getElementById('upload-status');

  // عرض معاينة الصورة عند اختيارها
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
      uploadButton.disabled = false;
    } else {
      imagePreview.src = 'images/placeholder.png';
      uploadButton.disabled = true;
    }
  });

  // رفع الصورة عند النقر على زر الرفع
  uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    // تغيير حالة الزر وعرض رسالة التحميل
    uploadButton.disabled = true;
    uploadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الرفع...';
    uploadStatus.innerHTML = '<div class="status-info">جاري رفع الصورة...</div>';

    // رفع الصورة
    const result = await uploadProductImage(file);

    // عرض نتيجة الرفع
    if (result.success) {
      uploadStatus.innerHTML = `
        <div class="status-success">
          تم رفع الصورة بنجاح!
          <div class="image-url">
            <input type="text" value="${result.url}" readonly>
            <button class="copy-btn" data-url="${result.url}">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      `;
      
      // إضافة مستمع حدث لزر النسخ
      const copyBtn = uploadStatus.querySelector('.copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const input = uploadStatus.querySelector('input');
          input.select();
          document.execCommand('copy');
          showNotification('تم نسخ الرابط!', 'success');
        });
      }

      // استدعاء دالة النجاح إذا تم تمريرها
      if (typeof onSuccess === 'function') {
        onSuccess(result.url, result.fileName);
      }
    } else {
      uploadStatus.innerHTML = `
        <div class="status-error">
          فشل رفع الصورة: ${result.error}
        </div>
      `;
    }

    // إعادة تعيين حالة الزر
    uploadButton.disabled = false;
    uploadButton.innerHTML = '<i class="fas fa-upload"></i> رفع الصورة';
  });
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
export { uploadProductImage, createImageUploadForm };
