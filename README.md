# Website trello

Данный вебсайт был написан в ходе второй проектной работы от курса компании Parimatch Tech

# Применяемые технологии

- HTML
- CSS
- Javascript
- React

## Available Scripts
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.\
### `npm test`
Launches the test runner in the interactive watch mode.\
### `npm testcov`
Launches the test runner in the interactive watch mode with coverage.\
### `npm run build`
Builds the app for production to the `build` folder.\

# Работа сайта гифкой

![alt text](login.gif "Login")
![alt text](registration.gif "Registration")
![alt text](card_processing.gif "Card processing")

# Техническое задание
**1.** Создать доску, подобную Trello, с карточками. Приблизительный дизайн можно выбрать здесь.

**2.**	Нужно реализовать функционал регистрации и логина. Валидацию делать не нужно. Невалидный email сервер не пропустит. Для незарегистрированных пользователей карточки получить нельзя. Авторизация осуществляется при помощи JWT токена, который будет приходить в ответе на регистрацию и логин. Соответственно его нужно хранить и все запросы по карточкам нужно делать с заголовком Authorization.

**3.**	На доске должны отображаться полученные карточки, которые будут с разными статусами (to_do, in_progress, testing, done). Список статусов можно получить по отдельному endpoint’у. Карточки нужно будет показывать в разных колонках, в зависимости от того, какой статус. Должен быть реализован CRUD функционал, т.е. пользователь может создавать, смотреть, изменять и удалять карточки.

**4.**	Чтоб закрепить знания по работе с классами, нужно реализовать данный проект используя классы. Также работая в команде, каждый студент должен выполнять свою задачу в отдельной ветке. После ее выполнения нужно сделать MR (merge request) и другие студенты из команды должны провести code review. Замечания по code review желательно писать в gitlab’е в комментариях к MR.

**5.**	Реализовать проект с dev сборкой. Можно использовать любые удобные вам bundler’ы (webpack, parcel, gulp, etc.).

**6.**	Все контракты API описаны в разделе ниже. 

# API

## Регистрация
### Request:

``` 
POST https://radiant-temple-07706.herokuapp.com/auth/local/register
content-type: application/json
{
    "username": "foo",
    "email": "foo@bar.com",
    "password": "123qwerty"
} 
```
### Response:
``` 
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjEyOTg2MTQ3LCJleHAiOjE2MTU1NzgxNDd9.3ovF5Md77HXCFt956iIZRnF5u4aqii6HslG4uDl7Lw0",
  "user": {
    "id": 5,
    "username": "foo",
    "email": "foo@bar.com",
    "provider": "local",
    "confirmed": true,
    "blocked": null,
    "role": {
      "id": 1,
      "name": "Authenticated",
      "description": "Default role given to authenticated user.",
      "type": "authenticated"
    },
    "created_at": "2021-02-10T19:42:27.885Z",
    "updated_at": "2021-02-10T19:42:27.900Z"
  }
}
```
 
## Логин
### Request:
``` 
POST https://radiant-temple-07706.herokuapp.com/auth/local
content-type: application/json

{
    "identifier": "foo",
    "password": "123qwerty"
} 
```
### Response:
``` 
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjEyOTg2MTQ3LCJleHAiOjE2MTU1NzgxNDd9.3ovF5Md77HXCFt956iIZRnF5u4aqii6HslG4uDl7Lw0",
  "user": {
    "id": 5,
    "username": "foo",
    "email": "foo@bar.com",
    "provider": "local",
    "confirmed": true,
    "blocked": null,
    "role": {
      "id": 1,
      "name": "Authenticated",
      "description": "Default role given to authenticated user.",
      "type": "authenticated"
    },
    "created_at": "2021-02-10T19:42:27.885Z",
    "updated_at": "2021-02-10T19:42:27.900Z"
  }
}
```
 
