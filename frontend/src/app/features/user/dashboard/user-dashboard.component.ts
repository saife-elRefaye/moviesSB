import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../core/services/movie.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  movies: any[] = [];
  selectedMovie: any = null;
  searchTerm = '';
  ratingValue = 0;
  page = 0;
  totalPages = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getAllMovies(this.page, 8).subscribe((res: any) => {
      this.movies = res.content;
      this.totalPages = res.totalPages;
    });
  }

  search(): void {
    this.page = 0;
    this.loadMovies();
  }

  viewDetails(movie: any): void {
    this.selectedMovie = movie;
  }

  rateMovie(movieId: number): void {
    if (this.ratingValue < 1 || this.ratingValue > 5) {
      alert("Please enter a rating between 1 and 5");
      return;
    }

    // Placeholder: implement real user ID fetching if login context is available
    const userId = 1;

    this.movieService.rateMovie(userId, movieId, this.ratingValue).subscribe(() => {
      alert("Rating submitted!");
    });
  }

  goToNextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadMovies();
    }
  }

  goToPreviousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadMovies();
    }
  }
}
