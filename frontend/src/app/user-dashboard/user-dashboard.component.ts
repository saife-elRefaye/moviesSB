import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  movies: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 5;
  loading: boolean = false;
  error: string | null = null;
  userId: number = 1;
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMovies(0);
  }

  loadMovies(page: number) {
    this.loading = true;
    const url = `http://localhost:8080/api/movies?page=${page}&size=${this.pageSize}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.movies = res.content;
        this.totalPages = res.totalPages;
        this.currentPage = res.number;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch movies', err);
        this.error = 'Could not load movies.';
        this.loading = false;
      }
    });
  }

  rateMovie(movieId: number, score: number) {
    const url = `http://localhost:8080/api/ratings?userId=${this.userId}&movieId=${movieId}&score=${score}`;
    this.http.post(url, {}).subscribe({
      next: () => alert('Rating submitted!'),
      error: () => alert('Failed to rate movie.')
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.loadMovies(page);
    }
  }
}
