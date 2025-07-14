# Movie App

Full-stack Movie Application with:
- Angular 16+ Frontend
- Spring Boot Backend (Java 8+)
- PostgreSQL Database
- OMDB API Integration

## Features

### Admin Dashboard
- Login as admin
- Search movies via OMDB API
- Add/remove single or batch movies to the database
- View selected movies

### User Dashboard
- Login as user
- Browse paginated movie list
- Search by title (client-side)
- Rate each movie (1-5 stars)

### Tech Stack
- Frontend: Angular 16+
- Backend: Spring Boot (Java 8+)
- Database: PostgreSQL
- OMDB API: [omdbapi.com](http://www.omdbapi.com)

## How to Run

### Prerequisites
- Node.js + Angular CLI
- Java 8+
- PostgreSQL

### Backend Setup
1. Navigate to `backend/`
2. Configure `application.properties` with your DB credentials and OMDB key:
   ```
   spring.datasource.url=jdbc:postgresql://localhost:5432/movieapp
   spring.datasource.username=movie_user
   spring.datasource.password=movie_pass
   omdb.api.key=YOUR_API_KEY
   ```
3. Run with Maven or your IDE

### Frontend Setup
1. Navigate to `frontend/`
2. Run `npm install`
3. Run `ng serve`
4. Access `http://localhost:4200`

### Sample Admin/User Credentials
- Admin: `admin` / `admin123`
- User: `user` / `user123`

## License
MIT
