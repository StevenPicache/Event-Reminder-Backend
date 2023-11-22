# Event-Reminder-Backend

# Status - Work-in-progress

## Purpose

To show an understanding of Node, Express, Docker, and Sequelize

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
  GET /v0/events/:search
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `search`  | `string` | finds all data that matches the text. |

#### Get events by within the next # of weeks

```http
  GET /v0/events/range/:range
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `range`   | `string` | get all data within # of weeks. |

```http
  POST /v0/events/
```

| Parameter   | Type     | Description              |
| :---------- | :------- | :----------------------- |
| `firstName` | `string` | first name of the person |
| `lastName`  | `string` | last name of the person  |
| `eventType` | `string` | type of event            |
| `eventDate` | `Date`   | date of the event        |

```http
  DELETE /v0/events/delete/:id
```

| Parameter | Type     | Description        |
| :-------- | :------- | :----------------- |
| `id`      | `string` | delete data by id. |

```http
  PUT /v0/events/edit/:id
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

| `eventId` | `string` | id of the event |
| `firstName` | `string` | first name of the person |
| `lastName` | `string` | last name of the person |
| `eventType` | `string` | type of event |
| `eventDate` | `Date` | date of the event |

## Stacks

[Node](https://nodejs.org/en)
[TypeScript](https://www.typescriptlang.org/)
[Express](https://expressjs.com/)
[PostgreSQL](https://www.postgresql.org/)
[Docker](https://www.docker.com/)
