# متجر المنتجات الرقمية

موقع إلكتروني متكامل لبيع المنتجات الرقمية مصمم باستخدام HTML, CSS, JavaScript و Bootstrap.

## 🌟 المميزات

### 📱 تصميم متجاوب
- متوافق مع جميع الأجهزة (الهواتف الذكية، الأجهزة اللوحية، أجهزة الكمبيوتر)
- استخدام Bootstrap 5 لضمان التجاوب
- تصميم عصري وجذاب

### 🛍️ وظائف التسوق
- عرض المنتجات مع الصور والأوصاف
- نظام سلة التسوق التفاعلي
- صفحة دفع آمنة ومتكاملة
- تطبيق أكواد الخصم
- حساب الضرائب تلقائياً

### 🔍 البحث والتصفية
- البحث في المنتجات
- تصفية حسب الفئة والسعر
- ترتيب المنتجات (الأحدث، السعر، الشعبية)
- صفحات منفصلة للمنتجات

### ⭐ نظام التقييمات
- عرض تقييمات المنتجات
- إمكانية إضافة تقييمات جديدة
- ملخص التقييمات مع الإحصائيات

## 📁 هيكل المشروع

```
متجر-المنتجات-الرقمية/
├── index.html              # الصفحة الرئيسية
├── products.html           # صفحة المنتجات
├── product-detail.html     # صفحة تفاصيل المنتج
├── cart.html              # صفحة سلة التسوق
├── checkout.html          # صفحة الدفع
├── about.html             # صفحة من نحن
├── css/
│   └── style.css          # ملف التنسيقات المخصص
└── js/
    ├── main.js            # الوظائف الأساسية
    ├── products.js        # وظائف صفحة المنتجات
    ├── cart.js            # وظائف سلة التسوق
    ├── checkout.js        # وظائف صفحة الدفع
    └── product-detail.js  # وظائف صفحة تفاصيل المنتج
```

## 🚀 كيفية التشغيل

1. **تحميل الملفات:**
   ```bash
   git clone [repository-url]
   cd digital-products-store
   ```

2. **فتح الموقع:**
   - افتح ملف `index.html` في المتصفح
   - أو استخدم خادم محلي مثل Live Server

3. **متطلبات النظام:**
   - متصفح ويب حديث (Chrome, Firefox, Safari, Edge)
   - اتصال بالإنترنت (لتحميل Bootstrap و Font Awesome)

## 📋 الصفحات المتاحة

### 🏠 الصفحة الرئيسية (`index.html`)
- عرض المنتجات المميزة
- قسم المميزات
- معلومات عن الشركة
- دعوة للعمل (Call to Action)

### 🛒 صفحة المنتجات (`products.html`)
- عرض جميع المنتجات
- أدوات البحث والتصفية
- ترقيم الصفحات
- ترتيب المنتجات

### 📄 صفحة تفاصيل المنتج (`product-detail.html`)
- معلومات مفصلة عن المنتج
- صور عالية الجودة
- مميزات المنتج
- نظام التقييمات
- منتجات ذات صلة

### 🛍️ صفحة السلة (`cart.html`)
- عرض المنتجات المختارة
- تعديل الكميات
- تطبيق أكواد الخصم
- حساب المجموع الكلي
- منتجات مقترحة

### 💳 صفحة الدفع (`checkout.html`)
- نموذج معلومات العميل
- عنوان الفوترة
- طرق الدفع المتعددة
- ملخص الطلب
- تأكيد الطلب

### ℹ️ صفحة من نحن (`about.html`)
- قصة الشركة
- الرؤية والرسالة
- فريق العمل
- القيم والمبادئ

## 🎨 التقنيات المستخدمة

### Frontend
- **HTML5:** هيكل الصفحات
- **CSS3:** التنسيقات والتصميم
- **JavaScript (ES6+):** الوظائف التفاعلية
- **Bootstrap 5:** إطار العمل للتصميم المتجاوب

### المكتبات الخارجية
- **Font Awesome 6:** الأيقونات
- **Google Fonts (Cairo):** الخطوط العربية
- **Bootstrap Icons:** أيقونات إضافية

## 🔧 الوظائف الرئيسية

### إدارة السلة
```javascript
// إضافة منتج للسلة
addToCart(productId, quantity)

// حذف منتج من السلة
removeFromCart(productId)

// تحديث كمية المنتج
updateCartQuantity(productId, quantity)

// حساب المجموع الكلي
getCartTotal()
```

### البحث والتصفية
```javascript
// تصفية المنتجات
filterProducts()

// تغيير الصفحة
changePage(pageNumber)
```

### نظام الإشعارات
```javascript
// عرض إشعار
showNotification(message, type)
```

## 📱 التوافق مع الأجهزة

- **الهواتف الذكية:** 320px - 767px
- **الأجهزة اللوحية:** 768px - 1023px
- **أجهزة الكمبيوتر:** 1024px وأكثر

## 🎯 المميزات المتقدمة

### تخزين البيانات
- استخدام `localStorage` لحفظ سلة التسوق
- حفظ الطلبات المكتملة
- تذكر تفضيلات المستخدم

### تجربة المستخدم
- رسوم متحركة سلسة
- تحميل تدريجي للمحتوى
- رسائل تأكيد تفاعلية
- تصميم بديهي وسهل الاستخدام

### الأمان
- تشفير SSL للمدفوعات
- حماية البيانات الشخصية
- التحقق من صحة النماذج

## 🔮 التطويرات المستقبلية

- [ ] إضافة نظام تسجيل المستخدمين
- [ ] تكامل مع بوابات الدفع الحقيقية
- [ ] نظام إدارة المحتوى
- [ ] تطبيق الهاتف المحمول
- [ ] دعم اللغات المتعددة
- [ ] نظام التوصيات الذكية

## 📞 الدعم والمساعدة

للحصول على المساعدة أو الإبلاغ عن مشاكل:
- البريد الإلكتروني: zyadwork74@gmail.com
- الهاتف: +20 1123994926

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) قبل البدء.

---

**تم تطوير هذا المشروع بـ بواسطة ZyadOsama
