# Food Folio Server

The Express and PostgreSQL backend for **Food Folio**, a restaurant discovery and management platform developed as a DBMS course project.

> Developed collaboratively by **Rafsan Rahman** and **Azraf Daian Rahik**.

[Frontend repository](https://github.com/raf0670/food-folio-client)

## Features

- User signup and login with JWT authentication
- Password hashing with bcrypt
- Authenticated and public user profiles
- Profile and password management
- Follow/unfollow relationships and follower counts
- Restaurant registration and manager ownership
- Administrator approval workflow for restaurants
- Multiple branches for each restaurant
- Branch location storage with PostGIS coordinates
- Menu-item creation and editing for branches
- Many-to-many restaurant and cuisine relationships
- PostgreSQL migrations for reviews, comments, vouches, and gallery images

## Tech stack

- **Runtime:** Node.js
- **API framework:** Express.js 5
- **Database:** PostgreSQL hosted with Supabase
- **Database access:** pg-promise and parameterized SQL
- **Geospatial data:** PostGIS `geography`
- **Authentication:** JWT using `jose`
- **Password security:** bcrypt

## Requirements

- Node.js 20 or newer
- npm
- A Supabase project or PostgreSQL database with PostGIS

## Local setup

### 1. Clone and install

```bash
git clone https://github.com/raf0670/food-folio-server.git
cd food-folio-server
npm install
```

### 2. Create the environment file

Create `.env` in the repository root:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:5432/postgres
JWT_SECRET=replace-with-a-long-random-secret
```

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | No | Port used by Express; defaults to `5000`. |
| `DATABASE_URL` | Yes | PostgreSQL or Supabase connection string. |
| `JWT_SECRET` | Yes | Secret used to sign and verify authentication tokens. |

Never commit `.env` or expose the database/JWT credentials.

### 3. Prepare the database

Enable PostGIS in Supabase under **Database → Extensions**, or execute:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

For a fresh database, execute the files in `migrations/` in this order:

1. `users.sql`
2. `restaurants.sql`
3. `cuisines.sql`
4. `branches.sql`
5. `restaurant_manager.sql`
6. `restaurant_cuisine.sql`
7. `menu_item.sql`
8. `review.sql`
9. `vouch.sql`
10. `comment.sql`
11. `gallery_image.sql`
12. `follow.sql`
13. `site_setting.sql`

Do not rerun table-creation files against an existing database unless the tables have been removed intentionally.

### 4. Start the backend

```bash
node server.js
```

The API is available at [http://localhost:5000](http://localhost:5000) by default. Open that address to verify the health endpoint.

The current `npm run dev` script uses `nodemon`; install nodemon locally or globally before using that command.

## API groups

| Prefix | Responsibility |
|---|---|
| `/` | Server health check |
| `/api/auth` | Signup and login |
| `/api/users` | Profiles and account settings |
| `/api/restaurant` | Restaurant creation, management, and approval |
| `/api/branch` | Restaurant branches and locations |
| `/api/menu` | Branch menu items |
| `/api/cuisine` | Restaurant cuisine relationships |
| `/api/follow` | Following state and follower counts |

## Project structure

```text
src/
├── config/        PostgreSQL connection setup
├── controllers/   HTTP validation and responses
├── middlewares/   Authentication and role checks
├── routes/        Express route definitions
└── services/      SQL queries and business operations
migrations/        Database tables, keys, and relationships
server.js          Server entry point
```

## Database design highlights

- UUID primary keys generated with `gen_random_uuid()`
- Foreign keys with update/delete rules
- Composite primary keys for junction tables
- PostGIS points for users and restaurant branches
- Parameterized queries to reduce SQL-injection risk
- Separate manager and cuisine junction tables for normalized many-to-many relationships

The ERD is available at `migrations/erd.md`.

## Contributors

Food Folio was designed and developed collaboratively by:

- **Rafsan Rahman**
- **Azraf Daian Rahik**

Both contributors participated in developing and integrating the project. Individual commit history is available in Git for a detailed contribution record.
