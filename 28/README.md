# Краткий ответ на задания

---

## 1️⃣ РАБОТА СО СЛОЯМИ: z-index

### 📌 **Что такое z-index?**

`z-index` — управляет порядком наложения элементов по оси Z (глубине).

```css
.element-1 {
    position: relative;
    z-index: 10;  /* Поверх элемента с z-index: 5 */
}

.element-2 {
    position: relative;
    z-index: 5;   /* Под элементом с z-index: 10 */
}
```

---

### 📌 **Правила наложения**

1. **z-index работает только с позиционированными элементами:**
   ```css
   /* ✅ Работает */
   .element {
       position: relative;
       z-index: 10;
   }
   
   /* ❌ НЕ работает */
   .element {
       position: static;
       z-index: 10;  /* Игнорируется */
   }
   ```

2. **Чем больше z-index, тем выше элемент:**
   ```css
   .layer-1 { z-index: 100; }  /* Самый верх */
   .layer-2 { z-index: 50; }   /* Середина */
   .layer-3 { z-index: 1; }    /* Самый низ */
   ```

3. **Одинаковый z-index — выше тот, кто позже в HTML**

4. **z-index создаёт контекст наложения:**
   ```css
   .parent {
       position: relative;
       z-index: 1;  /* Новый контекст */
   }
   .child {
       z-index: 100;  /* Относительно родителя */
   }
   ```

---

### 📌 **Примеры использования**

```css
/* 1. Модальное окно — поверх всего */
.modal {
    position: fixed;
    z-index: 1000;
}

/* 2. Шапка — поверх контента */
.header {
    position: fixed;
    z-index: 100;
}

/* 3. Выпадающее меню */
.dropdown {
    position: absolute;
    z-index: 10;
}

/* 4. Контент по умолчанию */
.content {
    position: relative;
    z-index: 1;
}
```

---

### 📌 **Схема наложения**

```
z-index: 1000  →  Модальное окно (самый верх)
     ↑
z-index: 100   →  Шапка, навигация
     ↑
z-index: 10    →  Dropdown меню
     ↑
z-index: 1     →  Основной контент
     ↑
z-index: 0     →  Фоновые элементы (самый низ)
```

---

## 2️⃣ МОДУЛЬ FS (ФАЙЛОВАЯ СИСТЕМА)

### 📌 **Подключение модуля**

```javascript
// CommonJS
const fs = require('fs');

// ES Modules
import fs from 'fs';
```

---

### 📌 **Чтение файла**

```javascript
// 1. Синхронно (блокирует выполнение)
try {
    const data = fs.readFileSync('file.txt', 'utf8');
    console.log(data);
} catch (error) {
    console.error('Ошибка:', error);
}

// 2. Асинхронно (с колбэком)
fs.readFile('file.txt', 'utf8', (error, data) => {
    if (error) {
        console.error('Ошибка:', error);
        return;
    }
    console.log(data);
});

// 3. С промисами (рекомендуется)
const fs = require('fs').promises;

async function readFile() {
    try {
        const data = await fs.readFile('file.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
```

---

### 📌 **Запись файла**

```javascript
// 1. Синхронно
try {
    fs.writeFileSync('file.txt', 'Привет, мир!', 'utf8');
    console.log('Сохранено');
} catch (error) {
    console.error('Ошибка:', error);
}

// 2. Асинхронно (с колбэком)
fs.writeFile('file.txt', 'Привет, мир!', 'utf8', (error) => {
    if (error) {
        console.error('Ошибка:', error);
        return;
    }
    console.log('Сохранено');
});

// 3. С промисами (рекомендуется)
const fs = require('fs').promises;

async function writeFile() {
    try {
        await fs.writeFile('file.txt', 'Привет, мир!', 'utf8');
        console.log('Сохранено');
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
```

---

### 📌 **Работа с JSON**

```javascript
// Чтение JSON
try {
    const data = fs.readFileSync('config.json', 'utf8');
    const config = JSON.parse(data);
    console.log(config);
} catch (error) {
    console.error('Ошибка:', error);
}

// Запись JSON
const data = { name: 'Иван', age: 25 };
fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
```

---

### 📌 **Проверка существования файла**

```javascript
// 1. existsSync (синхронно)
if (fs.existsSync('file.txt')) {
    console.log('Файл существует');
} else {
    console.log('Файл не найден');
}

// 2. access (с промисами)
const fs = require('fs').promises;

async function checkFile() {
    try {
        await fs.access('file.txt');
        console.log('Файл существует');
    } catch {
        console.log('Файл не найден');
    }
}
```

---

### 📌 **Удаление файла**

```javascript
// Синхронно
fs.unlinkSync('file.txt');

// Асинхронно
fs.unlink('file.txt', (error) => {
    if (error) console.error(error);
});

// С промисами
await fs.unlink('file.txt');
```

---

### 📌 **Сравнение методов**

| Операция | Синхронный | Асинхронный | С промисами |
|----------|------------|-------------|-------------|
| Чтение | `fs.readFileSync()` | `fs.readFile()` | `fs.promises.readFile()` |
| Запись | `fs.writeFileSync()` | `fs.writeFile()` | `fs.promises.writeFile()` |
| Проверка | `fs.existsSync()` | `fs.exists()` | `fs.promises.access()` |
| Удаление | `fs.unlinkSync()` | `fs.unlink()` | `fs.promises.unlink()` |

---

## 🎯 Шпаргалка

### z-index

```css
.element {
    position: relative;  /* Обязательно */
    z-index: 10;         /* Чем больше — тем выше */
}
```

### fs (Node.js)

```javascript
const fs = require('fs').promises;

// Чтение
const data = await fs.readFile('file.txt', 'utf8');

// Запись
await fs.writeFile('file.txt', 'текст', 'utf8');

// Проверка
await fs.access('file.txt');

// Удаление
await fs.unlink('file.txt');
```