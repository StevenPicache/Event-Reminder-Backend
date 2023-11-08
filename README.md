
# Event-Reminder-Backend

A small project to showcase my knowledge and skillsets

## Tech Stack

**Server:** 
Node, 
TypeScript, 
Express, 
PostgreSQL, 
Docker 



## Setup & Running


```bash
  cd Event-Reminder-Backend
  npm install 
  docker compose create
  docker compose start
  npm run start
```
    
## API Reference

#### Get all events

```http
  GET /v0/events
```

#### Get events by first name, last name, and event type

```http
  GET /v0/events/:param
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `searchText`      | `string` | finds all data that matches the text. |


```http
  POST /v0/events/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstName`      | `string` | first name of the person |
| `lastName`      | `string` | last name of the person |
| `eventType`      | `string` | type of event |
| `eventDate`      | `Date` | date of the event |





## Stacks

[Node](https://nodejs.org/en)
[TypeScript](https://www.typescriptlang.org/)
[Express](https://expressjs.com/)
[PostgreSQL](https://www.postgresql.org/)
[Docker](https://www.docker.com/)

