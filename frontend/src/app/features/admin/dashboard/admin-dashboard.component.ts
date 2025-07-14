import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../../../core/services/omdb.service';
import { MovieService } from '../../../core/services/movie.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  searchTerm = '';
  movies: any[] = [];
  selectedMovies: any[] = [];
  currentPage = 1;
  dbMovies: any[] = [];

  constructor(
    private omdbService: OmdbService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.fetchDbMovies(); // ✅ run only after component initializes (and after login/token)
  }

 search(page: number = 1): void {
   if (!this.searchTerm) return;
   this.currentPage = page;

   this.omdbService.searchMovies(this.searchTerm, page).subscribe(
     (data: any) => {
       console.log('OMDb raw response:', data); // 👈 ADD THIS
       this.movies = data.Search || [];
     },
     error => {
       console.error('OMDb error:', error); // 👈 AND THIS
     }
   );
 }




  goToNextPage(): void {
    this.search(this.currentPage + 1);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.search(this.currentPage - 1);
    }
  }

  toggleSelection(movie: any, checked: boolean): void {
    if (checked) {
      this.selectedMovies.push(movie);
    } else {
      this.selectedMovies = this.selectedMovies.filter(m => m.imdbID !== movie.imdbID);
    }
  }

  addSelectedToDatabase(): void {
    const formattedMovies = this.selectedMovies.map(m => ({
      title: m.Title,
      year: m.Year,
      imdbId: m.imdbID,
      type: m.Type,
      poster: m.Poster
    }));

    this.movieService.addMoviesBatch(formattedMovies).subscribe(() => {
      this.selectedMovies = [];
      this.fetchDbMovies();
    });
  }


  deleteMovieFromDatabase(id: number): void {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.fetchDbMovies();
    });
  }

  fetchDbMovies(): void {
    this.movieService.getAllMovies(0, 100).subscribe(data => {
      this.dbMovies = data.content;
    });
  }
}