## Получение карточек
### Request:
``` 
GET https://radiant-temple-07706.herokuapp.com/cards
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjEyNjUyNzQzLCJleHAiOjE2MTUyNDQ3NDN9.DGaAGDzWG5RN_Hf7x6wpKFKvusNF0TCZAGEKqccoLQk
```
### Response:
``` 
[
  {
    "id": 41,
    "published_at": "2021-02-10T19:49:17.748Z",
    "created_at": "2021-02-10T19:49:17.762Z",
    "updated_at": "2021-02-10T19:49:17.770Z",
    "title": "Finish project",
    "status": "in_progress",
    "description": "Lorem ipsum dolor sit amet..."
  },
  ...
]
```

### Request:
``` 
GET https://radiant-temple-07706.herokuapp.com/cards/{id}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjEyNjUyNzQzLCJleHAiOjE2MTUyNDQ3NDN9.DGaAGDzWG5RN_Hf7x6wpKFKvusNF0TCZAGEKqccoLQk
```
### Response:
``` 
{
  "id": 41,
  "published_at": "2021-02-10T19:49:17.748Z",
  "created_at": "2021-02-10T19:49:17.762Z",
  "updated_at": "2021-02-10T19:49:17.770Z",
  "title": "Finish project",
  "status": "in_progress",
  "description": "Lorem ipsum dolor sit amet..."
}
```

## Создание карточек
### Request:
``` 
POST https://radiant-temple-07706.herokuapp.com/cards
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjEyNjUyNzQzLCJleHAiOjE2MTUyNDQ3NDN9.DGaAGDzWG5RN_Hf7x6wpKFKvusNF0TCZAGEKqccoLQk
```

### Response:
``` 
{
  "id": 41,
  "published_at": "2021-02-10T19:49:17.748Z",
  "created_at": "2021-02-10T19:49:17.762Z",
  "updated_at": "2021-02-10T19:49:17.770Z",
  "title": "Finish project",
  "status": "in_progress",
  "description": "Lorem ipsum dolor sit amet..."
}
```
 
## Обновление карточек
### Request:
``` 
PUT https://radiant-temple-07706.herokuapp.com/cards/{id}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjEyNjUyNzQzLCJleHAiOjE2MTUyNDQ3NDN9.DGaAGDzWG5RN_Hf7x6wpKFKvusNF0TCZAGEKqccoLQk
```
### Response:
``` 
{
  "id": 41,
  "published_at": "2021-02-10T19:49:17.748Z",
  "created_at": "2021-02-10T19:49:17.762Z",
  "updated_at": "2021-02-10T19:49:17.770Z",
  "title": "Finish project",
  "status": "done",
  "description": "Lorem ipsum dolor sit amet..."
}
```

## Удаление карточек
### Request:
``` 
DELETE https://radiant-temple-07706.herokuapp.com/cards/{id}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjEyNjUyNzQzLCJleHAiOjE2MTUyNDQ3NDN9.DGaAGDzWG5RN_Hf7x6wpKFKvusNF0TCZAGEKqccoLQk
```
### Response:
``` 
{
  "id": 41,
  "published_at": "2021-02-10T19:49:17.748Z",
  "created_at": "2021-02-10T19:49:17.762Z",
  "updated_at": "2021-02-10T19:49:17.770Z",
  "title": "Finish project",
  "status": "done",
  "description": "Lorem ipsum dolor sit amet..."
}
```
 
## Получение статусов
### Request:
``` 
GET https://radiant-temple-07706.herokuapp.com/statuses
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjEyNjUyNzQzLCJleHAiOjE2MTUyNDQ3NDN9.DGaAGDzWG5RN_Hf7x6wpKFKvusNF0TCZAGEKqccoLQk
```
### Response:
``` 
[
  {
    "id": 1,
    "value": "to_do",
    "title": "To Do"
  },
  {
    "id": 2,
    "value": "in_progress",
    "title": "In Progress"
  },
  {
    "id": 3,
    "value": "testing",
    "title": "Testing"
  },
  {
    "id": 4,
    "value": "done",
    "title": "Done"
  }
]
```
