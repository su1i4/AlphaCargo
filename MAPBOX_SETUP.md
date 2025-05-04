# Настройка Mapbox в проекте AlphaCargo

Для корректной работы Mapbox в приложении AlphaCargo вам необходимо выполнить следующие шаги:

## Получение токена Mapbox

1. Зарегистрируйтесь или войдите в ваш аккаунт на [сайте Mapbox](https://account.mapbox.com/)
2. Перейдите в раздел "Access tokens" в личном кабинете
3. Создайте новый токен или используйте существующий (убедитесь, что у токена есть все необходимые разрешения для скачивания API и SDK)
4. Скопируйте полученный токен

## Настройка для Android

1. Откройте файл `android/gradle.properties`
2. Замените значение `MAPBOX_DOWNLOADS_TOKEN=PASTE_YOUR_MAPBOX_TOKEN_HERE` на ваш токен:
   ```
   MAPBOX_DOWNLOADS_TOKEN=sk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjazRhbmRvbXRva2VuMTIzNCJ9.your-token-here
   ```

## Настройка для iOS

1. Создайте или откройте файл `~/.netrc` на вашем компьютере
2. Добавьте следующие строки (если еще не добавлены):
   ```
   machine api.mapbox.com
     login mapbox
     password PASTE_YOUR_MAPBOX_TOKEN_HERE
   ```
3. Замените `PASTE_YOUR_MAPBOX_TOKEN_HERE` на ваш токен
4. Сохраните файл

## Переустановка зависимостей

После добавления токена необходимо переустановить зависимости:

### Android
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### iOS
```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

## Проблемы и их решения

### Проблема: Не удается найти библиотеки Mapbox в Android

**Ошибка:** 
```
Could not find com.mapbox.maps:android:10.18.4
```

**Решение:**
- Проверьте правильность токена в `gradle.properties`
- Убедитесь, что в файле `android/build.gradle` есть репозиторий Mapbox в секции `allprojects`

### Проблема: Ошибки с Podfile в iOS

**Ошибка:**
```
error: Unable to open base configuration reference file '/Users/mac/Desktop/AlphaCargo/ios/Pods/Target Support Files/Pods-AlphaCargo/Pods-AlphaCargo.debug.xcconfig'
```

**Решение:**
- Удалите папку `ios/Pods` и файл `ios/Podfile.lock`
- Установите CocoaPods заново: `gem install cocoapods`
- Переустановите поды: `cd ios && pod install && cd ..`

### Проблема: Ошибка с сертификатами в Android

**Ошибка:**
```
INSTALL_PARSE_FAILED_NO_CERTIFICATES: Failed to collect certificates from /data/app/vmdl1765158978.tmp/base.apk using APK Signature Scheme v2: SHA-256 digest of contents did not verify
```

**Решение:**
- Эта ошибка обычно связана с проблемами подписи приложения
- Пересоздайте ключ подписи:
  ```bash
  cd android/app
  keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
  cd ../..
  ./gradlew clean
  npx react-native run-android
  ```
- Если используется отладочный USB-вариант, попробуйте запустить приложение с помощью эмулятора 