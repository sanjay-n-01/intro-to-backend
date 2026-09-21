# Intro to Backend

A full-stack notes workspace built with React, Express, MongoDB, and Mongoose.

## Requirements

- Node.js
- MongoDB Atlas or a local MongoDB server
- HTTPie for testing API requests (optional)

## Setup

Install backend dependencies from the repository root:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

Create a `.env` file in the project root:

```env
PORT=4000
MONGODB_URI="your-mongodb-connection-string"
```

Do not commit `.env`; it contains database credentials.

## Run

Start the backend normally:

```bash
npm start
```

Start the server with automatic restarts during development:

```bash
npm run dev
```

The API runs at `http://localhost:4000` by default.

In a second terminal, start the frontend:

```bash
cd frontend
npm run dev
```

The frontend runs at `http://localhost:5173` and uses
`VITE_API_URL=http://localhost:4000/api/v1` by default. Copy
`frontend/.env.example` to `frontend/.env` if you need to override it.

Build the frontend for production:

```bash
cd frontend
npm run build
```

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

## Frontend structure

```text
frontend/
├── src/
│   ├── components/       # Navbar, theme picker, and note cards
│   ├── pages/            # Login and dashboard views
│   ├── services/api.js   # The only frontend module that calls fetch()
│   ├── App.jsx           # Session and theme routing
│   └── main.jsx          # React entry point
├── index.html
└── package.json
```

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