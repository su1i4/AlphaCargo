/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

// Функция для конвертации base64 в Blob
function base64ToBlob(base64, contentType = 'application/pdf') {
  // Удаляем префикс data:application/pdf;base64, если он есть
  const base64Data = base64.includes('base64,') 
    ? base64.split('base64,')[1] 
    : base64;
  
  // Декодируем base64 в бинарную строку
  const byteCharacters = atob(base64Data);
  const byteArrays = [];
  
  // Разбиваем на части для обработки больших файлов
  const sliceSize = 512;
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  
  // Создаем Blob из массива байтов
  return new Blob(byteArrays, { type: contentType });
}

// Пример использования
function downloadPDF(base64Data, fileName = 'document.pdf') {
  // Создаем blob из base64
  const blob = base64ToBlob(base64Data);
  
  // Создаем URL объект
  const url = window.URL.createObjectURL(blob);
  
  // Создаем ссылку для скачивания
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = fileName;
  
  // Добавляем ссылку в DOM и эмулируем клик
  document.body.appendChild(downloadLink);
  downloadLink.click();
  
  // Удаляем ссылку из DOM и освобождаем URL
  document.body.removeChild(downloadLink);
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 100);
}

// Пример вызова
// downloadPDF(file.$binary, 'my_document.pdf');

// Альтернативный способ с использованием Fetch API (более современный)
async function downloadPDFUsingFetch(base64Data, fileName = 'document.pdf') {
  try {
    // Создаем data URL
    const dataUrl = `data:application/pdf;base64,${base64Data}`;
    
    // Используем fetch для получения blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    
    // Скачиваем blob
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Ошибка при скачивании PDF:', error);
  }
}

// Пример вызова
// downloadPDFUsingFetch(file.$binary, 'my_document.pdf');
