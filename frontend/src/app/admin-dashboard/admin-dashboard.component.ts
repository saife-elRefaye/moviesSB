import { Component } from '@angular/core';
import { OmdbService, Movie } from '../services/omdb.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  searchQuery: string = '';
  movieResults: Movie[] = [];
  selectedMovies: Set<Movie> = new Set();
  loading: boolean = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private omdbService: OmdbService, private http: HttpClient) {}

  searchMovies() {
    if (!this.searchQuery.trim()) return;
    this.loading = true;
    this.error = null;

    this.omdbService.searchMovies(this.searchQuery).subscribe({
      next: (movies) => {
        this.movieResults = movies;
        this.selectedMovies.clear();
        this.loading = false;
      },
      error: (err) => {
        console.error('Search failed', err);
        this.error = 'Failed to fetch movies.';
        this.loading = false;
      }
    });
  }

  toggleSelection(movie: Movie) {
    if (this.selectedMovies.has(movie)) {
      this.selectedMovies.delete(movie);
    } else {
      this.selectedMovies.add(movie);
    }
  }

  addSelectedToDB() {
    const movies = Array.from(this.selectedMovies);
    this.http.post<Movie[]>('http://localhost:8080/api/movies/batch', movies).subscribe({
      next: () => {
        this.success = 'Movies added successfully.';
        setTimeout(() => this.success = null, 3000);
      },
      error: () => {
        this.error = 'Failed to add movies.';
        setTimeout(() => this.error = null, 3000);
      }
    });
  }

  removeSelectedFromDB() {
    const movieIds = Array.from(this.selectedMovies).map(m => m.id);
    this.http.request('delete', 'http://localhost:8080/api/movies/batch', { body: movieIds }).subscribe({
      next: () => {
        this.success = 'Movies removed successfully.';
        setTimeout(() => this.success = null, 3000);
      },
      error: () => {
        this.error = 'Failed to remove movies.';
        setTimeout(() => this.error = null, 3000);
      }
    });
  }
}
