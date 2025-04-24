# 🔗 URL Shortener App

Цей проєкт — це веб-додаток для скорочення довгих URL, розроблений на базі **ASP.NET Core MVC**, **Entity Framework Core** та **React** для фронтенду.

## 🚀 Основні можливості

- ✨ Створення коротких URL-адрес
- 🔐 Аутентифікація та збереження URL користувача
- 📜 Перегляд усіх створених URL
- 🖌️ Копіювання/Видалення посилань
- ✅ Генерація короткого коду через `Guid`
---

## 🛠️ Технології

- ASP.NET Core MVC
- Entity Framework Core
- ASP.NET Identity
- React (Frontend)
- SQL Server
---

## ⚙️ Налаштування проекту
### 1. Встановлення залежностей

Перш за все, потрібно встановити всі необхідні залежності для вашого проекту.

- У Visual Studio при створенні обираємо 

    ```bash
    ASP/.NET Core Web App (MVC)
    ```

- Підключіть необхідні пакети NuGet. Відкрийте **Package Manager Console** в Visual Studio або використовуйте термінал, і введіть:

    ```bash
    dotnet add package Microsoft.AspNetCore.Identity
    dotnet add package Microsoft.EntityFrameworkCore
    dotnet add package Microsoft.EntityFrameworkCore.SqlServer
    dotnet add package Microsoft.EntityFrameworkCore.Tools
    dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
    ```
---
### 2. Створення бази даних

Для налаштування бази даних у файлі `appsettings.json` додайте з’єднання до бази:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "YourConnectionStringHere"
  }
}
```
Якщо потрібно налаштувати **міграції для бази даних** (для застосування змін у схемі бази), вам потрібно використовувати команду:

   ```bash
    dotnet ef migrations add InitialMigration
    dotnet ef database update
   ```
---
### 3. Якщо ви працюєте з **React** (фронтенд)

- Завантажте та встановіть **Node.js** з офіційного сайту: [Node.js](https://nodejs.org/).
- Відкрийте командний рядок / термінал.
- Перейдіть у папку, де хочете створити свій проєкт на **React**.
- Введіть команду:

  ```bash
    npm install react react-dom
  ```
---
### 4. Запуск бекенду

- Запустіть сервер для бекенду:
  Якщо ви використовуєте **Visual Studio**, натискайте **F5** або **Ctrl + F5** для запуску.
  
  Якщо ви використовуєте **термінал**, виконайте команду:
  ```bash
  dotnet run
  ```

### 5. Запуск фронтенду

- Відкрийте термінал у папці де знаходиться проект React і запустіть наступну команду:
    ```bash
    npm start
    ```
---

## 📷 Скріншоти

![image](https://github.com/user-attachments/assets/1e52766f-7fa2-4df3-866d-ff87806ccbb8)
---
![image](https://github.com/user-attachments/assets/0a8e0283-540e-47e0-87cb-c2689040695d)
---
> Anonymous can't access ShowUrlInfo page
![image](https://github.com/user-attachments/assets/f50f483a-2293-4a28-aca3-9fa15d19543e)
---
![image](https://github.com/user-attachments/assets/344ebde3-2772-4eca-bff8-64d95812daf2)
---
![image](https://github.com/user-attachments/assets/7fe8edc6-fe31-45d5-adbb-db9f9bd92a3c)
---
![image](https://github.com/user-attachments/assets/bb2fec4b-e2cc-451c-b2e0-31c89d6f331c)
---
>React/ShortUrlTable
![image](https://github.com/user-attachments/assets/d4b44395-6d88-41fe-98ce-7e1e8670cb40)

---

Зроблено з ❤️ .NET-розробником!

---------------------------------------------

