# React Native Telefaz App 👋

![screenshot](https://github.com/user-attachments/assets/29220669-7ad5-49e8-a222-8b64298c1144)


https://github.com/user-attachments/assets/d0f8e41b-fa7d-4365-bf84-f59fd23c4fc8




## 🚀 كيفية التشغيل

- `cd` into the project
- Create `.env` file and enviroment variable
```
EXPO_PUBLIC_TMDB_API_KEY=your_api_key_here
``` 
- Run the app
```sh
npm install
npm run prebuild # Executes Expo prebuild with TV modifications
npm run ios # Build and run for Apple TV
npm run android # Build for Android TV
```

## 🗃️ المكتبات المستخدمة
- @expo/vector-icons: استخدمت هذه المكتبة لوفير ايقونات بصية اس في جي
- @react-native-async-storage/async-storage: استخدمت هذه المكتبة لتخزين بعض البيانات
- @tanstack/react-query: استخدت هذه المكتبة لتوفير hook ممتاز لادارة جلب البيانات
- axios: استخدت هذه المكتبة لارسال طلبات الانترنت و معالجة الاستجابة بكفاءة
- zustand: استخدت هذه المكتبة لادارة حالة البيانات
- react-native-reanimated: استخرمت هذه المكتبة للانميشن
- expo-video: استخدمت هذه المتكتبة لشغيل الفيدوهات
المكتبة جيدة جداً و هي مبنية على ExoPlayer و AVPlayer و فيها مميزات جمة للتحكم في الفيديو و مميزات متعلقة بالترجمة
- expo-router: استخدمت هذه المتكتبة لادارة التنقل بين الواجهات


## 🧯التحديات
- تجهيز البيئة: بالرغم من سهولة انشاء تطبيق باستخدام expo و سهولة التشغيل, إلا أني استغرقت وقت طويل لاصلاح مشكلة تتعلق بتشغيل android emulator على جهازي (macbook pro intel) الذي يستخدم نوعين من معالجات الرسومات. قمت باجبار الجهاز باستخدام معالد واحد
```sh
sudo pmset -a gpuswitch 0
```
- الابعاد و المقاسات: اختلاف احجام و شاشات التلفاز و دقتها يمثل تحدي في عرض المكونات و النصوص بشكل موحد على اي حجم شاشة. استخدمت `useScale` لارجاع ابعاد الشاشة و مضاعفتها بالاحجام
- التنقل و التركيز: بناء تجربة تنقل تركيز من مكون إلى آخر يتطلب استخدام بعض المكونات المتخصصة مثل `TVFocusGuideView` لاعادة توجيه تركيز التنقل
- عيننة بيانات: هناك الكثير من ال APIs للافلام و المسلسلات و فيها كمية بيانات هائلة تغمر المطور بحجمها, قمت في النهاية باستخدام `TMDB API` المجانية لسهولة الوصول إلى البيانات
- تصميم واجهة المستخدم: لم يكن لدي افكار مبدعة خلال تنفيذ التطبيق, اختلست معظم الافكار من `Disney plus` تطبيق التلفاز
- مكتبات لتشغيل الفيديو: بحثت عن المكتبات المتوفرة و وجدت `expo-video` كالمكتبة الاكثر كفاءة و الافضل من ناحية المميزات
