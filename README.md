:watch::watch::watch:**<h1 style="text-align: center">Магазин часов с возможностью заказа/изготовления уникальных моделей</h1>**
![](https://i.imgur.com/pbXPQku.jpg)
<p>&nbsp;</p>

**<h1 style="text-align: center">Стек технологий</h1>**
### JavaScript, Node.js, Handlebars Express, express-session, Bcrypt, json2csv, multer, Nodemailer, PostgreSQL, Sequelize ORM.
<p>&nbsp;</p>

## **Над проектом так же работали**: [Merdzhen](https://github.com/Merdzhen) [bazraider](https://github.com/bazraider) [DimaShtGitHub](https://github.com/DimaShtGitHub)
<p>&nbsp;</p>

**<h1 style="text-align: center">Функционал</h1>**

### На главной странице, которая расположена во всю ширину экрана, реализована карусель и отдельные элементы анимации. После главной страницы идут примеры работ, небольшой паралакс со статистикой и информация "О нас". Завершает все это форма отправки заявок.
![](wristwatch-store.gif)
<p>&nbsp;</p>

### Чтобы оставить заявку, необходимо указать имя, email, телефон и загрузить файлы нужных моделей и/или перечислить в текстовом поле уже приведенные на сайте.
![](https://i.imgur.com/OgrJ296.png)
<p>&nbsp;</p>

### На сайте реализовано администрирование и чтобы администратору зарегистрироваться или войти в аккаунт, нужно добавить в адресную строку /login. А для большей безопасности, только что зарегистрированный администратор не может войти в свой аккаунт. Чтобы он смог это сделать, в базе данных у этого пользователя заменяется поле ***approved*** на ***true***.

![](https://i.imgur.com/RyWyG5P.png)
<p>&nbsp;</p>

### После того как администратор вошел в свой аккаунт он может пополнять список с примерами работ, редактировать и удалять существующие модели.

![](add-wristwatch.gif)
<p>&nbsp;</p>

### В своем личном кабинете администратор может посмотреть все заказы, а так же скачать список всех товаров или клиентов в csv файл.

![](https://i.imgur.com/ln2Dj1w.png)
<p>&nbsp;</p>

**<h1 style="text-align: center">Как запустить сайт</h1>**
### Для работы сайта необходим Node.js и PostgreSQL.
### В проекте должен быть файл .env с содержанием на основе шаблона:
```
DATABASE_URL=postgres://user:password@hostname:port/dbname
PORT=3000
```
+ `npm i`
+ `npx sequelize init`
+ `npx sequelize db:create`
+ `npx sequelize db:migrate`
+ `npx sequelize db:seed:all`
+ для запуска `npm run dev`
