import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface OmdbApiResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  private apiUrl = 'http://localhost:8080/api/admin/search';

  constructor(private http: HttpClient) {}

  searchMovies(query: string, page: number = 1): Observable<OmdbApiResponse> {
    return this.http.get<OmdbApiResponse>(`${this.apiUrl}?query=${query}&page=${page}`);
  }
}
