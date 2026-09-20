# Intro to Backend

A practice backend built with Node.js, Express, MongoDB, and Mongoose.

## Requirements

- Node.js
- MongoDB Atlas or a local MongoDB server
- HTTPie for testing API requests (optional)

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=4000
MONGODB_URI="your-mongodb-connection-string"
```

Do not commit `.env`; it contains database credentials.

## Run

Start the server normally:

```bash
npm start
```

Start the server with automatic restarts during development:

```bash
npm run dev
```

The API runs at `http://localhost:4000` by default.

## API Routes

### Users

Base URL: `http://localhost:4000/api/v1/users`

| Method | Endpoint | Request body |
| --- | --- | --- |
| POST | `/register` | `username`, `password`, `email` |
| POST | `/login` | `email`, `password` |
| POST | `/logout` | `email` |

### Posts

Base URL: `http://localhost:4000/api/v1/posts`

| Method | Endpoint | Request body |
| --- | --- | --- |
| POST | `/create` | `name`, `description`, `age` |
| GET | `/getPosts` | None |
| PATCH | `/updatePost/:id` | Fields to update |
| DELETE | `/deletePost/:id` | None |

## Testing with HTTPie

Register a user:

```bash
http POST :4000/api/v1/users/register username=Sanjay password=secret123 email=sanjay@example.com
```

Log in:

```bash
http POST :4000/api/v1/users/login email=sanjay@example.com password=secret123
```

Create a post:

```bash
http POST :4000/api/v1/posts/create name=Example description="My first post" age:=25
```

Get all posts:

```bash
http GET :4000/api/v1/posts/getPosts
```