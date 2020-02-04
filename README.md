### API

- Register POST
https://sprint-challenge-authenticat.herokuapp.com/api/auth/register

- Login  POST
https://sprint-challenge-authenticat.herokuapp.com/api/auth/login

- Logout POST
https://sprint-challenge-authenticat.herokuapp.com/api/auth/logout

- All projects GET
https://sprint-challenge-authenticat.herokuapp.com/api/projects

- All users GET
https://sprint-challenge-authenticat.herokuapp.com/api/users

- User's projects GET
https://sprint-challenge-authenticat.herokuapp.com/api/crud/read

- Users's project by Id GET
https://sprint-challenge-authenticat.herokuapp.com/api/crud/read/id

- Create new project POST
https://sprint-challenge-authenticat.herokuapp.com/api/crud/

- Update project PUT 
https://sprint-challenge-authenticat.herokuapp.com/api/crud/id

- Delete project DELETE
https://sprint-challenge-authenticat.herokuapp.com/api/crud/id

#### Users

| field    | data type        | metadata                               |
| -------- | ---------------- | -------------------------------------- |
| id       | unsigned integer | primary key, auto-increments           |
| username | string           | required, unique                       |
| password | string           | required                               |
| email    | string           | required, unique                       |
| -------- | ---------------- | ---------------------------------------|

#### Projects

| field       | data type        | 
| ----------- | ---------------- | 
| id          | unsigned integer | 
| name        | string           | 
| funding_goal| string           | 
| description | string           | 
| location    | string           | 
| image       | string           | 
| public      | string           | 
| amount      | integer          | 
| email       | string           | 
| user_id     | integer          | 
