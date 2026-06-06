# belalhosan_backend

Backend REST API for the Belal Hossain Sunny portfolio — **Node.js + Express + MongoDB (Mongoose)**.

## Folder structure

```
belalhosan_backend/
├── .env                 # secrets / config (git-ignored)
├── .env.example         # template — copy to .env
├── package.json
└── src/
    ├── server.js        # entry point: loads env, connects DB, starts server
    ├── app.js           # express app: CORS, parsers, routes, error handling
    ├── config/
    │   └── db.js        # MongoDB (mongoose) connection
    ├── routes/
    │   └── index.js     # all /api routes are mounted here
    ├── controllers/
    │   └── health.controller.js
    ├── middlewares/
    │   ├── notFound.js   # 404 handler
    │   └── errorHandler.js
    ├── models/          # mongoose schemas/models go here
    └── utils/           # helpers
```

## Getting started

```bash
npm install          # install dependencies
npm run dev          # start with auto-reload (nodemon)
# or
npm start            # start once with node
```

Server runs on **http://localhost:5001** by default (port 5000 was already in use on this machine).

Check it's alive:

```bash
curl http://localhost:5001/api/health
```

## Environment variables (`.env`)

| Key           | Description                                              |
| ------------- | -------------------------------------------------------- |
| `PORT`        | Server port (default `5001`)                             |
| `NODE_ENV`    | `development` or `production`                            |
| `CLIENT_URL`  | Allowed CORS origin(s), comma-separated (the Next.js app)|
| `MONGODB_URI` | MongoDB connection string (fill in when ready)           |

## Connecting from the Next.js client

The client reads `NEXT_PUBLIC_API_URL` (see `belalhossain_client/.env.local`) and
uses the axios instance in `belalhossain_client/src/lib/api.js`:

```js
import api from "@/lib/api";

const { data } = await api.get("/health");
```

## Next steps (added part-by-part)

- [ ] Set `MONGODB_URI` and verify the DB connects
- [ ] Add models in `src/models`
- [ ] Add feature routes + controllers (e.g. projects, contact)
