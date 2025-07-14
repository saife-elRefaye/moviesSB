import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private baseUrl = 'http://localhost:8080/api/movies';

  constructor(private http: HttpClient) {}

  // Get all movies (with pagination)
  getAllMovies(page = 0, size = 8): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  // Add multiple movies
  addMoviesBatch(movies: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/batch-add`, movies);
  }

  // Delete a single movie by ID
  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Rate a movie
  rateMovie(userId: number, movieId: number, score: number): Observable<any> {
    return this.http.post(
      `http://localhost:8080/api/ratings?userId=${userId}&movieId=${movieId}&score=${score}`,
      {}
    );
  }
}
