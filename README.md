# 餐廳清單

## 功能
- 使用者可以在首頁看到所有餐廳與它們的簡單資料：

  餐廳照片、餐廳名稱、餐廳分類、餐廳評分

- 使用者可以再點進去看餐廳的詳細資訊：

  類別、地址、電話、描述、圖片

- 使用者可以透過搜尋餐廳名稱來找到特定的餐廳。
- 使用者可以透過搜尋餐廳名稱來找到特定的餐廳。
- 使用者可以新增一家餐廳。
- 使用者可以修改一家餐廳的資訊。
- 使用者可以刪除一家餐廳。
- 使用者可以更改排序方式。
- 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。
    其中 email 與密碼是必填欄位，但名字不是
    如果使用者已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗，並回應給使用者錯誤訊息
- 使用者必須登入才能使用餐廳清單
- 使用者也可以透過 Facebook Login 直接登入。
- 使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息

## 需求
- bcryptjs: ^2.4.3
- body-parser: ^1.19.0
- bootstrap-icons: ^1.5.0
- connect-flash: ^0.1.1
- dotenv: ^10.0.0
- express: ^4.17.1
- express-handlebars: ^5.3.4
- express-session: ^1.17.2
- method-override: ^3.0.0
- mongoose: ^6.0.8
- passport: ^0.5.0
- passport-facebook: ^3.0.0
- passport-local: ^1.0.0

## 安裝
- 下載
```
  https://github.com/JimmyHuang3364/restaurant_list.git
```
- 執行
```
cd restaurant_list
npm i
npm run seed
npm run dev
```
- 伺服器位置
```
localhost:3000
```